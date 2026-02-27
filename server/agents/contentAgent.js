import groq from "../config/groq.js";

const contentAgent = async (strategy, contentType = "instagram_post") => {
  try {
    if (!strategy) {
      throw new Error("Strategy data is required before generating content");
    }

    let instruction;

    switch (contentType) {
      case "instagram_post":
        instruction =
          "Generate a full engaging Instagram post with strong hook, body, CTA and hashtags.";
        break;

      case "instagram_caption":
        instruction =
          "Generate a short Instagram caption with emojis and relevant hashtags.";
        break;

      case "linkedin_post":
        instruction =
          "Generate a professional LinkedIn post suitable for business audience.";
        break;

      case "email_marketing":
        instruction =
          "Generate a persuasive marketing email including subject line and CTA.";
        break;

      default:
        instruction =
          "Generate high-quality marketing content based on the strategy.";
    }

    const prompt = `
You are an expert marketing content strategist.

Here is the campaign strategy:
${JSON.stringify(strategy)}

Task:
${instruction}

Return ONLY valid JSON in this format:

{
  "title": "...",
  "content": "...",
  "hashtags": ["#example1", "#example2"]
}
`;

    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawText = response.choices[0].message.content;

    // Safe JSON parsing
    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      // If model returns extra text, attempt extraction
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { content: rawText };
    }

    return parsed;

  } catch (error) {
    throw new Error("Content generation failed: " + error.message);
  }
};

export default contentAgent;