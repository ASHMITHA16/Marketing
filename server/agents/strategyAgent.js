import groq from "../config/groq.js";

 const strategyAgent = async (researchData, budget) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
             You are a digital marketing strategist.

            Based on the research data and budget, create a detailed marketing strategy report including:

              1. Main campaign goal
              2. Budget allocation with reasoning
              3. Key performance indicators
              4. Execution timeline

            Write everything in structured markdown format.
`
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

  return (response.choices[0].message.content);
};

export default strategyAgent;