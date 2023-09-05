import { Stack, styled } from "@mui/material"
import { Thumbnail } from "./thumbnail"
import { Marquee } from "./marquee"
import { TagList } from "./tag-list"
import { usePlayer } from "../../../hooks/usePlayer"
import { useIsMobile } from "../../../design-system/hooks/use-is-mobile"

export const Container = styled(Stack)`
    overflow: hidden;
    align-items: center;
    gap: 16px;
`

export const StationProfile = () => {
    const player = usePlayer()
    const isMobile = useIsMobile()

    const width = isMobile ? "90vw" : 200

    return (
        <Container 
            width={width}
            direction={player?.isPreview ? "row" : "column"}
        >
            <Thumbnail />
            <Stack 
                sx={{ marginTop: player?.isPreview ? 0 : "2em" }} 
                alignItems={player?.isPreview ? "left" : "center"}
                gap={player?.isPreview ? 0 : 1}
            >
                <Marquee 
                    text={player?.station?.name} 
                    width={width}
                    size={player?.isPreview ? "0.9em" : (isMobile ? "1.4em" : "1.2em") }
                />
                <TagList 
                    list={player?.station?.tags}
                    size={player?.isPreview ? "0.6em" : (isMobile ? "0.8em" : "0.7em")}
                    thresholdInLetters={player?.isPreview ? 15 : 25}
                />
            </Stack>
        </Container>
    )
}