import { ActionButton } from '@design-system/components/inputs/action-button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { usePlaylist } from '@hooks/use-playlist';
import { useLibrary } from '@api/index';

export const Like = () => {
    const library = useLibrary()
    const playlist = usePlaylist()
    const stream = playlist?.getStream()
    
    const getLikeIcon = () => {
        if (library.has(stream?.id || "")) return <FavoriteRoundedIcon/>
        return <FavoriteBorderRoundedIcon/>
    }
    
    return (
        <ActionButton
            icon={getLikeIcon()}
            onClick={() => library.toggle(stream)}
            size="xxs"
        />
    )
}