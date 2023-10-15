import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { BaseCard, CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useState } from "react";

export const ThumbnailCard = (props: CardProps) => {
    const { 
        borderRadius = "md",
        padding = "xs",
        actionProps,
        cardProps,
        contentProps,
        imageProps,
        onHoverChange,
        width = 60,
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
        borderRadius: radius(borderRadius),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: hover ? palette("sr-400") : "transparent",
        padding: paddingInPx + "px",
    }

    const contentStyle = {
        display: "none"
    }

    const imageStyle = {
        opacity: hover ? 0.6 : 1,
        transition: "opacity 200ms ease-in-out",
    }

    const handleHoverChange = (hover: boolean) => {
        setHover(hover)
        onHoverChange?.(hover)
    }

    if (width !== height) {
        console.warn("ThumbnailCard: width and height should be equal in most cases")
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
            onHoverChange={handleHoverChange}
        />
    )
}