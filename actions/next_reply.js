'use server'
//MODEL PROMPT IMPORTS 
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";

//REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux'
import { pushMesg, clear } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'

const mesgStream = useSelector((state: RootState) => state.stream.messages)
const topic = useSelector((state:RootState)=> state.stream.topic )


// FORMAT OF MESSAGES : [                                                                      ARRAY OF OBJECTS , 
                                                                                            // each object is a convo set, 
                                                                                            // ie reply and question set
//   {
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//     againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
//   },

//   { 
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//     againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
//   }
// ]



function chat_thread_maker(inFavourStance, mesg_streamObject_redux){
    const stance = (inFavourStance==true)?'IN FAVOUR OF' : 'AGAINST '
    const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
    const opener = `${setup} believe you are a passionate currently in a debate ${stance} of the topic : ${topic} ,, with the current conversation going as : `

    const desired_stance = (inFavourStance==true)?favReply:againstReply
    const thread = `${opener} `
    array.forEach(obj => {
        convo_set_ele_fav = `YOU  : `
        convo_set_ele_opp = `OPPOSITION : `

        
    });
    

}

export function nextReply(topic,chat_thread,myStance){
return null
}