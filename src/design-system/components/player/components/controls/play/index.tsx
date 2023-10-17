import { ActionButton } from "@design-system/components/inputs/action-button"
import { usePlayer } from "@design-system/components/player/hooks/use-player"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { Size } from "@design-system/theme/types";
import { usePlaylist } from "@design-system/components/player/hooks/use-playlist";
import { ColorAlias } from "@design-system/theme/aliases";

interface PlayProps {
    size?: Size
    variant?: "filled" | "minimal"
    color?: ColorAlias
}

export const Play = (props: PlayProps) => {
    const { 
        size = "md", 
        variant = "filled", 
        color = "tx-primary" 
    } = props
    
    const player = usePlayer()
    const playlist = usePlaylist()

    const PlayIcon = variant === "filled" ? PlayCircleFilledRoundedIcon : PlayArrowRoundedIcon
    const PauseIcon = variant === "filled" ? PauseCircleFilledRoundedIcon : PauseRoundedIcon
    
    return (
        <ActionButton
            icon={player?.isPlaying() ? <PauseIcon/> : <PlayIcon/>}
            size={size}
            onClick={() => player?.toggle(playlist?.getStream())}
            loading={player?.isLoading()}
            disabled={playlist?.isEmpty()}
            color={color}
        />
    )
}