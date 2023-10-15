import { PlayerContext } from '@design-system/components/player/context/player-context'
import { useContext } from 'react'

export const usePlayer = () => {
    return useContext(PlayerContext)
}