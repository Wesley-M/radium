import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import useMeasure from "react-use-measure"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useState } from "react";

export const ThumbnailCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        size = 60,
        padding = "xs",
        actionProps,
        cardProps,
        contentProps,
        imageProps,
        onHoverChange
    } = props

    const { avatar, spacing, palette, radius } = useTheme()   

    const [cardRef, cardBounds] = useMeasure()
    const [hover, setHover] = useState(false)

    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = size - 2 * paddingInPx
    
    const actionStyle = {
        bottom: (cardBounds.height - actionSizeInPx) / 2,
        right: cardBounds.width - imageWidth / 2 - paddingInPx - actionSizeInPx / 2,
    }

    const cardStyle: React.CSSProperties = {
        borderRadius: radius(borderRadius),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: hover ? palette("sr-400") : "transparent",
        padding: paddingInPx + "px",
        width: "fit-content"
    }

    const contentStyle = {
        display: "none"
    }

    const imageStyle = {
        opacity: hover ? 0.8 : 1,
        transition: "opacity 100ms ease-in-out",
    }

    const handleHoverChange = (hover: boolean) => {
        setHover(hover)
        onHoverChange?.(hover)
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
            contentProps={{
                ...contentProps,
                sx: { ...contentStyle, ...contentProps?.sx }
            }}
            imageProps={{
                ...imageProps, 
                width: imageWidth,
                sx: { ...imageStyle, ...imageProps?.sx }
            }}
            cardRef={cardRef}
            onHoverChange={handleHoverChange}
        />
    )
}