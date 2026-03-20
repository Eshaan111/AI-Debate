'use server'

import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";

export async function firstPitch(topic, model, inFavour=true){
    let stand = (inFavour)?'IN FAVOUR OF ' : "AGAINST "    
    let thread = `Create a brief argument ${stand} the argument : ${topic} of approx 40-60 words` 
    console.log(`ASKING ${model} : ${thread}`  )
    if(model.toLowerCase() == 'groq'){
            let response = await askGroq(thread);
            return response;
    }
    response = await askGemini(thread);
    return response;


}
