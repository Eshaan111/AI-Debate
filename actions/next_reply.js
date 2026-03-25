'use server'
//MODEL PROMPT IMPORTS 
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";

// export async function chat_thread_maker(inFavourStance, firstStance_InFavour, mesg_stream_Array_redux, topic){
//     const stance = (inFavourStance==true)?'IN FAVOUR OF' : 'AGAINST '
//     const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
//     const opener = `${setup} believe you are a passionate currently in a debate ${stance} of the topic : ${topic} ,, with the current conversation going as : `

//     const desired_stance = (inFavourStance==true)?favReply:againstReply
//     const first_stance = (firstStance_InFavour==true)?favReply:againstReply
//     const thread = `${opener} `

//     if(inFavourStance == firstStance_InFavour){
//         thread.concat(`YOU : ${mesg_streamObject_redux[0][first_stance]}`)
//     }
//     else{
//         thread.concat(`OPPOSITION : ${mesg_streamObject_redux[0][first_stance]}`)
//     }
//     mesg_stream_Array_redux.splice(0,1)
//     console.log(thread,mesg_stream_Array_redux)
//     array.forEach(obj => {
//         const key = Object.keys(obj)[0]

//     });


// }

 const threadMaker = (reqbody)=> {

    //each object in mesgObjects : { sender: pitch_to_add.sender (modelInFavour/modelAgainst) , model: pitch_to_add.model, text: pitch_to_add.text }
    let mesgObject_Obj = reqbody.mesgStream
    let topic = reqbody.topic
    let keys = Object.keys(mesgObject_Obj)
    let lastMesgObject = mesgObject_Obj[keys[keys.length-1]]
    console.log(mesgObject_Obj,keys,keys[keys.length-1],lastMesgObject)
    let lastSender = lastMesgObject.sender
    let lastSendermodel = lastMesgObject.model
    let resObject = { ...mesgObject_Obj }
    let myStance = (lastSender == 'modelInFavour') ? 'AGAINST THE' : 'IN FAVOUR OF'
    const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
    const opener = `${setup} believe you are a passionate debatoar,  ${myStance} the topic : ${topic} currently in a debate, with the current conversation going as : `
    const ender = `NOW GET YOUR REPLY READY TO YOUR OPPONENT, try to find loopholes , idiocrocy, in his statement but also be productive with your criticism`
    let thread = `${opener} \n`
    keys.forEach(key => {
        let mesgObject = mesgObject_Obj[key]
        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',mesgObject)
        let sender = mesgObject.sender
        if (sender == lastSender){
            thread = thread.concat(`OPPONENT : ${mesgObject_Obj[key].text} \n`)
        }
        else{
            thread = thread.concat(`YOU : ${mesgObject_Obj[key].text} \n`)
        }
        
    })

    thread = thread.concat(ender)
    return thread
    // return null

}

export async function nextReply(reqbody) {
    console.log('==================================================================================')
    console.log(threadMaker(reqbody))
}

