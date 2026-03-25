'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setTopic, pushPitch, addMesg, clearPitch, clearMessage } from '@/reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useSearchParams } from 'next/navigation';
import { useLoadingContext } from '@/context/isLoading'

const ChatInput = () => {


    const [text, setText] = useState('');
    const [modelInFavour, setModelInFavour] = useState('Un-Signed')
    const [modelAgainst, setModelAgainst] = useState('Un-Signed')

    const curr_params = useSearchParams();

    //==========LOADING CONTEXT===============
    const { isLoadingValue, setLoading } = useLoadingContext()
    useEffect(()=>{
        console.log('LOAD RENDER STATUS : ', isLoadingValue)
    },[isLoadingValue])
    

    // ============= CHANGING MODEL PREFERENCE ==================

    useEffect(() => {
        for (const [key, value] of curr_params.entries()) {
            if (key == 'modelInFavour' && value != `undefined`) { setModelInFavour(value) }
            else if (key == 'modelAgainst' && value != `undefined`) { setModelAgainst(value) }
        }
    }, [curr_params])

    const checkModelPreference = () => {
        return (modelInFavour != 'Un-Signed' && modelAgainst != 'Un-Signed')
    }

    //=======================REDUX EFFECTS + DATA EXTRACTION =================================

    const pitchObject = useSelector((state: RootState) => state.stream.firstPitch)
    const topic_redux = useSelector((state: RootState) => state.stream.topic)
    const dispatch = useDispatch()

    const handlePitchAddition = async (obj: any) => {
        console.log(obj)
        let fav = { id: `PITCH-FAV`, sender: `modelInFavour`, model : modelInFavour, text: obj['mesg-fav'] }
        let against = { id: `PITCH-AGNST`, sender: `modelAgainst`, model : modelAgainst, text: obj['mesg-against'] }
        let fav_aga_set_obj = { favPitch: fav, againstPitch: against }
        dispatch(pushPitch(fav_aga_set_obj))

    }

    useEffect(()=>{
        console.log('UPDATED PITCH OBJECT IN REDUX',pitchObject)
    },[pitchObject])


    // useEffect(() => {
    //     console.log("Updated Stream in Redux:", mesgStream);
    // }, [mesgStream])

    useEffect(() => {
        console.log("Updated topic in Redux:", topic_redux);
        dispatch(clearMessage())
        dispatch(clearPitch())
    }, [topic_redux])



    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    const handleTransmit = async () => {

        if (!checkModelPreference()) {
            console.log("MODEL PREFERENCE NOT SELECTED")
            return
        };

        let val = text.trim()
        if (val == "") { console.log('empty input'); return };
        setText('')
        console.log('TRANSMITTING DATA TO SERVER : ', val)

        const params = new URLSearchParams({
            sender: 'user',
            data: val,
            modelInFavour: modelInFavour,
            modelAgainst: modelAgainst
        })
        setLoading(true)
        dispatch(setTopic(val))
        // console.log('LOADING VALUE : ', isLoadingValue)
        const res = await fetch(`/api/chat?${params}`)
        const ans = await res.json()
        setLoading(false)
        // console.log('LOADING VALUE : ', isLoadingValue)
        handlePitchAddition(ans)


    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleTransmit()
        }
    }

    return (

        <div className="dc-chat-input-zone">
            <input type="text" className="dc-chat-input" placeholder="INPUT ARGUMENT..." onChange={handleChange} onKeyDown={handleKeyDown} value={text} />
            <button className="dc-send-btn" onClick={handleTransmit}>Transmit</button>
        </div>

    )
}

export default ChatInput
