import { ReactNode, createContext, useEffect, useState } from "react";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { usePlaylist } from "@hooks/use-playlist";
import { useRecentlyPlayed } from "@api/index";
import { Station } from "libs/radio-browser-api.types";
import toast from "react-hot-toast";
import { Text } from "@design-system/components/data-display/text";

interface PlayerControls {
    play: (scheduled?: boolean) => void
    pause: () => void
    toggle: (station?: Station) => void
    isPlaying: (station?: Station) => boolean
    changeVolume: (vol: number) => void
    getVolume: () => number
    skipPrev: () => void
    skipNext: () => void
    isLoading: () => boolean
}

export const PlayerContext = createContext<PlayerControls | null>(null)

interface PlayerProviderProps {
    children: ReactNode,
}

export const PlayerProvider = (props: PlayerProviderProps) => {
    const { children} = props

    const gap = useGlobalAudioPlayer();
    const playlist = usePlaylist()
    const recently_played = useRecentlyPlayed()

    const [volume, setVolume] = useState(60)
    const [autoplay, setAutoplay] = useState(false)
    const [scheduledPlay, setScheduledPlay] = useState(false)
    
    const stream = playlist?.getStream()

    /** 
     * Load the current stream
    */
    const load = () => {
        if (!stream?.urlResolved) return
        gap.load(stream?.urlResolved || "", {
            autoplay,
            html5: true,
            initialVolume: volume / 100,
            format: stream?.codec.toLowerCase()
        })
    }

    /** 
     * Play the current stream
    */
    const play = (scheduled?: boolean) => {
        if (scheduled && scheduledPlay) return
        if (scheduled) schedulePlay()
        instantPlay()
    }

    /** 
     * Schedule a play event
    */
    const schedulePlay = () => {
        setScheduledPlay(true)
    }

    /** 
     * Handle a scheduled play event
    */
    const handleScheduledPlay = () => {
        if (!scheduledPlay) return
        setScheduledPlay(false)
        play()
    }

    /** 
     * Play the current stream without scheduling
    */
    const instantPlay = () => {
        // If the playlist is empty, there is nothing to play
        if (playlist?.isEmpty()) return
        
        // Add the stream to the recently played list
        recently_played?.add(stream)

        gap.play()
    }

    /** 
     * Pause the current stream
    */
    const pause = () => {
        if (playlist?.isEmpty()) return
        setScheduledPlay(false)
        gap.pause()
    }

    /** 
     * Toggle play/pause
    */
    const toggle = (station?: Station) => {
        isPlaying(station) ? pause() : play(true)
    }

    /** 
     * Change the volume (0-100)
    */
    const changeVolume = (vol: number) => {
        if (vol >= 0 && vol <= 100) {
            setVolume(vol)
        }
    }

    /** 
     * Skip to previous stream in the playlist
    */
    const skipPrev = () => {
        if(!autoplay) setAutoplay(true)
        playlist?.prevStream()
        play(true)
    }

    /** 
     * Skip to next stream in the playlist
    */
    const skipNext = () => {
        if (!autoplay) setAutoplay(true)
        playlist?.nextStream()
        play(true)
    }

    /** 
     * Check if a stream is playing (current stream or passed stream)
    */
    const isPlaying = (station?: Station) => {
        if (station) return gap.playing && station?.id === stream?.id
        return gap.playing
    }

    /** 
     * Normalize the volume (0-100) to (0-1)
    */
    useEffect(() => {
        if (gap) gap.setVolume(volume / 100)
    }, [volume])

    /** 
     * Load the current stream when it changes
    */
    useEffect(() => {
        load()
    }, [stream?.urlResolved])
    
    /** 
     * Handle scheduled play events by polling the player
     * until it is ready to play
    */
    useEffect(() => {
        if (!schedulePlay) return
        const intervalId = setInterval(() => {
            if (scheduledPlay && !isPlaying()) {
                handleScheduledPlay()
            }
        }, 100)
        return () => clearInterval(intervalId)
    }, [schedulePlay])
    
    // If there is an error, skip to the next stream
    useEffect(() => {
        if (!gap.error) return
        toast.error(() => (
            <Text 
                noWrap={false} 
                color="tx-primary"
            >
                Sorry, the stream <b>{playlist?.getStream()?.name}</b> {' '}
                is not available right now.
            </Text>
        ))
        skipNext()
    }, [gap.error])

    const controls: PlayerControls = {
        play,
        isPlaying,
        pause,
        toggle,
        changeVolume,
        getVolume: () => volume,
        skipPrev,
        skipNext,
        isLoading: () => gap.isLoading,
    }

    return (
        <PlayerContext.Provider value={controls}>
            {children}
        </PlayerContext.Provider>
    )
}