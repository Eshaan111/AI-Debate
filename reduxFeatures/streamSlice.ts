import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessageStreamState {
  messages: object[]
}

const initialState : MessageStreamState = {
  messages: [],
}

export const streamSlice = createSlice({
  name: 'MessageStream',
  initialState,
  reducers: {
    push : (state,action: PayloadAction<object> ) =>{
        state.messages.push(action.payload)
    },

    clear: (state) => {
      state.messages = []
    }

  },
})

// Action creators are generated for each case reducer function
export const { push, clear } = streamSlice.actions

export default streamSlice.reducer