const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    //  FIXED
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    //  CLEAN RESPONSE
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    //  SAFE PARSE
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error("Raw Gemini Output:", cleanText);
      throw new Error("Invalid JSON from Gemini");
    }

    return parsed;
  } catch (error) {
    console.error("Gemini Fetch Error:", error.message);
    throw new Error("Gemini API fetch failed");
  }
};
