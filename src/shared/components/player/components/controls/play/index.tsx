import { ActionButton } from "@design-system/components/inputs/action-button"
import { usePlayer } from "@hooks/use-player"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { Size } from "@design-system/theme/types";

interface PlayProps {
    size?: Size,
    variant?: "filled" | "minimal"
}

export const Play = (props: PlayProps) => {
    const { size = "md", variant = "filled" } = props
    const player = usePlayer()
    
    const PlayIcon = variant === "filled" ? PlayCircleFilledRoundedIcon : PlayArrowRoundedIcon
    const PauseIcon = variant === "filled" ? PauseCircleFilledRoundedIcon : PauseRoundedIcon
    
    return (
        <ActionButton
            icon={player?.isPlaying() ? <PauseIcon/> : <PlayIcon/>}
            size={size}
            onClick={() => player?.toggle()}
            loading={player?.isLoading()}
        />
    )
}