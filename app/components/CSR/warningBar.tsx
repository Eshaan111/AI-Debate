import React from 'react'

const WarningBar = () => {
    return (
        <div className="dc-status-warning">
            <div className="dc-warning-stripe"></div>
            <div className="dc-warning-content">
                <span className="dc-warning-header">IDENTITY_ERROR // NO_AGENT_DETECTED</span>
                <p className="dc-warning-body">
                    PRIMARY TRANSMISSION BUFFER IS LOCKED. PLEASE SELECT AN AGENT VISUAL
                    AND EMOTE MATRIX FROM THE TOP-TIER TRAYS TO INITIALIZE.
                </p>
            </div>
            <div className="dc-warning-code">ERR_0x001</div>
        </div>
    )
}

export default WarningBar