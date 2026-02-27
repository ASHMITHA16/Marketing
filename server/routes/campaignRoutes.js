import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import createCampaign from "../controllers/campaignController.js";
import Campaign from "../models/Campaign.js";

router.post("/create", protect, createCampaign);
router.get("/fetchCampaigns", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ companyId: req.user.companyId });
    return res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  } });
  
export default router;