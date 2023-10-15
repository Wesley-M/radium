import { useTheme } from "@design-system/theme"
import { ColorAlias } from "@design-system/utils"
import { SxProps, Typography } from "@mui/material"
import { ReactNode, RefObject } from "react"

export interface TextProps {
    children?: ReactNode
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2"
    sx?: SxProps
    color?: ColorAlias
    isUppercase?: boolean
    isBold?: boolean
    noWrap?: boolean
    isCentered?: boolean
    innerRef?: RefObject<HTMLParagraphElement>
}

export const Text = (props: TextProps) => {
    const { 
        children, 
        as = "body1",
        sx,
        color,
        isUppercase = false, 
        isBold = false,
        isCentered = false,
        innerRef,
        noWrap = true
    } = props

    const { text, palette } = useTheme()
    const style = text(as)
    
    return (
        <Typography 
            ref={innerRef}
            variant={as} 
            sx={{
                ...style, 
                color: color ? palette(color) : style.color,
                textTransform: isUppercase ? "uppercase" : "none", 
                fontWeight: isBold ? "bold" : "regular",
                textAlign: isCentered ? "center" : "left",
                ...sx
            }}
            noWrap={noWrap}
        >
            {children}
        </Typography>
    )
}   