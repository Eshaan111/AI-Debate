'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
const ChatInput = () => {
    const [text,setText] = useState('');
    const [modelInFavour,setModelInFavour] = useState('Un-Signed')
    const [modelAgainst,setModelAgainst] = useState('Un-Signed')
        
    const curr_params = useSearchParams();
    useEffect(()=>{
        for (const [key, value] of curr_params.entries()) {      
            if(key=='modelInFavour' && value!=`undefined`){setModelInFavour(value)}
            else if(key=='modelAgainst' && value!=`undefined`){setModelAgainst(value)}
        }
    },[curr_params])


    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const checkModelPreference = ()=>{
        return (modelInFavour!='Un-Signed' && modelAgainst != 'Un-Signed')
    }
    
    const handleTransmit = async ()=>{

        if(!checkModelPreference()) {
            console.log("MODEL PREFERENCE NOT SELECTED")
            return
        };

        let val = text.trim()
        if(val == ""){console.log('emppty input');return};
        console.log('TRANSMITTING DATA TO SERVER : ',val)
        
        const params =new URLSearchParams({
            sender : 'user',
            data : val
        })

        const res = await fetch(`/api/chat?${params}`)
        const ans = await res.json()
        console.log(ans)
        setText('')
    }

    const handleKeyDown = (e)=>{
        if (e.key === 'Enter'){
            handleTransmit()
        }
    }

    return (
    
      <div className="dc-chat-input-zone">
            <input type="text" className="dc-chat-input" placeholder="INPUT ARGUMENT..." onChange={handleChange} onKeyDown = {handleKeyDown} value={text}/>
            <button className="dc-send-btn" onClick={handleTransmit}>Transmit</button>
        </div>
    
  )
}

export default ChatInput
