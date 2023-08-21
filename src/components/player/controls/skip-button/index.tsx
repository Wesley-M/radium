import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { IconButton } from '@mui/material';

type SkipButtonProps = {
    onClick?: ((...args: any[]) => any),
    disabled?: boolean,
    width?: number,
    height?: number,
    color?: string,
    isNext?: boolean
}

export const SkipButton = (props: SkipButtonProps) => {
    const { 
        onClick, 
        disabled = false,
        width = 40,
        height = 40,
        color = "#F1F1F1",
        isNext = false
    } = props

    const Icon = isNext ? SkipNextRoundedIcon : SkipPreviousRoundedIcon
    
    return (
        <IconButton 
            onClick={onClick} 
            sx={{ height: height + 10, width: width + 10 }}
            disabled={disabled}
        >
            <Icon 
                sx={{ 
                    color: disabled ? `${color}40` : `${color}AA`, 
                    width, 
                    height,
                    "&:hover": { color }
                }} 
            />
        </IconButton>
    )
}