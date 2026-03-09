import Campaign from "../models/Campaign.js";
import researchAgent from "../agents/researchAgent.js";
import strategyAgent from "../agents/strategyAgent.js";
import contentAgent from "../agents/contentAgent.js";
import analyticsAgent from "../agents/analyticsAgent.js";
import optimizationAgent from "../agents/optimizationAgent.js";
 import Tracking from "../models/Tracking.js";
const runAgent = async (req, res) => {
  try {
    const { id, type } = req.params;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    
    let result;

    switch (type) {

      case "research":
        result = await researchAgent(campaign.productDescription);
        campaign.research = result;
        break;

      case "strategy":
        if (!campaign.research) {
         return res.status(400).json({
          message: "Please run Research Agent first"
        });
      }

     result = await strategyAgent(
       campaign.research,
       campaign.budget
    );
     campaign.strategy = result;
     break;

    case "content":
   if (!campaign.strategy) {
    return res.status(400).json({
      message: "Please run Strategy Agent first"
    });
  }

  result = await contentAgent(campaign.strategy);

  // 🔥 add tracking link
   result.trackingLink = `http://localhost:5000/track/${campaign._id}`;

   campaign.content = result;

   break;
   
  

  case "analytics":

   const tracking = await Tracking.findOne({
    campaignId: campaign._id
  });

  const clicks = tracking ? tracking.clicks : 0;
  const impressions = tracking ? tracking.impressions : 0;
  const conversions = tracking ? tracking.conversions : 0;

  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0;

  const performanceScore =
    clicks * 2 + conversions * 5;

  result = await analyticsAgent({
    clicks,
    impressions,
    conversions,
    ctr,
    performanceScore,
    budget: campaign.budget
  });

  campaign.analytics = result;
  break;

     case "optimization":

   if (!campaign.analytics) {
    return res.status(400).json({
      message: "Please run Analytics Agent first"
    });
  }

  result = await optimizationAgent(campaign.analytics);

  campaign.optimization = result;
  break;
    }

    await campaign.save();

    res.json({
      message: `${type} agent executed successfully`,
      result,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default runAgent;