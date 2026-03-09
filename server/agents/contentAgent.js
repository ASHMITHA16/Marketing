import groq from "../config/groq.js";
import axios from "axios";

const generateImageFromHF = async (prompt) => { 
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    return `data:image/png;base64,${base64Image}`;
    
  } catch (error) {
    console.log("HF ERROR:", error.response?.data);
    throw new Error("Image generation failed");
  }
};

const contentAgent = async (strategy, contentType = "instagram_post") => {
  try {
    if (!strategy) {
      throw new Error("Strategy data is required");
    }

    let instruction = "";

    if (contentType === "instagram_post") {
      instruction =
        "Generate a full Instagram post including caption and hashtags.";
    }

    if (contentType === "instagram_caption") {
      instruction =
        "Generate only a short engaging Instagram caption with emojis.";
    }

    if (contentType === "hashtags") {
      instruction =
        "Generate trending marketing hashtags related to the campaign.";
    }

    const prompt = `
You are an expert marketing content strategist.

Strategy:
${JSON.stringify(strategy)}

Task:
${instruction}


Return ONLY JSON:

{
"title": "...",
"content": "...",
"hashtags": ["#tag1","#tag2"],
"imagePrompt": "AI image description"
}
`;

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

    const imageUrl = await generateImageFromHF(parsed.imagePrompt);
  
    parsed.imageUrl = imageUrl;
   
    return parsed;

  } catch (error) {
    console.error("Content Agent Error:", error.message);
    throw new Error("Content generation failed: " + error.message);
  }
};

export default contentAgent;