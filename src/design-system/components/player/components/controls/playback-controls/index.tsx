import { useTheme } from "@design-system/theme"
import { Stack, SxProps } from "@mui/material";
import { Size } from "@design-system/theme/types";
import { Skip } from "@design-system/components/player/components/controls/skip";
import { Play } from "@design-system/components/player/components/controls/play";
import { ColorAlias } from "@design-system/utils";

interface PlaybackControlsProps {
    skipSize?: Size
    playSize?: Size
    sx?: SxProps
    color?: ColorAlias
}

export const PlaybackControls = (props: PlaybackControlsProps) => {
    const { 
        sx, 
        skipSize = "sm", 
        playSize = "md",
        color = "tx-primary"
    } = props
    
    const { spacing } = useTheme()
    
    return (
        <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="center"
            sx={{ width: "100%", gap: spacing("in-md"), ...sx }}
        >
            <Skip direction="backward" size={skipSize} color={color}/>
            <Play size={playSize} color={color}/>
            <Skip direction="forward" size={skipSize} color={color}/>
        </Stack>
    )
}