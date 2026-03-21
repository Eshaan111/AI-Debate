'use server'
import { NextResponse } from "next/server";
import { firstPitch } from "../../../actions/handle_first_pitch";

export async function GET(req){
    const {searchParams} = new URL(req.url)
    // const sender = searchParams.get('sender')
    const mesg = searchParams.get('data')
    const modelInFavour = searchParams.get('modelInFavour').toLowerCase();
    const modelAgainst = searchParams.get('modelAgainst').toLowerCase();
    
    console.log('ROUTE RECIEVED ', mesg)



   let [favour_res, against_res] = await Promise.all([
    firstPitch(mesg, modelInFavour, true),
    firstPitch(mesg, modelAgainst, false)
]);

    return NextResponse.json(
    {
        'mesg-fav' : `${favour_res}`,
        'mesg-against' : `${against_res}`
    },
    {
        status : 200
    }
    )
}

