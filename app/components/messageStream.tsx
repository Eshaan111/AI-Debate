'use client'
import React, { useEffect, useState } from 'react'
import { UseSelector, UseDispatch, useSelector } from 'react-redux'
import { push, clear } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useMemo } from 'react'
import FirstGoerBar from './firstGoerBar'

const MessageStream = () => {

    const mesgStream = useSelector((state: RootState) => state.stream.messages) // AOB

    const [mesg_count,mesgCoutnState] = useState(0)

    const parsedStream = useMemo(() => {
        let convos = []
        mesgStream.forEach(set_convo => {
            convos.push(set_convo['favReply'])
            convos.push(set_convo['againstReply'])
            mesgCoutnState(mesg_count+2)
        });
        console.log(convos)
        console.log('mesg count = ',mesg_count)
        return convos;

    }, [mesgStream])


    let classToAdd;
    let sender;

    const checkClass = (mesg: any) => {
        sender = mesg.sender;
        if (sender == 'modelInFavour') {
            classToAdd = "dc-msg-technical"
        }
        else {
            classToAdd = "dc-msg-technical-right"
        }
        return classToAdd;
    }

    return (
        <div className="dc-message-stream">

            {parsedStream.map((mesg) => {
                return (
                    <div key={mesg.id} className={checkClass(mesg)} >
                        {mesg.text}
                    </div>
                )

            })}
            <div>
                {(mesg_count==2)?<FirstGoerBar/>:null}
            </div>
            
        </div>
            )
}

            export default MessageStream
