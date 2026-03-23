'use client'
import { useContext, createContext, useState } from "react";

const loadingContext = createContext(false)

export function LoadingProvider({ children }) {
    const [isLoadingValue, setLoading] = useState(false)


    return (
        <loadingContext.Provider value={{isLoadingValue,setLoading}}>
           { children}
        </loadingContext.Provider>
    )
}

export function useLoadingContext(){
    const context = useContext(loadingContext)
    if(!context){
        return "NO CONTEXT FOUND"
    }
    return context
}