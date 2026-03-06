import express from "express";
import Tracking from "../models/Tracking.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/track/:campaignId", async (req, res) => {

  try {

    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }
     console.log("Tracking click for campaign:", campaignId);
    await Tracking.findOneAndUpdate(
      { campaignId },
      { $inc: { clicks: 1 } },
      { upsert: true }
    );
    const some= await Tracking.findOne({ campaignId,clicks: { $gt: 0 } })
    console.log("Tracking click for campaign:", some);
    res.redirect(campaign.website);

  } catch (error) {
    console.log(error);
    res.status(500).send("Tracking error");
  }

});

export default router;