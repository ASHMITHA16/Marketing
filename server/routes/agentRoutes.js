import runAgent from "../controllers/agentController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/:id/:type", protect, runAgent);

export default router;