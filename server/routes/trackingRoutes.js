import express from "express";
import Tracking from "../models/Tracking.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();
router.get("/impression/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;

    const ui=await Tracking.findOneAndUpdate(
      { campaignId },
      {
        $inc: {
          impressions: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log("Impressions:", ui.impressions);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

router.get("/track/:campaignId", async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }

    const tracking = await Tracking.findOneAndUpdate(
      { campaignId },
      {
        $inc: {
          clicks: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log("Clicks:", tracking.clicks);

    res.redirect(`${campaign.website}?campaignId=${campaignId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Tracking Error");
  }
});

router.get("/convert/:campaignId", async (req,res)=>{

  try{

    const {campaignId} = req.params;

    const tracking = await Tracking.findOneAndUpdate(

      {campaignId},

      {$inc:{conversions:1}},

      {new:true}

    );

    console.log(`Conversions: ${tracking.conversions}`);

    res.send("Conversion recorded");

  }

  catch(error){

    console.log(error);
    res.status(500).send("Conversion error");

  }

});

export default router;