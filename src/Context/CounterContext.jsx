import { createContext, useState } from "react";

export let CounterContext = createContext()


export function CounterContextProvider({ children }) {

    let [counter, setCounter] = useState(0)
    let [userName, setUserName] = useState('Ahmed')

    return <CounterContext.Provider value={{ counter, setCounter, userName, setUserName }}>
        {children}

    </CounterContext.Provider>
}