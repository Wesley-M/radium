import { Marquee } from "@design-system/components/data-display/marquee"
import { Text, TextProps } from "@design-system/components/data-display/text"
import { useTheme } from "@design-system/theme"
import { Size } from "@design-system/theme/types"
import { Skeleton, Stack, SxProps } from "@mui/material"
import { ReactNode } from "react"

export interface TitleProps {
    children?: ReactNode
    subtitle?: string
    gap?: Size
    isAbove?: boolean
    titleProps?: TextProps
    subtitleProps?: TextProps
    sx?: SxProps
    enableMarquee?: boolean
    loading?: boolean
}

export const Title = (props: TitleProps) => {
    const { 
        children, 
        subtitle,
        gap="xxs",
        titleProps,
        subtitleProps,
        isAbove = false,
        sx,
        enableMarquee = false,
        loading = false
    } = props

    const { spacing } = useTheme()
    const hasMarqueeString = enableMarquee && typeof children === "string"
    
    const title = hasMarqueeString ? (
        <Marquee 
            text={children}
            textProps={{isBold: true, as: titleProps?.as || "h1", ...titleProps}}
        />
    ) : (
        <Text 
            as={titleProps?.as || "h1"} 
            {...titleProps}
            isBold
        >
            {children}
        </Text>
    )

    const sub = hasMarqueeString ? (
        <Marquee 
            text={subtitle}
            textProps={{as: subtitleProps?.as || "body1", ...subtitleProps}}
        />
    ) : (
        <Text 
            as={subtitleProps?.as || "body1"} 
            {...subtitleProps}
        >
            {subtitle}
        </Text>
    ) 

    if (loading) {
        return (
            <LoadingTitle 
                containerStyle={sx}
                gap={gap}
                isAbove={isAbove}
            />
        )
    }

    return (
        <Stack 
            direction="column" 
            gap={spacing(`st-${gap}`)} 
            sx={sx}
        >
            { isAbove && <>{sub}</>}
            { title }
            { !isAbove && <>{sub}</>}
        </Stack>
    )
}   

interface LoadingTitleProps {
    containerStyle?: SxProps,
    isAbove?: boolean
    gap?: Size
}

const LoadingTitle = (props: LoadingTitleProps) => {
    const { 
        isAbove = false, 
        gap = "xxs", 
        containerStyle 
    } = props
    
    const { palette, spacing } = useTheme()

    return (
        <Stack 
            direction="column" 
            gap={spacing(`st-${gap}`)} 
            sx={containerStyle}
        >
            { isAbove && <Skeleton variant="rounded" sx={{ width: "20%", background: palette("sr-500") }}/>}
            <Skeleton variant="rounded" sx={{ height: 30, background: palette("sr-500"), width: "50%" }} />
            { !isAbove && <Skeleton variant="rounded" sx={{ width: "20%", background: palette("sr-500") }}/>}
        </Stack>
    )
}