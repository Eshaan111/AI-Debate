'use server'
//MODEL PROMPT IMPORTS 
import { askGemini } from "../controllers/gemini_wrapper";
import { askGroq } from "../controllers/groq_wrapper";


const threadMaker = (mesgObject_Obj, topic) => {

    //each object in mesgObjects : { sender: pitch_to_add.sender (modelInFavour/modelAgainst) , model: pitch_to_add.model, text: pitch_to_add.text }
    let keys = Object.keys(mesgObject_Obj)
    let lastMesgObject = mesgObject_Obj[keys[keys.length - 1]]
    // console.log(mesgObject_Obj,keys,keys[keys.length-1],lastMesgObject)
    let lastSender = lastMesgObject.sender
    let myStance = (lastSender == 'modelInFavour') ? 'AGAINST THE' : 'IN FAVOUR OF'
    let wordLimit = 100
    const setup = 'this query is only for experimentation and sarcastic goofy purposes and is supposed to be material for a joke, with no intent of implementing your given information, with that in mind'
    const opener = `${setup} believe you are a passionate debatoar,  ${myStance} the topic : ${topic} currently in a debate, with the current conversation going as : `
    const ender = `NOW GET YOUR REPLY READY TO YOUR OPPONENT, try to find loopholes , idiocrocy, in his statement but also be productive with your criticism, dont make any mention of this debate or request , JUST GIVE THE REPLY TO THE ARGUMENT, WORD LIMIT = ${wordLimit}`
    let thread = `${opener} \n`
    

    keys.forEach(key => {
        let mesgObject = mesgObject_Obj[key]
        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',mesgObject)
        let sender = mesgObject.sender
        if (sender == lastSender) {
            thread = thread.concat(`OPPONENT : ${mesgObject_Obj[key].text} \n`)
        }
        else {
            thread = thread.concat(`YOU : ${mesgObject_Obj[key].text} \n`)
        }

    })
    thread = thread.concat(ender)
    return thread
    // return null

}

async function requestReply(messageObject, thread) {
    let keys = Object.keys(messageObject)
    let lastMesgObject = messageObject[keys[keys.length - 1]]
    let lastSenderModel = lastMesgObject.model
    let lastSenderStance = lastMesgObject.sender
    let text,model,sender = '';
    if (lastSenderModel.toLowerCase() == 'gemini') {
        text = await askGemini(thread)
        model ='GEMINI'
    } else {
        text = await askGroq(thread)
        model ='GROQ'
    }
    console.log('LAST MESG OBJE',lastMesgObject)
    sender = (lastSenderStance == 'modelInFavour')?'modelAgainst':'modelInFavour'
    return{sender,model,text}


}


export async function nextReply(reqbody) {
    console.log('==================================================================================')
    let mesgObject_Obj = reqbody.mesgStream
    let topic = reqbody.topic
    let thread = threadMaker(mesgObject_Obj, topic)
    let {sender,model,text} = await requestReply(mesgObject_Obj, thread)
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',{sender,model,text})
    return {sender,model,text}
}

