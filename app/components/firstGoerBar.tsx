'use client'
import React from 'react'

const FirstGoerBar = () => {

    const handleArgument = (firstGoerModel) => {
        return null;
    }


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

export default FirstGoerBar
