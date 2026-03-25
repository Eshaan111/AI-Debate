'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTopic, pushPitch, addMesg, clearPitch, clearMessage } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'



const FirstGoerBar = () => {


    //---------REDUX--------
    const dispatch = useDispatch()
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const topic_redux = useSelector((state: RootState) => state.stream.topic)
    const pitchStream = useSelector((state: RootState) => state.stream.firstPitch)




    const handleFirstChoice = async (firstGoer_InFavour: boolean) => {

        let fav_pitch = pitchStream.favPitch
        let against_pitch = pitchStream.againstPitch
        let pitch_to_add = (firstGoer_InFavour) ? fav_pitch : against_pitch

        let mesgObj = { sender: pitch_to_add.sender, model: pitch_to_add.model, text: pitch_to_add.text }
        dispatch(addMesg(mesgObj))
        
        
        
        const res = await fetch(`./api/argument`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(mesgStream)
        })
        console.log('DDDDDDDDDDDDDDDDDDDDD',JSON.stringify(mesgStream))
        console.log('DDDDDDDDDDDDDDDDDDDDDSSDWAD',mesgStream)
    }


    return (
        <div className="dc-widget-bar">
            <div className="dc-widget-label">ADJUDICATION // TOOLS</div>

            <div className="dc-widget-controls">
                <button className="dc-widget-btn" onClick={() => { handleFirstChoice(true) }}>
                    {/* <button className="dc-widget-btn"> */}
                    IN FAVOUR
                </button>
                <button className="dc-widget-btn active" onClick={() => { handleFirstChoice(false) }}>
                    {/* <button className="dc-widget-btn active"> */}

                    AGAINST FAVOUR
                </button>
            </div>
        </div>

    )
}


export default FirstGoerBar
