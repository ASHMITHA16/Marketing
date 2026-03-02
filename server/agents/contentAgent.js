import groq from "../config/groq.js";
import axios from "axios";

const generateImageFromHF = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error("HF Image Error:", error.response?.data || error.message);
    throw new Error("Image generation failed");
  }
};

const contentAgent = async (strategy) => {
  try {
    if (!strategy) {
      throw new Error("Strategy data is required");
    }

    const prompt = `
You are an expert marketing content strategist.

Based on this strategy:
${JSON.stringify(strategy)}

Generate an engaging Instagram post.

Return ONLY valid JSON:

{
  "title": "...",
  "content": "...",
  "hashtags": ["#tag1", "#tag2"],
  "imagePrompt": "Detailed image description for AI image generation"
}
`;

    // 🔥 Step 1: Generate text using Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawText = response.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed) throw new Error("Invalid JSON from Groq");

    // 🔥 Step 2: Generate image from HuggingFace
    const imageUrl = await generateImageFromHF(parsed.imagePrompt);

    parsed.imageUrl = imageUrl;

    return parsed;

  } catch (error) {
    console.error("Content Agent Error:", error.response?.data || error.message);
    throw new Error("Content generation failed: " + error.message);

  }
};

export default contentAgent;