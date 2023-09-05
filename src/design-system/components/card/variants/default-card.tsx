import { useTheme } from "@design-system/theme"
import useMeasure from "react-use-measure"
import { CssSize } from "@design-system/utils"
import { useState } from "react"
import { BaseCard, CardProps } from "@design-system/components/card/variants/base-card"

export const DefaultCard = (props: CardProps) => {
    const { 
        size,
        borderRadius = "md",
        padding = "sm"
    } = props

    const { radius, spacing } = useTheme()
    const [cardRef, cardBounds] = useMeasure()
    const [imageHeight, setImageHeight] = useState(0)

    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = cardBounds.width - 2 * paddingInPx

    const actionStyle = {
        position: "absolute",
        bottom: cardBounds.height - imageHeight - (paddingInPx / 2),
        right: 1.5 * paddingInPx
    }

    const cardStyle: React.CSSProperties = {
        flexDirection: "column",
        position: "relative",
        width: size || "100%",
        height: "100%",
        borderRadius: radius(borderRadius),
        padding: paddingInPx + "px",
        transition: "background-color 200ms ease-in-out",
        gap: spacing("st-xxs"),
    }
        
    const contentStyle = {
        gap: spacing("st-xxs"),
        marginTop: spacing("st-xs"),
    }

    return (
        <BaseCard
            {...props}
            style={{
                action: actionStyle,
                card: cardStyle,
                content: contentStyle
            }}
            cardRef={cardRef}
            imageProps={{ 
                ...props.imageProps,
                onImageHeightChange: setImageHeight,
                width: imageWidth 
            }}
            actionProps={{
                ...props.actionProps,
                size: "md"
            }}
        />
    )
}