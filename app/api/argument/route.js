'use server'
import { NextResponse } from "next/server";
import { nextReply } from "../../../actions/next_reply";


export async function POST(req) {
    const body = await req.json()

    // console.log('ARGUMENT ROUTER --------', body)
    let { sender, model, text } = await nextReply(body)
    // console.log(`${sender} ${model} ${text}`)
    let mesgObject = { sender: sender, model: model, text: text }
    // console.log(mesgObject)
    return NextResponse.json(
        {
            mesgObject
        },
        {
            status: 200
        }
    )
}