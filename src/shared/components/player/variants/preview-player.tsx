import { Card } from "@design-system/components/surfaces/card"
import { useTheme } from "@design-system/theme"
import { Stack } from "@mui/material"
import { PropsWithChildren } from "react";
import { useDominantColor } from "@design-system/hooks/use-dominant-color";
import { Color } from "@design-system/utils";
import { Like, Play } from "@components/player/components/controls";
import { usePlaylist } from "@components/player/hooks/use-playlist";

interface PreviewPlayerProps {
    onOpenClick?: () => void,
    hidden?: boolean
}

export const PreviewPlayer = (props: PreviewPlayerProps) => {
    const { onOpenClick, hidden = false } = props
    const { spacing } = useTheme()
    const playlist = usePlaylist() 

    const { 
        setImageIsReady, 
        updateColor
    } = useDominantColor()

    const stream = playlist?.getStream()

    return (
        <PreviewContainer onClick={onOpenClick} hidden={hidden}>
            <Card 
                variant="minimal"
                title={stream?.name}
                subtitle={stream?.tags?.join(", ")}
                imageProps={{
                    src: stream?.favicon,
                    onLoad: () => setImageIsReady?.(true),
                    onSrcChange: updateColor,
                }}
                cardProps={{
                    sx: { flex: 1, width: "70%" }
                }}
                titleProps={{
                    color: "tx-white"
                }}
                subtitleProps={{
                    color: "tx-white"
                }}
                height={60}
                disableAction
                enableMarquee
            />

            <Stack
                alignItems="center"
                justifyContent="flex-end"
                direction="row"
                gap={spacing("in-sm")}
                sx={{ flex: 1 }}
            >
                <Like color="tx-white"/>
                <Play variant="minimal" size="xs" color="tx-white"/>
            </Stack>
        </PreviewContainer>
    )
}


interface PreviewContainerProps {
    onClick?: () => void
    hidden?: boolean    
}

const PreviewContainer = (props: PropsWithChildren<PreviewContainerProps>) => {
    const { children, onClick, hidden = false } = props
    const { palette, radius, spacing } = useTheme()
    const { dominantColor } = useDominantColor()
    
    const background = dominantColor && Color.build(dominantColor).logShade(-0.8) || palette("sr-500")
        
    return (
        <Stack
            sx={{
                width: `calc(100% - ${spacing("in-xs")} * 2)`,
                height: 70,
                backgroundColor: background,
                borderRadius: radius("md"),
                position: "fixed",
                zIndex: 1,
                bottom: 0,
                left: 0,
                margin: spacing("in-xs"),
                display: hidden ? "none" : "flex",
            }}
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            paddingLeft={spacing("in-xs")}
            paddingRight={spacing("in-md")}
            onClick={onClick}
        >
            {children}
        </Stack>
    )
}