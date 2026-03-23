'use client'
import React from 'react'
const loadingBar = () => {
    return (
        <div className="dc-loading-status">
            <span className="dc-loading-dot"></span>
            <span className="dc-loading-text">PROCESSING_BUFFER...</span>
            <div className="dc-loading-bar"></div>
        </div>
    )
}

export default loadingBar
