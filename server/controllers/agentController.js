import Campaign from "../models/Campaign.js";
import {researchAgent} from "../agents/researchAgent.js";
import {strategyAgent} from "../agents/strategyAgent.js";
import contentAgent from "../agents/contentAgent.js";
import {analyticsAgent} from "../agents/analyticsAgent.js";
import {optimizationAgent}from "../agents/optimizationAgent.js";

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
        result = await strategyAgent(
          campaign.research,
          campaign.budget
        );
        campaign.strategy = result;
        break;

      case "content":
        result = await contentAgent(campaign.strategy);
        campaign.content = result;
        break;

      case "analytics":
        result = analyticsAgent({
          impressions: campaign.impressions,
          clicks: campaign.clicks,
          conversions: campaign.conversions,
          spend: campaign.budget,
          revenue: campaign.revenue,
        });
        campaign.analytics = result;
        break;

      case "optimization":
        result = optimizationAgent(campaign.analytics);
        campaign.optimization = result;
        break;

      default:
        return res.status(400).json({ message: "Invalid agent type" });
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