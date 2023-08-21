import { IconButton } from "@mui/material"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';

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

    return (
        <IconButton onClick={onClick}>
            { isPlaying ? ( 
                <PauseCircleFilledRoundedIcon sx={getStyle()} /> 
            ) : ( 
                <PlayCircleFilledRoundedIcon sx={getStyle()} /> 
            )}
        </IconButton>
    )
}