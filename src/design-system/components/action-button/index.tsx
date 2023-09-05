import { useTheme } from "@design-system/theme"
import { Size } from "@design-system/theme/types"
import { ColorAlias } from "@design-system/utils"
import { IconButton, SvgIconProps, SxProps } from "@mui/material"
import { ReactElement } from "react"
import merge from "lodash.merge"

interface ActionButtonProps {
    /**  Color  */
    color?: ColorAlias,
    /**  Click handler  */
    onClick?: () => void,
    /**  Style overrides  */
    sx?: SxProps,
    /**  Icon size  */
    size?: Size,
    /**  Icon  */
    icon: ReactElement<SvgIconProps>
    /** Enable scale effect */
    hoverEffect?: "opacity" | "scale" | "both"
}

export const ActionButton = (props: ActionButtonProps) => {
    const { 
        color = "bt-primary",
        hoverEffect = "both",
        icon, 
        onClick, 
        size = "sm", 
        sx = {}, 
    } = props
    
    const { avatar, palette } = useTheme()
    
    const hasOpacityEffect = hoverEffect === "opacity" || hoverEffect === "both"
    const hasScaleEffect = hoverEffect === "scale" || hoverEffect === "both"

    return (
        <IconButton
            sx={merge({
                padding: 0,
                "& .MuiSvgIcon-root": {
                    fontSize: avatar(size),
                    color: palette(color),
                    opacity: hasOpacityEffect ? 0.9 : 1,
                    transition: "transform 200ms ease-in-out, opacity 200ms ease-in-out"
                },
                "&:hover .MuiSvgIcon-root": {
                    transform: hasScaleEffect ? "scale(1.1)" : "none",
                    opacity: 1
                }
            }, sx)}
            onClick={onClick}
        >
            {icon}
        </IconButton>
    )
}
