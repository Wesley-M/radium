import { useTheme } from "@design-system/theme"
import { Stack } from "@mui/material"
import { Image } from "@design-system/components/data-display/image"
import { Color, CssSize } from "@design-system/utils"
import { Volume } from "@components/player/components/controls/volume"
import { useDominantColor } from "@hooks/use-dominant-color"
import { Like, PlaybackControls } from "@components/player/components/controls"
import { Collapse } from "@components/player/components/controls"
import { Title } from "@design-system/components/data-display/title"
import { usePlaylist } from "@hooks/use-playlist"
import { useState } from "react"
import { useOnResize } from "@design-system/hooks/use-on-resize"

interface FullPlayerProps {
    onCloseClick?: () => void,
}

export const FullPlayer = (props: FullPlayerProps) => {
    const { onCloseClick } = props
 
    const playlist = usePlaylist() 
    const { palette, spacing } = useTheme()

    const { 
        dominantColor, 
        setImageIsReady, 
        updateColor
    } = useDominantColor()

    const spacingMdInPx = CssSize.build(spacing("in-md")).toPx() || 0
    const gradientStart = dominantColor && Color.build(dominantColor).logShade(-0.7) || palette("sr-500")
    const gradientEnd = dominantColor && Color.build(dominantColor).logShade(-0.95) || palette("sr-100")
    
    const getImageWidth = () => window.innerWidth - spacingMdInPx * 2
    const [imageWidth, setImageWidth] = useState(getImageWidth())
    
    useOnResize(() => setImageWidth(getImageWidth()))

    const stream = playlist?.getStream()

    return (
        <Stack
            justifyContent="space-between"
            gap={spacing("st-md")}
            sx={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                padding: spacing("st-md"),
                overflow: "auto",
            }}
        >
            <Stack
                direction="row"
                sx={{ width: "100%" }}
            >
                <Collapse onClick={onCloseClick}/>
            </Stack>

            <Image 
                src={stream?.favicon}
                width={imageWidth} 
                borderRadius="sm"
                onSrcChange={updateColor}
                onLoad={() => setImageIsReady?.(true)}
                useProxy
            />

            <Stack gap={spacing("st-md")}>
                <Stack 
                    direction="row" 
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Title 
                        sx={{
                            width: "80%"
                        }}
                        gap="xs"
                        subtitle={stream?.tags?.join(", ")} 
                        subtitleProps={{ 
                            as: "body2", 
                            color: "tx-primary",
                            isUppercase: true, 
                            isBold: true,
                            sx: { opacity: 0.8 }
                        }}
                        titleProps={{ as: "h3" }}
                        enableMarquee
                    >
                        {stream?.name}
                    </Title>

                    <Like/>
                </Stack>

                <PlaybackControls 
                    sx={{ justifyContent: "space-between" }}
                    playSize="xl"
                />
                
                <Volume/>
            </Stack>
        </Stack>
    )
}