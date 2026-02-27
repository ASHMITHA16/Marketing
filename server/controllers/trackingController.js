import Campaign from "../models/Campaign.js";

export const logClick = async (req, res) => {
  const { campaignId } = req.query;

  await Campaign.findByIdAndUpdate(campaignId, {
    $inc: { clicks: 1 },
  });

  res.redirect("https://yourlandingpage.com");
};

export const logConversion = async (req, res) => {
  const { campaignId, revenue } = req.body;

  await Campaign.findByIdAndUpdate(campaignId, {
    $inc: { conversions: 1, revenue: revenue },
  });

  res.json({ message: "Conversion logged" });
};