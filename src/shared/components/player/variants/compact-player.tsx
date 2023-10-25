import { Card } from "@design-system/components/surfaces/card"
import { useTheme } from "@design-system/theme"
import { Box, Stack } from "@mui/material"
import { Volume } from "@components/player/components/controls/volume";
import { useIsMobile } from "@design-system/hooks/use-is-mobile";
import { PropsWithChildren, useState } from "react";
import { Homepage, Like, PlaybackControls } from "@components/player/components/controls";
import { usePlaylist } from "@components/player/hooks/use-playlist";

export const CompactPlayer = () => {
    const playlist = usePlaylist() 
    const [hover, setHover] = useState(false)
    
    const { spacing } = useTheme()
    const isMobile = useIsMobile("md")

    const stream = playlist?.getStream()

    return (
        <CompactContainer>
            <Stack
                alignItems="center"
                justifyContent="flex-start"  
                sx={{ width: isMobile ? "40%" : "25%" }}
                direction="row"
                gap={spacing("in-sm")}
            >
                <Card 
                    variant="minimal"
                    title={stream?.name}
                    subtitle={stream?.tags?.join(", ")}
                    imageProps={{
                        src: stream?.favicon
                    }}
                    cardProps={{
                        sx: { width: "100%" }
                    }}
                    height={60}
                    disableAction
                    enableMarquee={hover}
                    onHoverChange={setHover}
                />
                <Like/>
                <Homepage/>
            </Stack>
            
            <PlaybackControls 
                sx={{ 
                    width: "30%", 
                    gap: isMobile ? spacing("in-sm") : spacing("in-md") 
                }}
            />
            
            {!isMobile && (
                <Stack 
                    direction="row" 
                    alignItems="center"
                    justifyContent="flex-end" 
                    sx={{ width: "25%" }}
                >
                    <Box sx={{ minWidth: 200 }}>
                        <Volume />
                    </Box>
                </Stack>
            )}
        </CompactContainer>
    )
}

const CompactContainer = (props: PropsWithChildren) => {
    const { children } = props
    const { palette, spacing, theme } = useTheme()

    return (
        <Stack
            sx={{
                width: "100%",
                height: theme("components.player.compact.height"),
                backgroundColor: palette("sr-100"),
                position: "absolute",
                bottom: 0,
                left: 0,
                overflow: "hidden",
                borderTop: `2px solid ${palette("sr-300")}`
            }}
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            paddingX={spacing("in-sm")}
        >
            {children}
        </Stack>
    )
}