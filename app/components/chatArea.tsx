import React from 'react'

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
                    <div className="dc-slide">ICON_01</div>
                    <div className="dc-slide">ICON_02</div>
                    <div className="dc-slide">ICON_03</div>
                    <div className="dc-slide">ICON_04</div>
                    <div className="dc-slide">ICON_05</div>
                </div>

                <div className="dc-selector-tray dc-right-tray">
                    <span className="dc-tray-label">EMOTE_MATRIX</span>
                    <div className="dc-slide">DATA_A</div>
                    <div className="dc-slide">DATA_B</div>
                    <div className="dc-slide">DATA_C</div>
                    <div className="dc-slide">DATA_D</div>
                    <div className="dc-slide">DATA_E</div>
                </div>

                <div className="dc-message-stream">
                    <div className="dc-msg-technical">
                    [SYSTEM]: ANALYZING INPUT... 
                    </div>
                    <div className="dc-msg-technical" style={{ alignSelf: 'flex-end', borderColor: 'var(--sage)' }}>
                    [USER]: REQUESTING DEBATE PARAMETERS.
                    </div>
                </div>
            </div>

            <div className="dc-chat-input-zone">
            <input type="text" className="dc-chat-input" placeholder="INPUT ARGUMENT..."/>
            <button className="dc-send-btn">Transmit</button>
            </div>

        </section>
    </div>
  )
}

export default ChatArea
