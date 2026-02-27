import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },

    // Temporary dummy placeholders (AI later)
    research: {
      type: Object,
      default: {},
    },
    strategy: {
      type: Object,
      default: {},
    },
    content: {
      type: Object,
      default: {},
    },

    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);