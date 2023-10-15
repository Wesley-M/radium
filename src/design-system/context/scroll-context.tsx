/** 
 * Context that controls the scroll of an element
*/

import { ReactNode, RefObject, createContext, useEffect, useState } from "react";

interface ScrollContextProps {
    lock: () => void
    unlock: () => void
    scrollTo: (y: number) => void
    locked: boolean
}

export const ScrollContext = createContext<ScrollContextProps | null>(null);


interface ScrollProviderProps {
    scrollRef: RefObject<HTMLDivElement>
    children: ReactNode
}

export const ScrollProvider = (props: ScrollProviderProps) => {
    const { children, scrollRef } = props

    const [ locked, setLocked ] = useState(false)

    const lock = () => {
        scrollRef.current?.style.setProperty("overflow", "hidden")
        setLocked(true)
    }

    const unlock = () => {
        scrollRef.current?.style.setProperty("overflow", "auto")
        setLocked(false)
    }

    const scrollTo = (y = 0) => {
        if (!scrollRef.current) return
        scrollRef.current.scrollTop = y
    }

    useEffect(() => {
        if (locked) {
            scrollRef.current?.style.setProperty("overflow", "hidden")
        } else {
            scrollRef.current?.style.setProperty("overflow", "auto")
        }
    }, [scrollRef])
    

    return (
        <ScrollContext.Provider 
            value={{
                lock, 
                unlock, 
                scrollTo,
                locked,
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}