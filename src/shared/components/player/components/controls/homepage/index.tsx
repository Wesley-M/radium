import { ActionButton } from '@design-system/components/inputs/action-button';
import { usePlaylist } from '@hooks/use-playlist';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

export const Homepage = () => {
    const playlist = usePlaylist()
    const stream = playlist?.getStream()

    if (!stream?.homepage) return
    
    return (
        <ActionButton
            icon={<LanguageRoundedIcon/>}
            onClick={() => window.open(stream?.homepage, "_blank")}
            size="xxs"
        />
    )
}