import { useTheme } from "@design-system/theme"
import useMeasure from "react-use-measure"
import { CssSize } from "@design-system/utils"
import { useState } from "react"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import { SxProps } from "@mui/material"

export const DefaultCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        padding = "sm",
        size,
        actionProps,
        cardProps,
        contentProps,
        imageProps
    } = props

    const { palette, radius, spacing } = useTheme()
    const [cardRef, cardBounds] = useMeasure()
    const [imageHeight, setImageHeight] = useState(0)

    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = (size || cardBounds.width) - 2 * paddingInPx

    const actionStyle = {
        bottom: cardBounds.height - imageHeight - (paddingInPx / 2),
        right: 1.5 * paddingInPx
    }

    const cardStyle: SxProps = {
        flexDirection: "column",
        position: "relative",
        height: "100%",
        maxHeight: "100%",
        borderRadius: radius(borderRadius),
        backgroundColor: palette("sr-300"),
        "&:hover": {
            backgroundColor: palette("sr-400")
        }
    }
        
    const contentStyle = {
        marginTop: spacing("st-sm"),
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
                onHeightChange: setImageHeight,
                width: imageWidth 
            }}
            cardRef={cardRef}
        />
    )
}