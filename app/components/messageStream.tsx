'use client'
import React, { useEffect, useState } from 'react'

//REDUX IMPORTS
import { UseSelector, UseDispatch, useSelector } from 'react-redux'
import { pushMesg, setTopic, clear, popindex } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useMemo } from 'react'

import FirstGoerBar from './firstGoerBar'
import MesgPlaceholderStyle from './placeholderStream'
import LoadingBar from './loadingBar'
import { useLoadingContext } from '@/context/isLoading'


const MessageStream = () => {
    //REDUX 
    const pitchStream = useSelector((state: RootState) => state.stream.firstPitch)

    const { isLoadingValue, setLoading } = useLoadingContext()
    const [pitch_count, pitchCoutnState] = useState(0)

    let parsedPtich = useMemo(() => {
        let convos = []
        pitchCoutnState(0)
        Array.from(Object.keys(pitchStream)).forEach(key => {
            convos.push(pitchStream[key])
            pitchCoutnState(pitch_count+1)
        });


        // console.log(convos)
        return convos;

    }, [pitchStream])
    
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
            {(pitch_count == 0 && !isLoadingValue) ? <MesgPlaceholderStyle /> : null}

            {parsedPtich.map((mesg) => {
                return (
                    <div key={mesg.id} className={checkClass(mesg)} >
                        {mesg.text}
                    </div>
                )

            })}
            <div>
                {(pitch_count == 2) ? <FirstGoerBar /> : null}
            </div>
            {(isLoadingValue) ? <LoadingBar /> : null}


        </div>
    )
}

export default MessageStream
