import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessageStreamState {
  firstPitch : object,
  messages: object,
  topic: string

}
const initialState: MessageStreamState = {
  firstPitch : {},
  messages: {},
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
    pushPitch: (state, action: PayloadAction<object>)=>{
      let Pitchobject = action.payload
      Array.from(Object.keys(Pitchobject)).forEach(key => {
          state.firstPitch[key] = Pitchobject[key] 
      });
    },

    addMesg : (state, action : PayloadAction<object>)=>{
      const id = (Object.keys(state.messages)).length
      state.messages[id] = action.payload
    },
    // pushMesg: (state, action: PayloadAction<object>) => {
    //   state.messages.push(action.payload)
    // },

    // popindex: (state, action: PayloadAction<number>)=>{
    //   state.messages.splice(action.payload,1)
    // },

    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },

    clearMessage: (state) => {
      state.messages = {}
    },

    clearPitch : (state) => {
      state.firstPitch = {}
    }
  },
})

// Action creators are generated for each case reducer function
// export const { pushMesg, setTopic, clear, popindex, pushPitch } = streamSlice.actions
export const {setTopic, pushPitch, addMesg, clearPitch, clearMessage } = streamSlice.actions

export default streamSlice.reducer