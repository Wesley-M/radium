import { ReactNode, createContext, useEffect, useState } from "react";
import { Station } from "../types/radio-browser-api.types";
import { PlayerControls, PlayerMode } from "../types/player.types";
import { useIsMobile } from "../design-system/hooks/use-is-mobile";
import { useGlobalAudioPlayer } from 'react-use-audio-player';

export interface PlayerContextProps {
    isPreview: boolean
    isFull: boolean
    station: Station | null
    controls: PlayerControls
}

export const PlayerContext = createContext<PlayerContextProps | null>(null)


interface PlayerProviderProps {
    children: ReactNode,
    playlist: Station[]
}

export const PlayerProvider = (props: PlayerProviderProps) => {
    const { children, playlist } = props

    const { load, ...player } = useGlobalAudioPlayer();
    const isMobile = useIsMobile()

    const [stationIdx, setStationIdx] = useState(0)
    const [volume, setVolume] = useState(60)
    const [autoplay, setAutoplay] = useState(false)
    const [mode, setMode] = useState<PlayerMode>(isMobile ? "preview" : "full")

    // Whether the playlist is empty
    const isEmptyPlaylist = () => playlist.length === 0

    // Current station
    const getStation = () => {
        return isEmptyPlaylist() ? null : playlist[stationIdx]
    }
 
    // Load station to stream
    const loadStation = () => {
        if (!getStation()?.urlResolved) return
        load(getStation()?.urlResolved || "", {
            autoplay,
            html5: true,
            initialVolume: volume / 100,
            format: getStation()?.codec.toLowerCase()
        })
    }

    // Play
    const play = () => {
        if (isEmptyPlaylist()) return
        player.play()
    }

    // Pause
    const pause = () => {
        if (isEmptyPlaylist()) return
        player.pause()
    }

    // Toggle between pause and playing status
    const toggle = () => {
        if (isEmptyPlaylist()) return
        player.playing ? pause() : play()
    }

    // Toggle player mode
    const toggleMode = () => {
        setMode(mode === "full" ? "preview" : "full")
    }

    // Change the volume
    const changeVolume = (vol: number) => {
        if (vol >= 0 && vol <= 100) {
            setVolume(vol)
        }
    }

    // Skip to previous station in the playlist
    const skipPrevious = () => {
        setAutoplay(true)
        setStationIdx(Math.max(0, stationIdx - 1))
    }

    // Skip to next station in the playlist
    const skipNext = () => {
        setAutoplay(true)
        setStationIdx(Math.min(playlist.length - 1, stationIdx + 1))
    }

    // Whether we can skip to previous station
    const canSkipPrevious = () => {
        if (player.isLoading) return false
        return (stationIdx - 1) >= 0
    }

    // Whether we can kip to next station
    const canSkipNext = () => {
        if (player.isLoading) return false
        return (stationIdx + 1) <= (playlist.length || 0) - 1
    }

    // Normalize the player volume 
    useEffect(() => {
        if (player) player.setVolume(volume / 100)
    }, [volume])

    // Load radio station
    useEffect(() => {
        loadStation()
    }, [getStation()?.urlResolved])
    
    const controls: PlayerControls = {
        play,
        isPlaying: () => player.playing,
        pause,
        toggle,
        toggleMode,
        changeVolume,
        getVolume: () => volume,
        skipPrevious,
        canSkipPrevious,
        skipNext,
        canSkipNext,
        isLoading: () => player.isLoading,
    }

    return (
        <PlayerContext.Provider 
            value={{ 
                isFull: mode === "full", 
                isPreview: mode === "preview",
                station: getStation(), 
                controls, 
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}