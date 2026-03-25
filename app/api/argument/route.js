'use server'
import { NextResponse } from "next/server";
import { nextReply } from "../../../actions/next_reply";


const mesg_stream = useSelector(RootState)
export function GET(req){
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const firstGoer = searchParams.get('firstGoer')
    // const oara

}