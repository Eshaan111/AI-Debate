'use client'
import React, { useEffect, useState } from 'react'

//REDUX IMPORTS
import { UseSelector, UseDispatch, useSelector } from 'react-redux'
import { pushMesg, setTopic, clear } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useMemo } from 'react'

import FirstGoerBar from './firstGoerBar'
import MesgPlaceholderStyle from './placeholderStream'
import LoadingBar from './loadingBar'
import { useLoadingContext } from '@/context/isLoading'


const MessageStream = () => {
    const {isLoadingValue,setLoading} = useLoadingContext()
    const mesgStream = useSelector((state: RootState) => state.stream.messages) 
    const [mesg_count, mesgCoutnState] = useState(0)

    const parsedStream = useMemo(() => {
        let convos = []
        mesgCoutnState(0)
        mesgStream.forEach(set_convo => {
            if (Object.keys(set_convo).length > 1) {
                convos.push(set_convo['favReply'])
                convos.push(set_convo['againstReply'])
                mesgCoutnState(mesg_count + 2)
            }

        });
        console.log(convos)
        console.log('mesg count = ', mesg_count)
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

    //====================RETURNING ELEMENT ================
    return (
        <div className="dc-message-stream">
            {(mesg_count == 0 && !isLoadingValue)?<MesgPlaceholderStyle/>:null}
            
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
            {(isLoadingValue)?<LoadingBar/>:null}

            
        </div>
    )
}

export default MessageStream
