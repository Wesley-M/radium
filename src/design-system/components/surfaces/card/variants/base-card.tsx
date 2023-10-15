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
import { TextProps } from "@design-system/components/data-display/text"

export interface CardProps {
    /**  Radius of card outer borders (xxs, xs, sm, md, lg, xl, xxl) */
    borderRadius?: Size
    /**  Width of the card */
    width?: number
    /**  Height of the card */
    height?: number
    /**  Padding around the card */
    padding?: Size
    /**  Title  */
    title?: string
    /**  Title properties  */
    titleProps?: TextProps
    /**  Subtitle  */
    subtitle?: string
    /**  Subtitle properties  */
    subtitleProps?: TextProps
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
    /** Hide card when empty */
    hideWhileEmpty?: boolean
    /**  Hover state change handler  */
    onHoverChange?: (hover: boolean) => void
    /**  Callback when image container height changes  */
    onImageContainerHeightChange?: (height: number) => void
}

/** 
 * Base structure of the card component
*/
export const BaseCard = (props: CardProps) => {    
    const { palette, spacing } = useTheme()

    const { 
        actionProps,
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
        subtitleProps,
        title,
        titleProps,
        loading = false,
        width = 100,
        height = 100,
        onImageContainerHeightChange,
        hideWhileEmpty = true
    } = props

    const [hover, setHover] = useState(false)
    const [titleRef, titleBounds] = useMeasure()
    const [imageContainerRef, imageContainerBounds] = useMeasure()

    const isEmpty = () => hideWhileEmpty && (title && titleBounds.width === 0 || width === 0)

    const isActionVisible = () => ((hover && !disableAction) || enableAlwaysShowAction)

    const paddingInPx = (CssSize.build(spacing(`in-${padding}`)).toPx() || 0)

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
        transition: "background-color 200ms ease-in-out;",
        width,
        height,
        opacity: isEmpty() ? 0 : 1,
        ...cardProps?.sx,
        ...(disableAction && { 
            background: "transparent"
        }),
    }

    const baseImageStyle = {
        ...imageProps?.sx,
        display: disableImage ? "none" : "inherit",
    }

    const baseContentStyle: SxProps = {
        overflow: "hidden",
        gap: spacing("st-xxs"),
        ...contentProps?.sx
    }

    const handleImageContainerHeightChange = () => {
        if (onImageContainerHeightChange) {
            onImageContainerHeightChange(imageContainerBounds.height)
        }
    }

    // Update image container height (callback)
    useEffect(() => {
        handleImageContainerHeightChange()
    }, [imageContainerBounds.height])

    // Update hover state (callback)
    useEffect(() => {
        onHoverChange(hover)
    }, [hover])
        
    if (loading) {
        return (
            <LoadingCard 
                baseCardStyle={baseCardStyle} 
                baseImageStyle={baseImageStyle} 
                baseContentStyle={baseContentStyle}
                imageProps={imageProps}
            />
        )
    }

    return (
        <Stack
            sx={baseCardStyle}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <Box 
                width={imageProps?.width} 
                sx={baseImageStyle} 
                ref={imageContainerRef}
            >
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
                        sx: { opacity: 0.8 },
                        ...subtitleProps
                    }}
                    titleProps={{ 
                        as: "h5", 
                        ...titleProps 
                    }}
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
}

const LoadingCard = (props: LoadingCardProps) => {
    const {
        baseCardStyle, 
        baseImageStyle, 
        baseContentStyle, 
        imageProps,
    } = props
        
    const { palette, spacing } = useTheme()
    
    return (
        <Stack sx={baseCardStyle}>
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