import 'dotenv/config';
import { GoogleGenAI } from "@google/genai"
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "say hi in a daunting scary way",
  });
  console.log(response.text);
}

main();



