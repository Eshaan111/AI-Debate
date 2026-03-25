'use server'
//MODEL PROMPT IMPORTS 
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";

export async function chat_thread_maker(inFavourStance, firstStance_InFavour, mesg_stream_Array_redux, topic){
    const stance = (inFavourStance==true)?'IN FAVOUR OF' : 'AGAINST '
    const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
    const opener = `${setup} believe you are a passionate currently in a debate ${stance} of the topic : ${topic} ,, with the current conversation going as : `

    const desired_stance = (inFavourStance==true)?favReply:againstReply
    const first_stance = (firstStance_InFavour==true)?favReply:againstReply
    const thread = `${opener} `

    if(inFavourStance == firstStance_InFavour){
        thread.concat(`YOU : ${mesg_streamObject_redux[0][first_stance]}`)
    }
    else{
        thread.concat(`OPPOSITION : ${mesg_streamObject_redux[0][first_stance]}`)
    }
    mesg_stream_Array_redux.splice(0,1)
    console.log(thread,mesg_stream_Array_redux)
    array.forEach(obj => {
        const key = Object.keys(obj)[0]
        
    });
    

}

export async function  nextReply(topic,chat_thread,myStance){
return null
}

