import { RefObject, useEffect, useState } from "react"
import { Station } from "../../types/radio-browser-api.types"
import { Controls } from "./controls"
import { NativeAudio } from "./native-audio"
import { PlayerControls } from "../../types/player.types"
import { Skeleton, Stack } from "@mui/material"
import { Container } from "./index.styles"
import { StationProfile } from "./station-profile"
import { useDominantColor } from "../../context/dominant-color-context"

interface PlayerProps {
    station?: Station
    audioRef: RefObject<HTMLAudioElement>
    controls: PlayerControls
}

export const Player = (props: PlayerProps) => {
    const { 
        station, 
        audioRef, 
        controls 
    } = props
    
    const { dominantColor } = useDominantColor()
    
    const [loading, setLoading] = useState(true);
    
    /**
     * Load while changing stations
    */
    useEffect(() => {
        setLoading(!Boolean(station))
    }, [JSON.stringify(station)])
    
    if (loading) return <LoadingState/>

    return (
        <Container gap={4} sx={{ background: dominantColor ? `linear-gradient(${dominantColor}88, #33373d88)` : "#33373d88" }}>
            <StationProfile station={station} />
            <Controls controls={controls}/>
            <NativeAudio 
                src={station?.urlResolved} 
                reference={audioRef}
            />
        </Container>   
    )
}

const LoadingState = () => {
    return (
        <Container gap={4} sx={{ background: "#33373d66" }}>
            <Stack direction="column" alignItems="center" gap={2}>
                <Skeleton variant="rounded" width={200} height={200}/>
                <Stack alignItems="center" gap={1}>
                    <Skeleton variant="rounded" width={180} height={30}/>
                    <Skeleton variant="rounded" width={140} height={20}/>
                </Stack>
            </Stack>
            <Controls/>
        </Container>
    )
}