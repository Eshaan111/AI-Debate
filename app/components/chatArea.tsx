import React from 'react'
import ChatInput from './chatinput'
import MessageStream from './messageStream'

const ChatArea = () => {
  return (
    <div className="dc-workspace">
        <section className="dc-chat-container">
            
            <div className="dc-chat-header">
            <span className="label">TRANSCRIPTION_BUFFER // 01</span>
            <span className="label">SECURE_CHANNEL</span>
            </div>

            <div className="dc-chat-messages">
                <div className="dc-selector-tray dc-left-tray">
                    <span className="dc-tray-label">AGENT_VISUAL_REF</span>
                    <div className="dc-slide">
                        <img src='GEMINI.png' alt="text" className="dc-slide-img" />
                        <span className="dc-slide-text">GEMINI</span>
                    </div>
                    <div className="dc-slide">
                        <img src='GROK.png' alt="text" className="dc-slide-img" />
                        <span className="dc-slide-text">GROK</span>
                    </div>
                    
                </div>

                <div className="dc-selector-tray dc-right-tray">
                    <span className="dc-tray-label">EMOTE_MATRIX</span>
                    <div className="dc-slide">
                        <img src='GEMINI.png' alt="text" className="dc-slide-img" />
                        <span className="dc-slide-text">GEMINI</span>
                    </div>
                    <div className="dc-slide">
                        <img src='GROK.png' alt="text" className="dc-slide-img" />
                        <span className="dc-slide-text">GROK</span>
                    </div>
                    
                </div>
                
                <MessageStream/>
            </div>

            <ChatInput/>

        </section>
    </div>
  )
}

export default ChatArea
