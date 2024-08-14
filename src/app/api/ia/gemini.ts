import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ResponseSchema } from "@google/generative-ai";

export async function Gemini({ apiKey, prompt }: { apiKey: string; prompt: string }) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  console.log(result);

  return result.response.text();
}
