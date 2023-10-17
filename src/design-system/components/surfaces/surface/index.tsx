import { useTheme } from "@design-system/theme"
import { ColorAlias, SpacingAlias } from "@design-system/theme/aliases"
import { Size } from "@design-system/theme/types"
import { Box, SxProps } from "@mui/material"

interface SurfaceProps {
    children?: React.ReactNode
    padding?: Size,
    color?: ColorAlias,
    borderRadius?: Size,
    sx?: SxProps
}

export const Surface = (props: SurfaceProps) => {
    const { 
        children, 
        padding = "sm", 
        color = "sr-100", 
        borderRadius = "md",
        sx
    } = props
    
    const { palette, spacing, radius } = useTheme()

    return (
        <Box 
            sx={{ 
                padding: spacing(`st-${padding}` as SpacingAlias),
                backgroundColor: palette(color), 
                borderRadius: radius(borderRadius),
                ...sx
            }}
        >
            {children}
        </Box>
    )
}