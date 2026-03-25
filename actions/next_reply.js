'use server'
//MODEL PROMPT IMPORTS 
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";

//REDUX IMPORTS
import { findSourceMap } from "node:module";

// const mesgStream = useSelector((state: RootState) => state.stream.messages)
// const topic = useSelector((state:RootState)=> state.stream.topic )
const dispatch = useDispatch()
// FORMAT OF MESSAGES : [ ARRAY OF OBJECTS , each object is a convo set, ie reply and question set 
//   {
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//     againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
//   },
//   { 
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//  
//   },
// {
//   againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
// }
// 
// ]


export function chat_thread_maker(inFavourStance, firstStance_InFavour, mesg_stream_Array_redux, topic){
    const stance = (inFavourStance==true)?'IN FAVOUR OF' : 'AGAINST '
    const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
    const opener = `${setup} believe you are a passionate currently in a debate ${stance} of the topic : ${topic} ,, with the current conversation going as : `

    const desired_stance = (inFavourStance==true)?favReply:againstReply
    const first_stance = (firstStance_InFavour==true)?favReply:againstReply
    const thread = `${opener} `

    if(inFavourStance == firstStance_InFavour){
        thread += `YOU : ${mesg_streamObject_redux[0][first_stance]}`
    }
    else{
        thread += `OPPOSITION : ${mesg_streamObject_redux[0][first_stance]}`
    }
    mesg_stream_Array_redux.splice(0,1)
    console.log(thread,mesg_stream_Array_redux)
    array.forEach(obj => {
        const key = Object.keys(obj)[0]
        
    });
    

}

export function nextReply(topic,chat_thread,myStance){
return null
}

