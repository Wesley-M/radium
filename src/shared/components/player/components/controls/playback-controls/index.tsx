import { useTheme } from "@design-system/theme"
import { Stack, SxProps } from "@mui/material";
import { Size } from "@design-system/theme/types";
import { Skip } from "@components/player/components/controls/skip";
import { Play } from "@components/player/components/controls/play";

interface PlaybackControlsProps {
    skipSize?: Size,
    playSize?: Size,
    sx?: SxProps
}

export const PlaybackControls = (props: PlaybackControlsProps) => {
    const { 
        sx, 
        skipSize = "sm", 
        playSize = "md" 
    } = props
    
    const { spacing } = useTheme()
    
    return (
        <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="center"
            sx={{ width: "100%", gap: spacing("in-md"), ...sx }}
        >
            <Skip direction="backward" size={skipSize}/>
            <Play size={playSize}/>
            <Skip direction="forward" size={skipSize}/>
        </Stack>
    )
}