import { PlayerContext } from '@context/player-context'
import { useContext } from 'react'

export const usePlayer = () => {
    return useContext(PlayerContext)
}