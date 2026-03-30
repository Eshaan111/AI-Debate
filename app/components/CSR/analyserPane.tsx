'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { axiosAPI } from '@/lib/axios'
const AnalyserPane = () => {
    const mesgStream = useSelector((state: RootState) => state.stream.messages)

    const winnerWrapper = () => {
        axiosAPI.post('/api/analyse', {
            mesgStream: mesgStream
        }).then((res) => {
            setMinnerModel(res.data.body.winner)
            setBestpoint(res.data.body.best_point)
            setInsult(res.data.body.insult_log)
        })
    }

    const [winnerModel, setMinnerModel] = useState('.======.')
    const [bestpoint, setBestpoint] = useState('-------')
    const [bestInsult, setInsult] = useState('-------')


    return (
        <div className="dc-right-pane">
            <div className="dc-judgement-card">
                <span className="dc-pane-label">FINAL_ADJUDICATION</span>
                <button className="dc-analyze-trigger" onClick={winnerWrapper}>
                    <span className="dc-trigger-led"></span>
                    <span className="dc-trigger-text">ENGAGE_JUDGEMENT_MATRIX</span>
                </button>

                {/* The Winner Header */}
                <div className="dc-winner-box">
                    <span className="dc-label-tiny">DECLARED_VICTOR</span>
                    <h2 className="dc-apple-winner">{winnerModel}</h2>
                </div>

                {/* The Points Analysis */}
                <div className="dc-analysis-section">
                    <span className="dc-pane-label">CRITICAL_STRIKES</span>
                    <ul className="dc-point-list">
                        <li>
                            <span className="dc-tag">BEST_POINT</span>
                            {bestpoint}
                        </li>
                        <li>
                            <span className="dc-tag warning">INSULT_LOG</span>
                            {bestInsult}
                        </li>
                    </ul>
                </div>

                {/* Metric Footer */}
                <div className="dc-matrix-footer">
                    <div className="dc-meta-item"><span>CONFIDENCE</span> <span>88%</span></div>
                    <div className="dc-meta-item"><span>BIAS_CHECK</span> <span>0.002</span></div>
                </div>
            </div>
        </div>
    )
}

export default AnalyserPane