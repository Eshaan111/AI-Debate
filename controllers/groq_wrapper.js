import 'dotenv/config'
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(thread) {
  const chatCompletion = await getGroqChatCompletion(thread);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
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

main('2 liner joke')
