'use server'
import { NextResponse } from "next/server";
import { nextReply } from "../../../actions/next_reply";


export async function POST(req){
    const body = await req.json()
    
    console.log('PITCH ROUTER --------',body)

    return NextResponse.json(
    {
        mesg : 'hi'
    },
    {
        status : 200
    }
    )
}