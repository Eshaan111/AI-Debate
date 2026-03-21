'use server'
import 'dotenv/config'
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askGroq(thread) {
  const chatCompletion = await getGroqChatCompletion(thread);
  // Print the completion returned by the LLM.
  console.log('--------GROQ RESPONSE : ',chatCompletion.choices[0]?.message?.content || "");
  return (chatCompletion.choices[0]?.message?.content || "") 
}


export async function getGroqChatCompletion(thread) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: thread,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

// askGroq('2 liner joke')
