import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import useMeasure from "react-use-measure"
import { useState } from "react"

export const CompactCard = (props: CardProps) => {
    const { 
        actionProps,
        cardProps,
        borderRadius = "md",
        size = 80,
        padding = "xs"
    } = props

    const { palette, spacing, avatar, radius } = useTheme()
    const [cardRef, cardBounds] = useMeasure()
    const [hover, setHover] = useState(false)

    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = size - 2 * paddingInPx

    const actionStyle = {
        bottom: (cardBounds.height - actionSizeInPx) / 2,
        right: spacing("st-sm"),
    }

    const cardStyle: React.CSSProperties = {
        backgroundColor: palette(hover ? "sr-400" : "sr-300"),
        borderRadius: radius(borderRadius),
        flexDirection: "row",
        paddingRight: paddingInPx + 1.5 * actionSizeInPx + "px",
        alignItems: "center",
        gap: spacing("st-sm")
    }

    return (
        <BaseCard
            {...props}
            actionProps={{
                ...props.actionProps,
                sx: { ...actionStyle, ...actionProps?.sx}
            }}
            cardProps={{
                ...props.cardProps,
                sx: { ...cardStyle, ...cardProps?.sx }
            }}
            imageProps={{
                ...props.imageProps, 
                width: imageWidth
            }}
            cardRef={cardRef}
            onHoverChange={setHover}
        />
    )
}