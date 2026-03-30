import React from 'react'

const FinishedBar = () => {
    return (
        <div className="dc-status-finished">
            <span className="dc-finished-led"></span>
            <div className="dc-finished-content">
                <span className="dc-finished-text">MESG_LIMIT_REACHED</span>
                <span className="dc-finished-subtext">PROCEED TO RIGHT PANE FOR ANALYSIS</span>
            </div>
            <div className="dc-finished-icon">!</div>
        </div>
    )
}

export default FinishedBar