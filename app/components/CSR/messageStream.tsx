'use client'
import React, { useEffect, useState } from 'react'

//REDUX IMPORTS
import { UseSelector, UseDispatch, useSelector, useDispatch } from 'react-redux'
import { setTopic, pushPitch, addMesg, clearPitch, clearMessage, setReqOutgoing, setResIncoming } from '../../../reduxFeatures/streamSlice'
import { RootState } from '../../store'
import { useMemo } from 'react'
import { axiosAPI } from '@/lib/axios.js'

import FirstGoerBar from './firstGoerBar'
import MesgPlaceholderStyle from './placeholderStream'
import LoadingBar from './loadingBar'
import { useLoadingContext } from '@/context/isLoading'
import FinishedBar from './finished'


const MessageStream = () => {
    //REDUX 
    const dispatch = useDispatch()
    const [pitch_count, setPitchCount] = useState(0);
    const pitchStream = useSelector((state: RootState) => state.stream.firstPitch)
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const mesgLimit = useSelector((state: RootState) => state.stream.mesgLimit)
    const topic = useSelector((state: RootState) => state.stream.topic)
    const mesgCount = (Object.keys(mesgStream)).length


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

    const postreqReply = async () => {
        if (Object.keys(mesgStream).length == 0) {
            return null
        }
        let bodyObj = {
            "topic": topic,
            "mesgStream": mesgStream
        }
        console.log('SENDING REPLY REQUEST')
        // const res = await axiosAPI.post(`./api/argument`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(bodyObj)
        // })
        dispatch(setReqOutgoing(true))
        dispatch(setResIncoming(false))
        const res = await axiosAPI.post('./api/argument', JSON.stringify(bodyObj))
        const replyObj = res.data
        dispatch(setReqOutgoing(false))
        dispatch(setResIncoming(true))
        dispatch(addMesg(replyObj.mesgObject))
        console.log('RESPONSE : ', replyObj.mesgObject)
        return replyObj

        // console.log('DDDDDDDDDDDDDDDDDDDDD', JSON.stringify(mesgStream))
        // console.log('DDDDDDDDDDDDDDDDDDDDDSSDWAD', mesgStream)
    }

    useEffect(() => {
        // let replyObj = postreqReply()
        let mesgCount = Object.keys(mesgStream).length
        if (mesgCount > 0) { setLoading(true) }
        if (mesgCount < mesgLimit * 2) {
            setTimeout(() => {
                postreqReply()
            }, 2000);

        }
        if (mesgCount == mesgLimit * 2) {
            setLoading(false)
        }
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
            {(Object.keys(mesgStream).length >= mesgLimit * 2) ? <FinishedBar /> : null}


        </div>
    )
}

export default MessageStream
