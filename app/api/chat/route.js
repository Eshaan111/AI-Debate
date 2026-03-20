'use server'
import { NextResponse } from "next/server";
import { firstPitch } from "../../../actions/handle_first_pitch";

export async function GET(req){
    const {searchParams} = new URL(req.url)
    const sender = searchParams.get('sender')
    const mesg = searchParams.get('data')
    console.log('ROUTE RECIEVED ', mesg)
    let res = await firstPitch(mesg,'groq',true)
    return NextResponse.json(
    {
        'mesg' : `${res}`
    },
    {
        status : 200
    }
    )
}

