import { Box, Skeleton, Stack, SxProps } from "@mui/material"
import { Image, ImageProps } from "@design-system/components/data-display/image"
import { Size } from "@design-system/theme/types"
import { useTheme } from "@design-system/theme"
import { CssSize } from "@design-system/utils"
import { useEffect, useState } from "react"
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import { ActionButton, ActionButtonProps } from "@design-system/components/inputs/action-button"
import { Title } from "@design-system/components/data-display/title"
import useMeasure from "react-use-measure"

export interface CardProps {
    /**  Radius of card outer borders (xxs, xs, sm, md, lg, xl, xxl) */
    borderRadius?: Size
    /**  Specifies the width of the card image (the aspect ratio is 1:1) */
    size?: number
    /**  Padding around the card */
    padding?: Size
    /**  Title  */
    title?: string
    /**  Subtitle  */
    subtitle?: string
    /**  Image properties  */
    imageProps?: ImageProps & {
        sx?: SxProps
    }
    /**  Action properties  */
    actionProps?: ActionButtonProps
    /** Card properties */
    cardProps?: {
        sx?: SxProps
    }
    /** Content properties */
    contentProps?: {
        sx?: SxProps
    }
    /** Disable action button */
    disableAction?: boolean
    /** Disable image */
    disableImage?: boolean
    /** Enable marquee effect for title */
    enableMarquee?: boolean
    /** Always show action button */
    enableAlwaysShowAction?: boolean
    /** Loading state */
    loading?: boolean
    /**  Hover state change handler  */
    onHoverChange?: (hover: boolean) => void
}

type BaseCardProps = CardProps & {
    /**  Reference for the card container  */
    cardRef?: (element: HTMLElement | SVGElement | null) => void
}

/** 
 * Base structure of the card component
*/
export const BaseCard = (props: BaseCardProps) => {    
    const { spacing } = useTheme()

    const { 
        actionProps,
        cardRef,
        cardProps,
        contentProps,
        disableAction = false,
        disableImage = false,
        enableAlwaysShowAction = false,
        enableMarquee = false,
        imageProps,
        onHoverChange = () => {},
        padding = "sm",
        subtitle,
        title,
        loading = false
    } = props

    const { palette } = useTheme()
    const [hover, setHover] = useState(false)
    const [titleRef, titleBounds] = useMeasure()
    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)

    const isEmpty = () => title && titleBounds.width === 0
    const isActionVisible = () => ((hover && !disableAction) || enableAlwaysShowAction)

    const baseActionStyle: SxProps = {
        position: "absolute",
        size: "sm",
        "& .MuiSvgIcon-root": {
            color: palette("accent"),
            background: `radial-gradient(closest-side, ${palette("sr-100")}, transparent)`,  
        },
        ...actionProps?.sx
    }

    const baseCardStyle: SxProps = {
        padding: paddingInPx + "px",
        position: "relative",
        transition: "background-color 200ms ease-in-out",
        width: "100%",
        height: "fit-content",
        visibility: isEmpty() ? "hidden" : "inherit",
        ...cardProps?.sx,
        ...(disableAction && { 
            background: "transparent"
        }),
    }

    const baseImageStyle = {
        ...imageProps?.sx,
        display: disableImage ? "none" : "inherit"
    }

    const baseContentStyle: SxProps = {
        overflow: "hidden",
        gap: spacing("st-xxs"),
        ...contentProps?.sx
    }

    // Update hover state (callback)
    useEffect(() => {
        onHoverChange(hover)
    }, [hover])
        
    if (loading) {
        return (
            <LoadingCard 
                innerRef={cardRef}
                baseCardStyle={baseCardStyle} 
                baseImageStyle={baseImageStyle} 
                baseContentStyle={baseContentStyle}
                imageProps={imageProps}
            />
        )
    }

    return (
        <Stack
            ref={cardRef}
            sx={baseCardStyle}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <Box width={imageProps?.width} sx={baseImageStyle}>
                <Image 
                    {...imageProps}
                    useProxy
                />
            </Box>

            <Box sx={baseContentStyle} ref={titleRef}>
                <Title 
                    subtitle={subtitle} 
                    subtitleProps={{ 
                        as: "body2", 
                        color: "tx-primary", 
                        isUppercase: true, 
                        isBold: true,
                        sx: { opacity: 0.8 }
                    }}
                    titleProps={{ as: "h5" }}
                    enableMarquee={enableMarquee}
                >
                    {title}
                </Title>
            </Box>

            <Box 
                sx={{
                    visibility: isActionVisible() ? "inherit" : "hidden",
                    opacity: isActionVisible() ? 1 : 0,
                    transition: "opacity 200ms ease-in",
                }}
            >
                <ActionButton
                    icon={actionProps?.icon || <PlayCircleFilledWhiteRoundedIcon/>}
                    onClick={actionProps?.onClick}
                    size={actionProps?.size}
                    color={actionProps?.color}
                    sx={baseActionStyle}
                />
            </Box>
        </Stack>
    )
}

interface LoadingCardProps {
    baseCardStyle?: SxProps,
    baseImageStyle?: SxProps,
    baseContentStyle?: SxProps,
    imageProps?: ImageProps & {
        sx?: SxProps
    }
    innerRef?: (element: HTMLElement | SVGElement | null) => void,
}

const LoadingCard = (props: LoadingCardProps) => {
    const {
        baseCardStyle, 
        baseImageStyle, 
        baseContentStyle, 
        imageProps,
        innerRef
    } = props
    
    const { palette, spacing } = useTheme()

    return (
        <Stack sx={baseCardStyle} ref={innerRef}>
            <Box width={imageProps?.width} sx={baseImageStyle}>
                <Skeleton 
                    variant="rounded" 
                    sx={{ 
                        width: "100%", 
                        height: imageProps?.width, 
                        backgroundColor: palette("sr-500"),
                        ...imageProps?.sx 
                    }}
                />
            </Box>

            <Box sx={baseContentStyle}>
                <Stack 
                    justifyContent="center" 
                    gap={spacing("st-xxs")} 
                    sx={{ marginTop: "2px" }}
                >
                    <Skeleton 
                        variant="rounded" 
                        sx={{ backgroundColor: palette("sr-500"), height: 18, minWidth: 120 }}/>
                    <Skeleton 
                        sx={{ backgroundColor: palette("sr-500"), width: "80%" }}
                    />
                </Stack>
            </Box>
        </Stack>
    )
}