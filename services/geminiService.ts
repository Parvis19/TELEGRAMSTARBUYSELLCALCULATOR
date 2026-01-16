
import { GoogleGenAI, Type } from "@google/genai";
import { InsightData } from "../types";

export const getMarketInsights = async (amount: number, currency: string, mode: string): Promise<InsightData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a quick market analysis for Telegram Stars. 
      The user wants to ${mode} ${amount} Stars using ${currency}. 
      Give a short summary, a recommendation, and a market status (BULLISH, BEARISH, or NEUTRAL).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            marketStatus: { type: Type.STRING, description: "One of: BULLISH, BEARISH, NEUTRAL" }
          },
          required: ["summary", "recommendation", "marketStatus"]
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return {
      summary: json.summary || "Unable to retrieve insights at this time.",
      recommendation: json.recommendation || "Proceed with caution.",
      marketStatus: (json.marketStatus as any) || "NEUTRAL"
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "AI Market analysis currently unavailable.",
      recommendation: "Please monitor official Telegram channels for rate changes.",
      marketStatus: "NEUTRAL"
    };
  }
};
