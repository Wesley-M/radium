import { Box, Stack, SvgIconProps } from "@mui/material"
import { Image } from "@design-system/components/image"
import { Text } from "@design-system/components/text"
import { Size } from "@design-system/theme/types"
import { useTheme } from "@design-system/theme"
import { ColorAlias, CssSize } from "@design-system/utils"
import { ReactElement, useEffect, useState } from "react"
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import { ActionButton } from "@design-system/components/action-button"

export interface CardProps {
    /**  Radius of card outer borders (xxs, xs, sm, md, lg, xl, xxl) */
    borderRadius?: Size,
    /**  Width in case of a default variant, and height in case of the compact variant */
    size?: number
    /**  Padding around the card */
    padding?: Size,
    /**  Title  */
    title?: string,
    /**  Subtitle  */
    subtitle?: string,
    /**  Image properties  */
    imageProps?: {
        src?: string,
        hasRinglight?: boolean,
        borderRadius?: Size,
    }
    /**  Action properties  */
    actionProps?: {
        icon?: ReactElement<SvgIconProps>,
        onClick?: () => void,
        size?: Size,
        color?: ColorAlias
    }
}

type BaseCardProps = CardProps & {
    /**  Reference for the card container  */
    cardRef?: (element: HTMLElement | SVGElement | null) => void,
    /**  Hover state change handler  */
    onHoverChange?: (hover: boolean) => void,
    /**  Image properties  */
    imageProps?: {
        src?: string,
        hasRinglight?: boolean,
        width: number,
        onImageHeightChange?: (height: number) => void,
    }
    /** Style overrides */
    style: {
        action?: any,
        card?: any,
        content?: any,
        image?: any,
    },
}

export const BaseCard = (props: BaseCardProps) => {
    const { palette, radius, spacing } = useTheme()

    const { 
        actionProps,
        borderRadius = "md",
        cardRef,
        imageProps,
        onHoverChange = () => {},
        padding = "sm",
        size,
        style,
        subtitle,
        title
    } = props

    const [hover, setHover] = useState(false)
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)

    const baseActionStyle = style.action

    const baseCardStyle = {
        flexDirection: "column",
        position: "relative",
        width: size || "100%",
        height: "100%",
        borderRadius: radius(borderRadius),
        backgroundColor: palette(hover ? "sr-400" : "sr-300"),
        padding: paddingInPx + "px",
        transition: "background-color 200ms ease-in-out",
        gap: spacing("st-xxs"),
        ...style.card
    }

    const baseContentStyle = {
        overflow: "hidden",
        ...style.content
    }

    const baseImageStyle = style.image

    // Update hover state (callback)
    useEffect(() => {
        onHoverChange(hover)
    }, [hover])
    
    return (
        <Stack
            ref={cardRef}
            sx={baseCardStyle}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <Box width={imageProps?.width} sx={baseImageStyle}>
                <Image 
                    src={imageProps?.src} 
                    width={imageProps?.width} 
                    onHeightChange={(h: number) => imageProps?.onImageHeightChange?.(h)}
                    hasRinglight={imageProps?.hasRinglight}
                    borderRadius={imageProps?.borderRadius}
                />
            </Box>

            <Stack sx={baseContentStyle}>
                <Text as="h5">
                    {title}
                </Text>
                <Text as="body2" sx={{ fontWeight: "bold" }} isUppercase>
                    {subtitle}
                </Text>
            </Stack>

            {hover && (
                <ActionButton
                    icon={actionProps?.icon || <PlayCircleFilledWhiteRoundedIcon/>}
                    onClick={actionProps?.onClick}
                    size={actionProps?.size}
                    color={actionProps?.color}
                    sx={baseActionStyle}
                />
            )}
        </Stack>
    )
}