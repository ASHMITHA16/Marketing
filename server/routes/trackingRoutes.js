import express from "express";
import Tracking from "../models/Tracking.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

router.get("/track/:campaignId", async (req,res)=>{

  try{

    const {campaignId} = req.params;

    const campaign = await Campaign.findById(campaignId);

    if(!campaign){
      return res.status(404).send("Campaign not found");
    }

    const tracking = await Tracking.findOneAndUpdate(

      {campaignId},

      {
        $inc:{
          impressions:1,
          clicks:1
        }
      },

      {upsert:true,new:true}

    );

    console.log(`Campaign ${campaign.name}`);
    console.log(`Impressions: ${tracking.impressions}`);
    console.log(`Clicks: ${tracking.clicks}`);


    res.redirect(`${campaign.website}?campaignId=${campaignId}`);

  }

  catch(error){

    console.log(error);
    res.status(500).send("Tracking error");

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