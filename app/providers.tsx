'use client' // This is the magic line
import { Provider } from 'react-redux'
import { store } from './store'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}