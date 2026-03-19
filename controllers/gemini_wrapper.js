import 'dotenv/config';
import { GoogleGenAI } from "@google/genai"
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({GEMINI_API_KEY});

export async function askModel(thread) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: thread,
  });
  console.log(response.text);
}

askModel('FUNNY 2 liner joke')



