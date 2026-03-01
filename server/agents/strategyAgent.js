import groq from "../config/groq.js";

 const strategyAgent = async (researchData, budget) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
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

export default strategyAgent;