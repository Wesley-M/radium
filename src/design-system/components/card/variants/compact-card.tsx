import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/card/variants/base-card"
import useMeasure from "react-use-measure"

export const CompactCard = (props: CardProps) => {
    const { 
        size = 80,
        padding = "xs"
    } = props

    const { spacing, avatar } = useTheme()
    const [cardRef, cardBounds] = useMeasure()
    
    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = size - 2 * paddingInPx

    const actionStyle = {
        position: "absolute",
        bottom: (cardBounds.height - actionSizeInPx) / 2,
        right: spacing("st-sm"),
        size: "sm"
    }

    const cardStyle: React.CSSProperties = {
        flexDirection: "row",
        padding: paddingInPx + "px",
        paddingRight: paddingInPx + 1.5 * actionSizeInPx + "px",
        alignItems: "center",
        gap: spacing("st-sm")
    }

    const contentStyle = {
        gap: spacing("st-xxs"),
        marginTop: 0,
    }

    return (
        <BaseCard
            {...props}
            cardRef={cardRef}
            style={{
                action: actionStyle,
                card: cardStyle,
                content: contentStyle
            }}
            imageProps={{
                ...props.imageProps, 
                width: imageWidth 
            }}
        />
    )
}