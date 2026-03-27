'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { UseSelector, UseDispatch, useSelector, useDispatch } from 'react-redux'
import { setTopic, pushPitch, addMesg, clearPitch, clearMessage } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'

const SidePane = () => {

    const dispatch = useDispatch()
    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const mesgCount = (Object.keys(mesgStream)).length

    const [mesg_count, setMesgCount] = useState(mesgCount)
    const [swingDirection, setSwingDirection] = useState('center'); // 'incoming' | 'ongoing' | 'center'

    useEffect(() => {
        if (mesg_count > 0) {
            // Toggle side based on who sent the last message
            const lastSender = parsedStream[parsedStream.length - 1]?.sender;
            setSwingDirection(lastSender === 'modelInFavour' ? 'ongoing' : 'incoming');
        }
    }, [mesg_count]);
    return (
        <div className="dc-side-pane">
            {/* Upper Section: The Counter */}
            <div className="dc-counter-card">
                <span className="dc-pane-label">TOTAL_LOGIC_UNITS</span>
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

export default SidePane
