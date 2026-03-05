import Campaign from "../models/Campaign.js";

const createCampaign = async (req, res) => {
  try {

    const { name, productDescription, budget, website } = req.body;

    if (!productDescription || !budget || !website) {
      return res.status(400).json({
        message: "Product description, budget, and website are required",
      });
    }

    const campaign = await Campaign.create({
      name,
      productDescription,
      budget,
      website,
      companyId: req.user.companyId
    });
   console.log("Campaign created with ID:", campaign._id);

    // 🔥 Generate tracking link using campaign ID
    const trackingLink = `http://localhost:5000/track/${campaign._id}`;
    console.log("Tracking link generated:", trackingLink);
      // add it inside campaign object
    const campaignWithLink = {
      ...campaign._doc,
      trackingLink
    };

    res.status(201).json({
      message: "Campaign created successfully",
      campaign: campaignWithLink
    });


  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

export default createCampaign;