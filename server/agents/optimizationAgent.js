import groq from "../config/groq.js";

const optimizationAgent = async (analyticsReport) => {

  const prompt = `
You are a digital marketing optimization expert.

Based on the following analytics report:

${analyticsReport}

Provide optimization recommendations:

1. Improve content strategy
2. Improve audience targeting
3. Budget allocation suggestions
4. Platform recommendations

Return actionable recommendations.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
};

export default optimizationAgent;