'use client'
import React, { useEffect, useState } from 'react'

//REDUX IMPORTS
import { UseSelector, UseDispatch, useSelector, useDispatch } from 'react-redux'
import { setTopic, pushPitch, addMesg, clearPitch, clearMessage } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useMemo } from 'react'

import FirstGoerBar from './firstGoerBar'
import MesgPlaceholderStyle from './placeholderStream'
import LoadingBar from './loadingBar'
import { useLoadingContext } from '@/context/isLoading'


const MessageStream = () => {
    //REDUX 
    const dispatch = useDispatch()
    const [pitch_count, setPitchCount] = useState(0);
    const pitchStream = useSelector((state: RootState) => state.stream.firstPitch)
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const topic = useSelector((state:RootState)=> state.stream.topic)

    const { isLoadingValue, setLoading } = useLoadingContext()

    let parsedPtich = useMemo(() => {
        let convos = []
        Array.from(Object.keys(pitchStream)).forEach(key => {
            convos.push(pitchStream[key])
        });
        return convos
    }, [pitchStream])


    let parsedMessages = useMemo(() => {
        let convos = []
        Array.from(Object.keys(mesgStream)).forEach(id => {
            convos.push(mesgStream[id])
        })
        return convos
    }, [mesgStream])

    const postreq = async () => {
        if(Object.keys(mesgStream).length == 0){
            return null
        }
        let bodyObj = {
            "topic" : topic   ,
            "mesgStream" : mesgStream
        }
        const res = await fetch(`./api/argument`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        })
        // console.log('DDDDDDDDDDDDDDDDDDDDD', JSON.stringify(mesgStream))
        // console.log('DDDDDDDDDDDDDDDDDDDDDSSDWAD', mesgStream)
    }

    useEffect(() => {
        postreq()
    }, [mesgStream])




    const checkClass = (mesg: any) => {
        let sender = mesg.sender;
        let classToAdd;
        if (sender == 'modelInFavour') {
            classToAdd = "dc-msg-technical"
        }
        else {
            classToAdd = "dc-msg-technical-right"
        }
        return classToAdd;
    }

    useEffect(() => {
        console.log('MESSAGE STREAM UPDATED', mesgStream)
    }, [mesgStream])

    //====================RETURNING ELEMENT ================
    return (
        <div className="dc-message-stream">
            {(parsedPtich.length == 0 && !isLoadingValue && parsedMessages.length == 0) ? <MesgPlaceholderStyle /> : null}

            {parsedMessages.length == 0 && parsedPtich.map((mesg) => {
                return (
                    <div key={mesg.id} className={checkClass(mesg)} >
                        {mesg.text}
                    </div>
                )
            })}

            {parsedMessages.map((mesg, index) => {
                return (
                    <div key={index} className={checkClass(mesg)} >
                        {mesg.text}
                    </div>
                )
            })}


            <div>
                {(parsedPtich.length == 2 && parsedMessages.length == 0) ? <FirstGoerBar /> : null}
            </div>
            {(isLoadingValue) ? <LoadingBar /> : null}


        </div>
    )
}

export default MessageStream
