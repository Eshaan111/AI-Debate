'use server'
import { NextResponse } from "next/server";
import { nextReply } from "../../../actions/next_reply";

export async function POST(req) {
    const body = await req.json()
    const { mesgStream } = body
    console.log(mesgStream)
}