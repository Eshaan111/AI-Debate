import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface appState {
  firstPitch: object,
  messages: object,
  topic: string,
  mesgLimit: number;
  reqOutgoing: boolean,
  resIncoming: boolean

}
const initialState: appState = {
  firstPitch: {},
  messages: {},
  topic: '',
  mesgLimit: 7,
  reqOutgoing: false,
  resIncoming: false
}

export const streamSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    pushPitch: (state, action: PayloadAction<object>) => {
      let Pitchobject = action.payload
      Array.from(Object.keys(Pitchobject)).forEach(key => {
        state.firstPitch[key] = Pitchobject[key]
      });
    },

    addMesg: (state, action: PayloadAction<object>) => {
      const id = (Object.keys(state.messages)).length
      state.messages[id] = action.payload
    },

    setResIncoming: (state, action: PayloadAction<boolean>) => {
      state.resIncoming = action.payload
    },

    setReqOutgoing: (state, action: PayloadAction<boolean>) => {
      state.reqOutgoing = action.payload
    },

    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },

    setMesgLimit: (state, action: PayloadAction<number>) => {
      state.mesgLimit = action.payload;
    },

    clearMessage: (state) => {
      state.messages = {}
    },

    clearPitch: (state) => {
      state.firstPitch = {}
    }
  },
})

export const { setTopic, pushPitch, addMesg, clearPitch, clearMessage, setReqOutgoing, setResIncoming, setMesgLimit } = streamSlice.actions

export default streamSlice.reducer