'use client'
import React, { useState } from 'react'

const ChatInput = () => {
    const [text,setText] = useState('');
    
    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const handleTransmit = ()=>{
        let val = text.trim()
        if(val == "")return;
        console.log('TRANSMITTING DATA TO SERVER : ',val)
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
