

import { GoogleGenAI } from "@google/genai";

// Fix: Per guidelines, initialize GoogleGenAI directly assuming API_KEY is present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const generateDare = async (category: string, streamerName: string): Promise<string> => {
  // Fix: Removed check for `ai` instance as it's now guaranteed to be initialized.
  try {
    const prompt = `
      You are an AI that generates creative challenges for a live streamer named ${streamerName}.
      The challenge must be fun, engaging for the audience, and completely safe to perform live on camera in a typical room setup.
      The category for the challenge is: "${category}".
      Keep the challenge description to a maximum of two short sentences.
      Do not use emojis or hashtags. Be direct and creative.

      Generate a challenge now.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text;
    if (!text) {
        return "The AI is lost in thought. Try asking again!";
    }
    return text.trim();

  } catch (error) {
    console.error("Error generating dare with Gemini API:", error);
    return "The AI seems to be stumped! Try a different category.";
  }
};