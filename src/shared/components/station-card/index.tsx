import { Card } from "@design-system/components/surfaces/card";
import { usePlayer } from "@hooks/use-player"
import { usePlaylist } from "@hooks/use-playlist"
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { Station } from "libs/radio-browser-api.types";
import { useState } from "react";

interface StationCardProps {
    station: Station,
    stationIdx: number,
    collection: any,
    isCompact?: boolean
}

export const StationCard = (props: StationCardProps) => {
    const { 
        station, 
        stationIdx, 
        collection, 
        isCompact 
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

    const playStation = (station: Station, collection: any, index: number) => {
        playlist?.set(collection.data.content, index)
        player?.toggle(station)
    }

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
                onClick: () => playStation(station, collection, stationIdx),
            }}
            onHoverChange={setHover}
            enableAlwaysShowAction={player?.isPlaying(station)}
            enableMarquee={hover}
        />
    )
}