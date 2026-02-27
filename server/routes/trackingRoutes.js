import express from "express";
import { logClick, logConversion } from "../controllers/trackingController.js";

const router = express.Router();

router.get("/click", logClick);
router.post("/conversion", logConversion);

export default router;