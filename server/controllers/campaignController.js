import Campaign from "../models/Campaign.js";

const createCampaign = async (req, res) => {
  try {
    const { name,productDescription, budget } = req.body;

    if (!productDescription || !budget) {
      return res.status(400).json({
        message: "Product description and budget are required",
      });
    }
    const campaign = await Campaign.create({
      name,
      productDescription,
      budget,
      companyId: req.user.companyId, // From JWT
    });
    console.log("Campaign created:", campaign);
    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
export default createCampaign;