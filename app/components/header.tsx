import React from 'react'

const Header = () => {
  const now = new Date();
  return (
    <header className="dc-header">
        <h1>AI Debate !</h1>
        <div className="dc-header-meta">
            <span>STATUS: ACTIVE_LINK</span>
            <span>PROTOCOL: 77-B</span>
            <span>{now.toLocaleDateString()}</span>
        </div>
    </header>
  )
}

export default Header
