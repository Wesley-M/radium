import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { useState } from "react"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import { SxProps } from "@mui/material"
import useMeasure from "react-use-measure"

export const DefaultCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        padding = "sm",
        width = 200,
        height = "fit-content",
        actionProps,
        cardProps,
        contentProps,
        imageProps
    } = props
    
    const { palette, radius, spacing } = useTheme()
    const [imageHeight, setImageHeight] = useState(0)
    const [cardRef, cardBounds] = useMeasure()
    
    const isNumericHeight = typeof height === "number"
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    
    const imageWidth = width - 2 * paddingInPx
    const cardHeightInPx = isNumericHeight ? height : cardBounds.height

    const actionStyle = {
        bottom: cardHeightInPx - imageHeight - (paddingInPx / 2),
        right: 1.5 * paddingInPx
    }

    const cardStyle: SxProps = {
        width,
        height: "fit-content",
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
        minHeight: 45
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
                borderRadius: "md"
            }}
            onImageContainerHeightChange={setImageHeight}
            innerRef={cardRef}
        />
    )
}