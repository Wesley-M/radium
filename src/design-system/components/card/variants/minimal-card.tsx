import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/card/variants/base-card"
import useMeasure from "react-use-measure"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useState } from "react";

export const MinimalCard = (props: CardProps) => {
    const { 
        size = 60,
        padding = "xs"
    } = props

    const { avatar, spacing, palette } = useTheme()   
    const [cardRef, cardBounds] = useMeasure()
    const [hover, setHover] = useState(false)

    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = size

    const actionStyle = {
        position: "absolute",
        bottom: (cardBounds.height - actionSizeInPx) / 2,
        right: cardBounds.width - imageWidth / 2 - paddingInPx - actionSizeInPx / 2,
        size: "sm"
    }

    const cardStyle: React.CSSProperties = {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing("st-sm"),
        backgroundColor: hover ? palette("sr-400") : "transparent",
        transition: "background-color 100ms ease-in-out",
        padding: paddingInPx + "px",
        paddingRight: spacing("st-sm"),
    }

    const contentStyle = {
        gap: spacing("st-xs"),
        marginTop: 0,
    }

    const imageStyle = {
        opacity: hover ? 0.8 : 1,
        transition: "opacity 100ms ease-in-out",
    }

    return (
        <BaseCard
            {...props}
            actionProps={{
                ...props.actionProps,
                icon: <PlayArrowRoundedIcon/>
            }}
            style={{
                action: actionStyle,
                card: cardStyle,
                content: contentStyle,
                image: imageStyle
            }}
            imageProps={{ 
                ...props.imageProps,
                width: imageWidth,
            }}
            cardRef={cardRef}
            onHoverChange={setHover}
        />
    )
}