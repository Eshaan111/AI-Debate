'use client'
import React, { useState } from 'react'

const MessageStream = () => {
    let temp = [{id : 0, sender:'left', text : 'HELLO' },
                {id : 1, sender:'right', text : 'HELLO TO YOU TOO' },
                {id : 2, sender:'right', text : 'HELLO TO YOU TOO' },
                {id : 3, sender:'right', text : 'HELLO TO YOU TOO' }
    ]

    const [stream,setStream] = useState(temp);
    let classToAdd;
    let sender;

    const checkClass = (mesg)=>{
        sender = mesg.sender;
        if(sender == 'left'){
            classToAdd = "dc-msg-technical"
        }
        else{
            classToAdd = "dc-msg-technical-right"
        }
        return classToAdd;
    }

    return (
        <div className="dc-message-stream">
             {stream.map((mesg)=>(
                <div key = {mesg.id} className={checkClass(mesg)} >
                    {mesg.text} 
                </div>
            ))}
        </div>
    )
}

export default MessageStream
