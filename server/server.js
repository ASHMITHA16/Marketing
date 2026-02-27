import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import Campaign from "./models/Campaign.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics",analyticsRoutes); 
app.use("/api/campaigns", campaignRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/agents", agentRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});