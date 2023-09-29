import { PlaylistContext } from '@context/playlist-context'
import { useContext } from 'react'

export const usePlaylist = () => {
    return useContext(PlaylistContext)
}