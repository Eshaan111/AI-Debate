'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushMesg, setTopic, clear } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'



const FirstGoerBar = () => {

    //---------REDUX--------
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const topic_redux = useSelector((state: RootState) => state.stream.topic)

    const handleArgument = (firstGoerModel) => {
        const searchParams = new URLSearchParams({
            'firstGoer': firstGoerModel,
            'topic': topic_redux,
            'mesgStreamArray': 
        })


        return (
            <div className="dc-widget-bar">
                <div className="dc-widget-label">ADJUDICATION // TOOLS</div>

                <div className="dc-widget-controls">
                    <button className="dc-widget-btn">
                        IN FAVOUR
                    </button>
                    <button className="dc-widget-btn active">
                        AGAINST FAVOUR
                    </button>
                </div>
            </div>

        )
    }
}

export default FirstGoerBar
