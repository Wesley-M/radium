import { Card } from "@design-system/components/surfaces/card";
import { usePlayer } from "@hooks/use-player"
import { usePlaylist } from "@hooks/use-playlist"
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { Station } from "libs/radio-browser-api.types";
import { useState } from "react";

interface StationCardProps {
    station: Station
    collection: Station[]
    stationIdx: number
    isCompact?: boolean
}

export const StationCard = (props: StationCardProps) => {
    const { 
        station, 
        stationIdx, 
        isCompact,
        collection
    } = props

    const player = usePlayer()
    const playlist = usePlaylist()
    const [hover, setHover] = useState(false)
    
    const getIcon = () => {
        if (player?.isPlaying(station)) {
            return <PauseCircleFilledRoundedIcon/>
        }
        return <PlayCircleFilledRoundedIcon/>
    }

    const playStation = (station: Station, index: number) => {
        playlist?.set(collection, index)
        player?.toggle(station)
    }

    const play = () => playStation(station, stationIdx)

    return (
        <Card
            title={station.name}
            subtitle={station.tags.join(", ")}
            imageProps={{ src: station.favicon }}
            padding={isCompact ? "xs" : "sm"}
            borderRadius='md'
            variant={isCompact ? "compact" : "default"}
            actionProps={{
                icon: getIcon(),
                onClick: play,
            }}
            onHoverChange={setHover}
            enableAlwaysShowAction={player?.isPlaying(station)}
            enableMarquee={hover}
        />
    )
}