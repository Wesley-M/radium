import { SlideUp } from "@components/player/components/slide-up"
import { CompactPlayer } from "@components/player/variants/compact-player"
import { FullPlayer } from "@components/player/variants/full-player"
import { PreviewPlayer } from "@components/player/variants/preview-player"
import { useIsMobile } from "@design-system/hooks/use-is-mobile"
import { useState } from "react"
import { usePlaylist } from "@components/player/hooks/use-playlist"

// import IcecastMetadataStats from "icecast-metadata-stats";

// const statsListener = new IcecastMetadataStats(playlist?.getStream()?.url, {
    //     onStats: (stats: any) => { console.log(stats) },
    //     interval: 30,
    //     sources: ["icy"],
    // })
    // useEffect(() => {
    //     statsListener.start()
    //     return () => statsListener.stop()
    // })

export const Player = () => {
    const [isFull, setFull] = useState(false)
    const playlist = usePlaylist()

    // Does not render if we are in mobile and there is nothing in the playlist
    const isMobile = useIsMobile()
    if (isMobile && playlist?.isEmpty()) {
        return null
    }
    
    if (isMobile) {
        return (
            <>  
                <SlideUp isOpen={isFull} >
                    <FullPlayer onCloseClick={() => setFull(false)} />
                </SlideUp>
                <PreviewPlayer onOpenClick={() => setFull(true)} />
            </> 
        )
    }

    return (
        <CompactPlayer />
    )
}