/** 
 * Context that controls the scroll of an element
*/

import { ReactNode, RefObject, createContext, useEffect, useState } from "react";

interface ScrollContextProps {
    lock: () => void
    unlock: () => void
    scrollTo: (y: number) => void
    locked: boolean
    scrollRef: RefObject<HTMLDivElement>
}

export const ScrollContext = createContext<ScrollContextProps | null>(null);


interface ScrollProviderProps {
    scrollRef: RefObject<HTMLDivElement>
    children: ReactNode
    direction: "x" | "y" | "both"
}

export const ScrollProvider = (props: ScrollProviderProps) => {
    const { children, scrollRef, direction } = props

    const [ locked, setLocked ] = useState(false)
    
    const _getOverflow = () => {
        let overflow = "overflow"
        if (direction === "x") overflow = "overflow-x"
        if (direction === "y") overflow = "overflow-y"
        return overflow
    }

    const lock = () => {
        if (!scrollRef.current) return
        scrollRef.current?.style.setProperty(_getOverflow(), "hidden")
        setLocked(true)
    }

    const unlock = () => {
        if (!scrollRef.current) return
        scrollRef.current?.style.setProperty(_getOverflow(), "auto")
        setLocked(false)
    }

    const scrollTo = (y = 0) => {
        if (!scrollRef.current) return
        scrollRef.current.scrollTop = y
    }

    /** 
     * Propagate locked state to any scrollRef
    */
    useEffect(() => {
        if (locked) {
            scrollRef.current?.style.setProperty(_getOverflow(), "hidden")
        } else {
            scrollRef.current?.style.setProperty(_getOverflow(), "auto")
        }
    }, [scrollRef])

    return (
        <ScrollContext.Provider 
            value={{
                lock, 
                unlock, 
                scrollTo,
                locked,
                scrollRef
            }}
        >
            {children}
        </ScrollContext.Provider>
    )
}