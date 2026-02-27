import Campaign from "../models/Campaign.js";
import { analyticsAgent } from "../agents/analyticsAgent.js";
import { optimizationAgent } from "../agents/optimizationAgent.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      company: req.user.companyId,
    });

    let impressions = 0;
    let clicks = 0;
    let conversions = 0;
    let spend = 0;
    let revenue = 0;

    campaigns.forEach((c) => {
      impressions += c.impressions || 0;
      clicks += c.clicks || 0;
      conversions += c.conversions || 0;
      spend += c.budget || 0;
      revenue += c.revenue || 0;
    });

    const metrics = analyticsAgent({
      impressions,
      clicks,
      conversions,
      spend,
      revenue,
    });

    const optimization = optimizationAgent({
      ...metrics,
      conversionRate: metrics.conversionRate,
    });

    // Budget allocation summary
    const budget = campaigns.map((c) => ({
      platform: c.strategy?.budgetAllocation?.[0]?.platform || "General",
      value: c.budget,
    }));

    // Return FULL dashboard data
    res.json({
      kpis: [
        { label: "CTR", value: metrics.ctr + "%" },
        { label: "Conversion Rate", value: metrics.conversionRate + "%" },
        { label: "ROI", value: metrics.roi + "%" },
        { label: "CAC", value: "$" + metrics.cac },
      ],

      funnel: [
        { name: "Impressions", value: impressions },
        { name: "Clicks", value: clicks },
        { name: "Conversions", value: conversions },
      ],

      budget,

      campaigns,

      research: campaigns[0]?.research || {},
      strategy: campaigns[0]?.strategy || {},
      content: campaigns[0]?.content || {},

      optimization,
    });

  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
};