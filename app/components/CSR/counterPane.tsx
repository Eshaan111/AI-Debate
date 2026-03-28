'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { UseSelector, UseDispatch, useSelector, useDispatch } from 'react-redux'
import { setTopic, pushPitch, addMesg, clearPitch, clearMessage, setMesgLimit } from '../../../reduxFeatures/streamSlice'
import { RootState } from '../../store'

const CounterPane = () => {

    const dispatch = useDispatch()
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const resIncoming = useSelector((state: RootState) => state.stream.resIncoming)
    const reqOutgoing = useSelector((state: RootState) => state.stream.reqOutgoing)
    const mesgLimit = useSelector((state: RootState) => state.stream.mesgLimit)
    const mesgCount = (Object.keys(mesgStream)).length


    const [mesg_count, setMesgCount] = useState(mesgLimit)
    const [swingDirection, setSwingDirection] = useState('center'); // 'incoming' | 'ongoing' | 'center'

    useEffect(() => {
        console.log('SWING_TRIGGER => ', { reqOutgoing, resIncoming });
        // Toggle side based on who sent the last message
        if (resIncoming) {
            setSwingDirection('incoming')
            return
        }
        else if (reqOutgoing) {
            setSwingDirection('ongoing')
            return
        }
        else {
            setSwingDirection('center')
            return
        }

    }, [resIncoming, reqOutgoing]);

    useEffect(() => {
        dispatch(setMesgLimit(mesg_count))
    }, [mesg_count])

    return (
        <div className="dc-side-pane">
            {/* Upper Section: The Counter */}
            <div className="dc-counter-card">
                <span className="dc-pane-label">ARG PER MODEL</span>
                <h2 className="dc-apple-counter">{mesg_count}</h2>
                <div className="dc-counter-controls">
                    <button className="dc-counter-btn" onClick={() => setMesgCount(prev => prev + 1)}>＋</button>
                    <button className="dc-counter-btn" onClick={() => setMesgCount(prev => Math.max(0, prev - 1))}>－</button>
                </div>
            </div>

            {/* Lower Section: Boilerplate / Oscilloscope */}
            <div className="dc-status-card">
                <span className="dc-pane-label">MOMENTUM_STASIS</span>

                <div className="dc-pendulum-enclosure">
                    {/* The Scale/Extreme Labels */}
                    <div className="dc-pendulum-label left">INCOMING</div>
                    <div className="dc-pendulum-label right">ONGOING</div>

                    {/* The Actual Pendulum */}
                    <div className={`dc-pendulum-arm ${swingDirection}`}>
                        {/* <div className={`dc-pendulum-arm incoming`}> */}
                        <div className="dc-pendulum-weight"></div>
                    </div>

                    {/* The Degree Scale (Boilerplate) */}
                    <div className="dc-pendulum-scale">
                        <span>45°</span><span>0°</span><span>45°</span>
                    </div>
                </div>

                <div className="dc-metadata-list">
                    <div className="dc-meta-item"><span>VELOCITY</span> <span>9.8m/s</span></div>
                    <div className="dc-meta-item"><span>FRICTION</span> <span>0.02μ</span></div>
                </div>
            </div>
        </div>
    )
}

export default CounterPane
