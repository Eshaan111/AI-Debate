import React from 'react'
import ChatInput from './chatinput'
import MessageStream from './messageStream'
import ModelButton from './model_button'
import ModelPreferenceLabel from './label'


const ChatArea = () => {
    let temp = [{id : 0, sender:'modelInFavour', text : 'HELLO' },
                    {id : 1, sender:'modelAgainst', text : 'HELLO TO YOU TOO' },
                    {id : 2, sender:'modelAgainst', text : 'HELLO TO YOU TOO' },
                    {id : 3, sender:'modelAgainst', text : 'HELLO TO YOU TOO' }
        ]
    


      return (
    <div className="dc-workspace">
        <section className="dc-chat-container">
            
            <div className="dc-chat-header">
            {/* <span className="label">MODEL IN FAVOUR {modelInFavour}</span>
            <span className="label">MODEL AGAINST {modelAgainst}</span> */}
            <ModelPreferenceLabel inFavour={true}/>
            <ModelPreferenceLabel inFavour={false}/>
            </div>

            <div className="dc-chat-messages">
                <div className="dc-selector-tray dc-left-tray">
                    <span className="dc-tray-label">AGENT_VISUAL_REF</span>
                    <ModelButton src={'GEMINI.png'} name='GEMINI' inFavour = {true}/>
                    <ModelButton src={'GROQ.png'} name='GROQ' inFavour = {true}/>
                </div>

                <div className="dc-selector-tray dc-right-tray">
                    <span className="dc-tray-label">EMOTE_MATRIX</span>
                    <ModelButton src={'GEMINI.png'} name='GEMINI' inFavour = {false}/>
                    <ModelButton src={'GROQ.png'} name='GROQ' inFavour = {false}/>
                </div>
        
                <MessageStream />
        
            </div>

            <ChatInput />

        </section>
    </div>
  )
}

export default ChatArea
