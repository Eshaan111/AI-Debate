'use server'
import { askGemini } from "./gemini_wrapper"
import { askGroq } from "./groq_wrapper"
export const analyse = async (mesgStream) => {



    const prompt = `
    You are a strict, logical adjudicator for a debate.
    Analyze the following conversation history and determine the winner.
    
    RULES:
    1. The winner is the one who:
       - Provides more factual evidence.
       - Addresses more of the opponent's points.
       - Maintains logical consistency.
    2. Output ONLY a JSON object with this exact structure:
    {
      "winner": "modelAgainst" or "modelInFavour",
      "best_point": "The strongest argument made by the winner",
      "insult_log": "A witty but clean insult directed at the loser"
    }
    
    CONVERSATION:
    ${JSON.stringify(mesgStream)}

    return in JSON
    `
    console.log('asking FOR ANALYSIS')
    const response = await askGroq(prompt)
    console.log('DECISION', response)
    return response
}