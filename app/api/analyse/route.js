'use server'
import { NextResponse } from "next/server";
import { analyse } from "../../../controllers/analyse";


export async function POST(req) {
    const body = await req.json()
    const { mesgStream } = body
    // console.log(mesgStream)
    const analysis = await analyse(mesgStream)
    return NextResponse.json(
        {
            status: 200,
            body: JSON.parse(analysis)
        }
    )
}