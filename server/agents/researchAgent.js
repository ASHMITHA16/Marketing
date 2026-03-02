import groq from"../config/groq.js";
const researchAgent = async (productDescription) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are a professional marketing research expert.

Analyze the product in detail and provide:

1. Target audience
2. Whether it is B2B or B2C (explain why)
3. Best marketing platforms (with reasons)
4. Marketing strategy suggestions

Write everything in clear, professional English.
Do not return JSON.
`,
      },
      {
        role: "user",
        content: productDescription,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

export default researchAgent;