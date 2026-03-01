import groq from "../config/groq.js";

 const researchAgent = async (productDescription) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a marketing research expert. Analyze the product and return structured JSON with targetAudience, type (B2B/B2C), and suggestedPlatforms array.",
      },
      {
        role: "user",
        content: productDescription,
      },
    ],
    temperature: 0.7,
  });

  const output = response.choices[0].message.content;

  return JSON.parse(output);
};

export default researchAgent;