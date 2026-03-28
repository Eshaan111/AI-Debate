import React from 'react'
import ChatInput from './CSR/chatinput'
import MessageStream from './CSR/messageStream'
import ModelButton from './CSR/model_button'
import ModelPreferenceLabel from './CSR/label'
import { LoadingProvider } from '@/context/isLoading'
import SidePane from './CSR/sidepane'

const ChatArea = () => {

    return (
        <LoadingProvider>
            <div className="dc-workspace">
                <SidePane />
                <section className="dc-chat-container">

                    <div className="dc-chat-header">
                        <ModelPreferenceLabel inFavour={true} />
                        <ModelPreferenceLabel inFavour={false} />
                    </div>

                    <div className="dc-chat-messages">
                        <div className="dc-selector-tray dc-left-tray">
                            <span className="dc-tray-label">AGENT_VISUAL_REF</span>
                            <ModelButton src={'GEMINI.png'} name='GEMINI' inFavour={true} />
                            <ModelButton src={'GROQ.png'} name='GROQ' inFavour={true} />
                        </div>

                        <div className="dc-selector-tray dc-right-tray">
                            <span className="dc-tray-label">EMOTE_MATRIX</span>
                            <ModelButton src={'GEMINI.png'} name='GEMINI' inFavour={false} />
                            <ModelButton src={'GROQ.png'} name='GROQ' inFavour={false} />
                        </div>

                        <MessageStream />

                    </div>

                    <ChatInput />

                </section>
            </div>
        </LoadingProvider>
    )
}

export default ChatArea
