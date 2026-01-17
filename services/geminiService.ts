
import { GoogleGenAI } from "@google/genai";

const IMAGE_MODEL = 'gemini-2.5-flash-image';
const CHAT_MODEL = 'gemini-3-pro-preview';

export const generateThumbnail = async (title: string, headshotBase64: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Data = headshotBase64.split(',')[1];
  
  const prompt = `
    You are a world-class YouTube graphic designer. 
    Task: Create a professional, scroll-stopping 16:9 YouTube thumbnail.
    Title to include: "${title}"
    Main Subject: Use the person from the provided headshot. 
    
    Requirements:
    1. Place the person prominently on one side of the frame (Rule of Thirds).
    2. Adjust their facial expression and lighting to perfectly match the tone of the title "${title}". 
    3. The title text must be rendered in bold, vibrant, eye-catching 3D typography with glowing highlights.
    4. Cinematic depth of field and high-energy background.
    5. Overall look must be professional and high-CTR.
    6. Aspect ratio must be 16:9.
  `.trim();

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: prompt },
      ],
    },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  const candidate = response.candidates?.[0];
  if (candidate?.content?.parts) {
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  throw new Error("Generation failed");
};

export const startPerformanceChat = (history: { role: 'user' | 'model', parts: [{ text: string }] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: "You are a YouTube growth and performance expert. You analyze channel data and provide actionable advice on CTR, retention, and content strategy. Be concise, encouraging, and data-driven.",
    },
  });
};
