import { Card } from "@design-system/components/surfaces/card";
import { usePlayer } from "@design-system/components/player/hooks/use-player"
import { usePlaylist } from "@design-system/components/player/hooks/use-playlist"
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { Station } from "libs/radio-browser-api.types";
import { useState } from "react";
import { CardProps } from "@design-system/components/surfaces/card/variants/base-card";

interface StationCardProps {
    width?: number
    height?: number
    station: Station
    collection: Station[]
    stationIdx: number
    isCompact?: boolean
    loading?: boolean
    cardProps?: CardProps
}

export const StationCard = (props: StationCardProps) => {
    const { 
        width,
        height,
        station, 
        stationIdx, 
        isCompact,
        collection,
        loading = true,
        cardProps
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
            loading={loading}
            width={width}
            height={height}
            title={station.name}
            subtitle={station.tags.join(", ")}
            imageProps={{ 
                src: station.favicon,
                borderRadius: "md", 
            }}
            padding={isCompact ? "xxs" : "sm"}
            borderRadius='md'
            variant={isCompact ? "compact" : "default"}
            actionProps={{
                icon: getIcon(),
                onClick: play,
            }}
            onHoverChange={setHover}
            enableAlwaysShowAction={player?.isPlaying(station)}
            enableMarquee={hover}
            {...cardProps}
        />
    )
}