import { GoogleGenAI } from "@google/genai";
import { ENV_CONFIG } from "../config/env.config.js";

const ai = new GoogleGenAI({ apiKey: ENV_CONFIG.GEMINI_API_KEY });

export const geminiResponseService = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const geminiStreamResponseService = async (prompt) => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
