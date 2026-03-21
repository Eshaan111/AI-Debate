'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push, clear } from '../../reduxFeatures/streamSlice'
import { RootState } from '../store'
import { useSearchParams } from 'next/navigation';


const ChatInput = () => {

    const mesgStream = useSelector((state: RootState) => state.stream.messages)
    const dispatch = useDispatch()
    const [text, setText] = useState('');
    const [modelInFavour, setModelInFavour] = useState('Un-Signed')
    const [modelAgainst, setModelAgainst] = useState('Un-Signed')

    const curr_params = useSearchParams();

    useEffect(() => {
        for (const [key, value] of curr_params.entries()) {
            if (key == 'modelInFavour' && value != `undefined`) { setModelInFavour(value) }
            else if (key == 'modelAgainst' && value != `undefined`) { setModelAgainst(value) }
        }
    }, [curr_params])

    const handleStreamAddition = async (obj: any) => {
        console.log(obj)
        let key = mesgStream.length
        let fav = { id: `${key}FAV`, sender: 'modelInFavour', text: obj['mesg-fav'] }
        let against = { id: `${key}AGNST`, sender: 'modelAgainst', text: obj['mesg-against'] }
        let fav_aga_set_obj = {favReply : fav, againstReply : against}
        console.log(fav_aga_set_obj)
        dispatch(push(fav_aga_set_obj))

    }

    useEffect(() => {
        console.log("Updated Stream in Redux:", mesgStream);
    }, [mesgStream])


    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    const checkModelPreference = () => {
        return (modelInFavour != 'Un-Signed' && modelAgainst != 'Un-Signed')
    }

    const handleTransmit = async () => {

        if (!checkModelPreference()) {
            console.log("MODEL PREFERENCE NOT SELECTED")
            return
        };

        let val = text.trim()
        if (val == "") { console.log('empty input'); return };
        setText('')
        console.log('TRANSMITTING DATA TO SERVER : ', val)

        const params = new URLSearchParams({
            sender: 'user',
            data: val,
            modelInFavour: modelInFavour,
            modelAgainst: modelAgainst
        })

        const res = await fetch(`/api/chat?${params}`)
        const ans = await res.json()
        handleStreamAddition(ans)

    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleTransmit()
        }
    }

    return (

        <div className="dc-chat-input-zone">
            <input type="text" className="dc-chat-input" placeholder="INPUT ARGUMENT..." onChange={handleChange} onKeyDown={handleKeyDown} value={text} />
            <button className="dc-send-btn" onClick={handleTransmit}>Transmit</button>
        </div>

    )
}

export default ChatInput
