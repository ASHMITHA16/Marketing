import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({

  campaignId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Campaign"
  },

  impressions:{
    type:Number,
    default:0
  },

  clicks:{
    type:Number,
    default:0
  },

  conversions:{
    type:Number,
    default:0
  }

});

export default mongoose.model("Tracking", trackingSchema);