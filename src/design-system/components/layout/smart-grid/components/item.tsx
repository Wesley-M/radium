import { hasEqualProps } from "@design-system/utils/has-equal-props"
import { Box, SxProps } from "@mui/material"
import { ReactNode, memo } from "react"

export interface SmartGridItemProps {
    children?: (width?: number, height?: number) => ReactNode,
    width?: number,
    height?: number,
    sx?: SxProps
}
  
export const SmartGridItem = memo((props: SmartGridItemProps) => {
    const { 
        children, 
        width, 
        height,
        sx 
    } = props

    return (
        <Box 
            width={width} 
            sx={{ 
                minWidth: width,
                height,
                ...sx
            }}
        >
            {children?.(width, height)}
        </Box>
    )
}, hasEqualProps)