import { ActionButton } from '@design-system/components/inputs/action-button';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { usePlaylist } from '@components/player/hooks/use-playlist';
import { useLibrary } from '@api/index';
import { ColorAlias } from '@design-system/theme/aliases';

interface LikeProps {
    color?: ColorAlias
}

export const Like = (props: LikeProps) => {
    const { color = "tx-primary" } = props

    const library = useLibrary()
    const playlist = usePlaylist()
    const stream = playlist?.getStream()

    const getLikeIcon = () => {
        if (library.has(stream?.id || "")) return <FavoriteRoundedIcon/>
        return <FavoriteBorderRoundedIcon/>
    }

    if (!stream) return
    
    return (
        <ActionButton
            color={color}
            icon={getLikeIcon()}
            onClick={() => library.toggle(stream)}
            size="xxs"
        />
    )
}