import { configureStore } from '@reduxjs/toolkit'
import streamReducer from '../reduxFeatures/streamSlice'

export const store = configureStore({
  reducer: {
    stream: streamReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
