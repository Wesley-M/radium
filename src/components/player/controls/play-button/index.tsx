import { CircularProgress, IconButton, Stack } from "@mui/material"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import { usePlayer } from "../../../../hooks/usePlayer";

type PlayButtonProps = {
    onClick?: ((...args: any[]) => any),
    width?: number,
    height?: number,
    color?: string,
    isPlaying?: boolean
}

export const PlayButton = (props: PlayButtonProps) => {
    const { 
        onClick, 
        width = 60,
        height = 60,
        color = "#F1F1F1",
        isPlaying = false
    } = props
    
    const player = usePlayer()
    
    const getStyle = () => {
        return { 
            color: `${color}EE`, 
            width, 
            height,
            transition: "all 100ms ease-in",
            "&:hover": {
                color,
                transform: "scale(1.05)"
            } 
        }
    }

    const getIcon = () => {
        if (player?.controls.isLoading()) {
            return (
                <Stack sx={{ width, height, justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress size={45} sx={{ color: `${color}EE` }} />
                </Stack>
            )
        }
        
        if (isPlaying) {
            return <PauseCircleFilledRoundedIcon sx={getStyle()} /> 
        } else {
            return <PlayCircleFilledRoundedIcon sx={getStyle()} /> 
        }
    }

    return (
        <IconButton onClick={onClick}>
            {getIcon()}
        </IconButton>
    )
}