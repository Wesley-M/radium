import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useState } from "react";

export const MinimalCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        padding = "xs",
        actionProps,
        cardProps,
        imageProps,
        onHoverChange,
        width = 260,
        height = 60
    } = props

    const { avatar, spacing, palette, radius } = useTheme()   
    const [hover, setHover] = useState(false)

    const actionSizeInPx = CssSize.build(avatar("sm")).toPx() || 0
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)
    const imageWidth = height - 2 * paddingInPx

    const actionStyle = {
        bottom: (height - actionSizeInPx) / 2,
        right: width - imageWidth / 2 - paddingInPx - actionSizeInPx / 2,
        "& .MuiSvgIcon-root": {
            color: palette("accent"),
            backgroundColor: "transparent"
        },
    }

    const cardStyle: React.CSSProperties = {
        width,
        height,
        alignItems: "center",
        borderRadius: radius(borderRadius),
        backgroundColor: hover ? palette("sr-400") : "transparent",
        flexDirection: "row",
        gap: spacing("st-sm"),
        transition: "background-color 100ms ease-in-out",
        padding: paddingInPx + "px",
        paddingRight: spacing("st-sm")
    }

    const imageStyle = {
        opacity: hover ? 0.6 : 1,
        transition: "opacity 100ms ease-in-out"
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
            imageProps={{ 
                ...imageProps,
                width: imageWidth,
                sx: { ...imageStyle, ...imageProps?.sx }
            }}
            onHoverChange={handleHoverChange}
        />
    )
}