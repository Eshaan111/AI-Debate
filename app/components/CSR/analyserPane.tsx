'use client'
import React from 'react'
const AnalyserPane = () => {
    return (
        <div className="dc-right-pane">
            <div className="dc-judgement-card">
                <span className="dc-pane-label">FINAL_ADJUDICATION</span>

                {/* The Winner Header */}
                <div className="dc-winner-box">
                    <span className="dc-label-tiny">DECLARED_VICTOR</span>
                    <h2 className="dc-apple-winner">IN_FAVOUR</h2>
                </div>

                {/* The Points Analysis */}
                <div className="dc-analysis-section">
                    <span className="dc-pane-label">CRITICAL_STRIKES</span>
                    <ul className="dc-point-list">
                        <li>
                            <span className="dc-tag">BEST_POINT</span>
                            "The recursive nature of the prompt undermines the initial premise."
                        </li>
                        <li>
                            <span className="dc-tag warning">INSULT_LOG</span>
                            "Your logic has the structural integrity of wet tissue paper."
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