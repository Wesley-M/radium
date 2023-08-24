import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";
import { Station } from "../types/radio-browser-api.types";
import { PlayerControls, PlayerMode } from "../types/player.types";
import { useIsMobile } from "../hooks/useIsMobile";

export interface PlayerContextProps {
    isPreview: boolean
    isFull: boolean
    station: Station | null
    controls: PlayerControls
    audioRef: RefObject<HTMLAudioElement>
}

export const PlayerContext = createContext<PlayerContextProps | null>(null)


interface PlayerProviderProps {
    children: ReactNode,
    playlist: Station[]
}

export const PlayerProvider = (props: PlayerProviderProps) => {
    const { children, playlist } = props
    
    const audioRef = useRef<HTMLAudioElement>(null)
    const player = audioRef?.current

    const [stationIdx, setStationIdx] = useState(0)
    const [volume, setVolume] = useState(60)
    
    const [playing, setPlaying] = useState(false)
    const [ongoingPause, setOngoingPause] = useState(false)
    const [ongoingSkip, setOngoingSkip] = useState(0)
    const [audioLoad, setAudioLoad] = useState(true)

    const isMobile = useIsMobile()
    const [mode, setMode] = useState<PlayerMode>(isMobile ? "preview" : "full")
    
    // Current station
    const getStation = () => {
        return isEmptyPlaylist() ? null : playlist[stationIdx]
    }

    // Play
    const play = () => {
        if (isEmptyPlaylist()) return
        player?.play()
        setOngoingPause(false)
        setPlaying(true)
    }

    // Pause
    const pause = () => {
        if (isEmptyPlaylist()) return
        player?.pause()
        setOngoingPause(true)
        setPlaying(false)
    }

    // Toggle between pause and playing status
    const toggle = () => {
        if (isEmptyPlaylist()) return
        playing ? pause() : play()
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
        setOngoingSkip(ongoingSkip - 1)
        pause()
    }

    // Skip to next station in the playlist
    const skipNext = () => {
        setOngoingSkip(ongoingSkip + 1)
        pause()
    }

    // Whether we can skip to previous station
    const canSkipPrevious = () => {
        if (audioLoad) return false
        return (stationIdx - 1) >= 0
    }

    // Whether we can kip to next station
    const canSkipNext = () => {
        if (audioLoad) return false
        return (stationIdx + 1) <= (playlist.length || 0) - 1
    }

    // Whether the playlist is empty
    const isEmptyPlaylist = () => playlist.length === 0
    
    /**
     * Finished loading the audio
     * 1. If it`s currently playing, then continue playing
     * 2. It there is a ongoing pause, it means we need to play as soon as 
     *    possible after a new audio is loaded
     * */
    const onAudioLoad = () => {
        if (playing || ongoingPause) play()
        setAudioLoad(false)
    } 

    // Finished play processing
    const onPlay = () => {
        setOngoingPause(false)
    } 

    // Finished pause processing
    const onPause = () => {
        setOngoingPause(false)
    } 

    // Next station based on skip
    const getNextStation = (skip: number) => {
        if (skip > 0) {
            return Math.min(playlist.length - 1, stationIdx + 1)
        } else if (skip < 0) {
            return Math.max(0, stationIdx - 1)
        }
        return -1
    }

    // Apparently this helps with hardware deallocation
    const resetAudioSrc = () => {
        if (player) {
            player.src = ""
            player.src = getStation()?.urlResolved!
        }
    }

    // Reset ongoing pause
    const resetAudio = () => {
        console.log("reset-audio")
        setOngoingPause(false)
        setAudioLoad(true)
    }

    // Normalize the player volume 
    useEffect(() => {
        if (player) player.volume = volume / 100
    }, [volume])

    // When the station changes, the audio loading begins
    useEffect(() => {
        console.log("useffect - change station")
        setAudioLoad(true)
        resetAudioSrc()
    }, [stationIdx])

    // If ongoing pause is finished or we are not playing, then you can skip
    useEffect(() => {
        let nextStation = getNextStation(ongoingSkip)
        
        const finishedOngoingPause = (!ongoingPause && nextStation !== -1)
        const notPlaying = (!playing && nextStation !== -1)
        
        if (finishedOngoingPause || notPlaying) {
            setStationIdx(nextStation)
            setOngoingSkip(0)
            play()
        }
    }, [ongoingPause])

    // TODO: Reset player when the playlist actually changes
    
    const controls: PlayerControls = {
        play,
        isPlaying: () => playing,
        pause,
        toggle,
        toggleMode,
        changeVolume,
        getVolume: () => volume,
        skipPrevious,
        canSkipPrevious,
        skipNext,
        canSkipNext,
        onAudioLoad,
        onPlay,
        onPause,
        isLoadingAudio: () => audioLoad,
        resetAudio,
    }

    return (
        <PlayerContext.Provider 
            value={{ 
                isFull: mode === "full", 
                isPreview: mode === "preview",
                station: getStation(), 
                controls, 
                audioRef 
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}