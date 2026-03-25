import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessageStreamState {
  messages: object[],
  topic: string

}
const initialState: MessageStreamState = {
  messages: [],
  topic: ''
}

// FORMAT OF MESSAGES : [ ARRAY OF OBJECTS , each object is a convo set, ie reply and question set 
//   {
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//     againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
//   },
//   { 
//     favReply : { id: `${key}FAV`, sender: 'gemini' or 'groq', text: 'message' },
//  
//   },
// {
//   againstReply : {id: `${key}AGNST`, sender: 'gemini' or 'groq', text: 'message'}
// }
// 
// ]

export const streamSlice = createSlice({
  name: 'MessageStream',
  initialState,
  reducers: {
    pushMesg: (state, action: PayloadAction<object>) => {
      state.messages.push(action.payload)
    },

    popindex: (state, action: PayloadAction<number>)=>{
      state.messages.splice(action.payload,1)
    },

    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },

    clear: (state) => {
      state.messages = []
    }

  },
})

// Action creators are generated for each case reducer function
export const { pushMesg, setTopic, clear, popindex } = streamSlice.actions

export default streamSlice.reducer