import { Stack } from "@mui/material"
import { Thumbnail } from "./thumbnail"
import { Marquee } from "./marquee"
import { Station } from "../../../types/radio-browser-api.types"
import { Container } from "./index.styles"
import { TagList } from "./tag-list"

interface StationProfileProps {
    station?: Station
}

export const StationProfile = (props: StationProfileProps) => {
    const { station } = props

    return (
        <Container>
            <Thumbnail url={station?.favicon} />
            <Stack alignItems="center" gap={1}>
                <Marquee text={station?.name}/>
                <TagList list={station?.tags}/>
            </Stack>
        </Container>
    )
}