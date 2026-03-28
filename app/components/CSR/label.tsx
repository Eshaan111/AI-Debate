'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const ModelPreferenceLabel = ({inFavour} : any) => {

    const [modelInFavour,setModelInFavour] = useState('Un-Signed')
    const [modelAgainst,setModelAgainst] = useState('Un-Signed')
    
    const curr_params = useSearchParams();
        useEffect(()=>{
            for (const [key, value] of curr_params.entries()) {      
                if(key=='modelInFavour' && value!='undefined'){setModelInFavour(value)}
                else if(key=='modelAgainst' && value!='undefined'){setModelAgainst(value)}
            }
        },[curr_params])
    let mesg;
    if(inFavour){
        mesg = `MODEL IN FAVOUR : ${modelInFavour}`;
    }
    else{
        mesg = `MODEL AGAINST: ${modelAgainst}`;
    }

    return(
        <span className="label">{mesg}</span>
    )

}

export default ModelPreferenceLabel
