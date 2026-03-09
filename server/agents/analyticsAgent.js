import groq from "../config/groq.js";
import axios from "axios";
const analyticsAgent = async (data) => {

  const prompt = `
You are a marketing analytics expert.

Campaign Data:

Impressions: ${data.impressions}
Clicks: ${data.clicks}
Conversions: ${data.conversions}
CTR: ${data.ctr}%
Performance Score: ${data.performanceScore}
Budget: ${data.budget}

Provide:

1. Performance Summary
2. Key Insights
3. Problems in Campaign
4. Recommendations to improve

Write in clear markdown format.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5
  });

  return response.choices[0].message.content;
};

export default analyticsAgent;