import { RefObject, useEffect, useRef, useState } from 'react'
import { Station } from '../types/radio-browser-api.types'
import { PlayerControls } from '../types/player.types'
import { useDebounce } from './useDebounce'

interface RadioPlayerReturn {
    station?: Station,
    audioRef: RefObject<HTMLAudioElement>,
    controls: PlayerControls
}

export const useRadioPlayer = (stations ?: Station[]) : RadioPlayerReturn => {
    /**
     * Selected station at the moment
    */
    const [selectedStation, setSelectedStation] = useState(0)

    /**
     * Stores the reference for the radio player
    */
    const audioRef = useRef<HTMLAudioElement>(null)
    
    /**
     * The current player's instance
    */
    const player = audioRef?.current

    /**
     * Current playing status
    */
    const [playing, setPlaying] = useState(false)

    /**
     * Player's volume
    */
    const [vol, setVol] = useState(60)

    const play = () => {
        setPlaying(true) 
        player?.play()
    }

    const pause = () => {
        setPlaying(false)
        player?.pause()
    }

    const toggle = () => {
        playing ? player?.pause() : player?.play()
        setPlaying(!playing)
    }

    const setVolume = (vol: number) => {
        if (vol >= 0 && vol <= 100) {
            setVol(vol)
        }
    }

    const delayedPlay = useDebounce(play, 250)

    const temporaryPause = () => {
        if (playing) {
            setPlaying(false)
            delayedPlay()
        } 
    }

    const skipPrevious = () => {
        setSelectedStation(Math.max(0, selectedStation - 1))
        temporaryPause()
    }

    const skipNext = () => {
        setSelectedStation(Math.min((stations?.length || 1) - 1, selectedStation + 1))
        temporaryPause()
    }

    const canSkipPrevious = () => {
        return (selectedStation - 1) >= 0
    }

    const canSkipNext = () => {
        return (selectedStation + 1) <= (stations?.length || 0) - 1
    }

    const isPlaying = () => playing

    const getVolume = () => vol

    /**
     * Normalize and set audio volume
    */
    useEffect(() => {
        if (player) player.volume = vol / 100
    }, [vol])
        
    return {
        station: stations?.[selectedStation],
        audioRef,
        controls: {
            setVolume,
            play,
            pause,
            toggle,
            skipNext,
            skipPrevious,
            canSkipNext,
            canSkipPrevious,
            isPlaying,
            getVolume
        }
    }
}