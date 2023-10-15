import { PlaylistContext } from '@design-system/components/player/context/playlist-context'
import { useContext } from 'react'

export const usePlaylist = () => {
    return useContext(PlaylistContext)
}