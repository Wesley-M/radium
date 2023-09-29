import { ActionButton } from "@design-system/components/inputs/action-button"
import { Size } from "@design-system/theme/types"
import { usePlayer } from "@hooks/use-player"
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { usePlaylist } from "@hooks/use-playlist";

interface SkipProps {
    direction: "forward" | "backward",
    size?: Size
}

export const Skip = (props: SkipProps) => {
    const { direction = "forward", size = "sm" } = props
    
    const player = usePlayer()
    const playlist = usePlaylist()

    const isForward = direction === "forward"
    const Icon = isForward ? SkipNextRoundedIcon : SkipPreviousRoundedIcon
    const handleClick = isForward ? player?.skipNext : player?.skipPrev
    const isDisabled = isForward ? !playlist?.hasNext() : !playlist?.hasPrev()

    return (
        <ActionButton
            icon={<Icon/>}
            size={size}
            hoverEffect="opacity"
            onClick={handleClick}
            disabled={isDisabled}
        />
    )
}