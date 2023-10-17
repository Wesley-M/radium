import { useTheme } from "@design-system/theme"
import { Size } from "@design-system/theme/types"
import { Box, CircularProgress, IconButton, SvgIconProps, SxProps } from "@mui/material"
import { ReactElement } from "react"
import merge from "lodash.merge"
import { ColorAlias } from "@design-system/theme/aliases"

export interface ActionButtonProps {
    /**  Color  */
    color?: ColorAlias,
    /** Enable scale effect */
    hoverEffect?: "opacity" | "scale" | "both",
    /** Icon  */
    icon?: ReactElement<SvgIconProps>
    /** Loading state  */ 
    loading?: boolean,
    /** Click handler  */
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    /** Icon size  */
    size?: Size,
    /** Style overrides  */
    sx?: SxProps,
    /** Disable button  */
    disabled?: boolean
}

export const ActionButton = (props: ActionButtonProps) => {
    const { 
        color = "bt-primary",
        disabled = false,
        hoverEffect = "both",
        icon, 
        loading = false,
        onClick, 
        size = "sm", 
        sx = {}, 
    } = props
    
    const { avatar, palette } = useTheme()
    const hasOpacityEffect = hoverEffect === "opacity" || hoverEffect === "both"
    const hasScaleEffect = hoverEffect === "scale" || hoverEffect === "both"

    const btnStyle = merge({
        padding: 0,
        opacity: disabled ? 0.5 : 1,
        "& .MuiSvgIcon-root": {
            fontSize: avatar(size),
            color: palette(color),
            opacity: hasOpacityEffect ? 0.95 : 1,
            transition: "transform 200ms ease-in-out, opacity 200ms ease-in-out"
        },
        "&:hover .MuiSvgIcon-root": {
            transform: hasScaleEffect ? "scale(1.1)" : "none",
            opacity: 1
        }
    }, sx)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onClick?.(event)
    }

    return (
        <Box sx={{ position: loading ? "relative" : "static" }}>
            <IconButton 
                disabled={disabled} 
                sx={btnStyle} 
                onClick={handleClick}
            >
                {icon}
            </IconButton>
            {loading && (
                <CircularProgress
                    size={avatar(size)}
                    sx={{
                        color: palette(color),
                        opacity: 0.9,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
            )}
        </Box>
    )
}