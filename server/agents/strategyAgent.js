import groq from "../config/groq.js";

export const strategyAgent = async (researchData, budget) => {
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a digital marketing strategist. Create a strategy blueprint in JSON format including goal, budgetAllocation (array), and kpis.",
      },
      {
        role: "user",
        content: `Research Data: ${JSON.stringify(
          researchData
        )}. Total Budget: ${budget}`,
      },
    ],
    temperature: 0.6,
  });

  return JSON.parse(response.choices[0].message.content);
};