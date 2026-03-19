'use server'
import { NextResponse } from "next/server";

export async function GET(req){
    const {searchParams} = new URL(req.url)
    const sender = searchParams.get('sender')
    return NextResponse.json(
    {
        'mesg' : 'recieved by server'
    },
    {
        status : 200
    }
    )
}

