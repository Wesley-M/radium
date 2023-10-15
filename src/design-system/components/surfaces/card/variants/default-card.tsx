import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { useState } from "react"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import { SxProps } from "@mui/material"

export const DefaultCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        padding = "sm",
        width = 200,
        height = 250,
        actionProps,
        cardProps,
        contentProps,
        imageProps
    } = props
    
    const { palette, radius, spacing } = useTheme()
    const [imageHeight, setImageHeight] = useState(0)
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    
    const imageWidth = width - 2 * paddingInPx

    const actionStyle = {
        bottom: height - imageHeight - (paddingInPx / 2),
        right: 1.5 * paddingInPx
    }

    const cardStyle: SxProps = {
        width,
        height,
        flexDirection: "column",
        position: "relative",
        maxHeight: "100%",
        borderRadius: radius(borderRadius),
        backgroundColor: palette("sr-300"),
        "&:hover": {
            backgroundColor: palette("sr-400")
        }
    }

    const imageStyle: SxProps = {
        flex: 3,
        overflow: "hidden",
        borderRadius: radius(imageProps?.borderRadius || "md"),
    }
        
    const contentStyle = {
        marginTop: spacing("st-sm"),
        flex: 1,
    }

    return (
        <BaseCard
            {...props}
            actionProps={{
                ...actionProps,
                size: "md",
                sx: { ...actionStyle, ...actionProps?.sx}
            }}
            cardProps={{
                ...cardProps,
                sx: { ...cardStyle, ...cardProps?.sx }
            }}
            contentProps={{
                ...contentProps,
                sx: { ...contentStyle, ...contentProps?.sx }
            }}
            imageProps={{ 
                ...imageProps,
                sx: { ...imageStyle, ...contentProps?.sx },
                width: imageWidth,
            }}
            onImageContainerHeightChange={setImageHeight}
        />
    )
}