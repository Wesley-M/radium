import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import useMeasure from "react-use-measure"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useState } from "react";

export const MinimalCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        size = 60,
        padding = "xs",
        actionProps,
        cardProps,
        imageProps
    } = props

    const { avatar, spacing, palette, radius } = useTheme()   
    const [cardRef, cardBounds] = useMeasure()
    const [hover, setHover] = useState(false)

    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = size - 2 * paddingInPx

    const actionStyle = {
        bottom: (cardBounds.height - actionSizeInPx) / 2,
        right: cardBounds.width - imageWidth / 2 - paddingInPx - actionSizeInPx / 2
    }

    const cardStyle: React.CSSProperties = {
        alignItems: "center",
        borderRadius: radius(borderRadius),
        backgroundColor: hover ? palette("sr-400") : "transparent",
        flexDirection: "row",
        gap: spacing("st-sm"),
        transition: "background-color 100ms ease-in-out",
        padding: paddingInPx + "px",
        paddingRight: spacing("st-sm"),
        width: "100%"
    }

    const imageStyle = {
        opacity: hover ? 0.8 : 1,
        transition: "opacity 100ms ease-in-out"
    }

    return (
        <BaseCard
            {...props}
            actionProps={{
                ...actionProps,
                icon: <PlayArrowRoundedIcon/>,
                sx: { ...actionStyle, ...actionProps?.sx}
            }}
            cardProps={{
                ...cardProps,
                sx: { ...cardStyle, ...cardProps?.sx }
            }}
            imageProps={{ 
                ...imageProps,
                width: imageWidth,
                sx: { ...imageStyle, ...imageProps?.sx }
            }}
            cardRef={cardRef}
            onHoverChange={setHover}
        />
    )
}