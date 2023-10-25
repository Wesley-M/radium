import { ReactNode, createContext, useState } from "react";
import { Station } from "../../../../libs/radio-browser-api.types";
import { useRecentlyPlayed } from "@api/index";

interface PlaylistControls {
    add: (station: Station) => void
    list: () => Station[]
    set: (stations: Station[], position?: number) => void
    isEmpty: () => boolean
    getStream: () => Station | null
    nextStream: () => void
    hasNext: () => boolean
    prevStream: () => void
    hasPrev: () => boolean
}

export const PlaylistContext = createContext<PlaylistControls | null>(null)


interface PlaylistProviderProps {
    children: ReactNode,
}

export const PlaylistProvider = (props: PlaylistProviderProps) => {
    const { children } = props

    const recentlyPlayed = useRecentlyPlayed()
    const [queue, setQueue] = useState<Station[]>(recentlyPlayed?.list({ reverse: true }))
    const [position, setPosition] = useState(0)

    const isEmpty = () => queue.length === 0

    /**
     * Get the current stream
    */
    const getStream = () => {
        if (isEmpty()) return null
        // console.table([queue[position].name, queue[position].id, queue[position]])
        return queue[position]
    }

    /**
     * Advance to the next stream
     * 
     * Warning: Prefer using the player controls (skipNext) to skip to the next stream.
     *  This function should only be used by the player controls.
    */
    const nextStream = () => {
        if (isEmpty()) return
        setPosition(Math.min(queue.length - 1, position + 1))
    }

    /**
     * Whether there is a next stream
    */
    const hasNext = () => position < queue.length - 1

    /**
     * Go back to the previous stream
     * 
     * Warning: Prefer using the player controls (skipPrev) to skip to the previous stream.
     *  This function should only be used by the player controls.
    */
    const prevStream = () => {
        if (isEmpty()) return
        setPosition(Math.max(0, position - 1))
    }

    /**
     * Whether there is a previous stream
    */
    const hasPrev = () => position > 0

    /** 
     * Add a station to the queue
    */
    const add = (station: Station) => setQueue([...queue, station])
    
    /**
     * Get the list of stations in the queue
    */
    const list = () => queue

    /**
     * Replace the list of stations in the queue and set the current position
    */
    const set = (stations: Station[], position = 0) => {
        setQueue(stations)
        const invalidPos = (position < 0 || position > stations.length - 1)
        setPosition(invalidPos ? 0 : position)
    }

    return (
        <PlaylistContext.Provider 
            value={{ 
                add,
                list,
                set,
                isEmpty,
                getStream,
                nextStream,
                hasNext,
                prevStream,
                hasPrev
            }}
        >
            {children}
        </PlaylistContext.Provider>
    )
}