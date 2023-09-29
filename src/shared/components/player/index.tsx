import { SlideUp } from "@components/player/components/slide-up"
import { CompactPlayer } from "@components/player/variants/compact-player"
import { FullPlayer } from "@components/player/variants/full-player"
import { PreviewPlayer } from "@components/player/variants/preview-player"
import { useIsMobile } from "@design-system/hooks/use-is-mobile"
import { useState } from "react"
import { usePlaylist } from "@hooks/use-playlist"

export const Player = () => {
    const isMobile = useIsMobile()
    const [isFull, setFull] = useState(false)

    const playlist = usePlaylist()

    // Does not render if there is nothing in the playlist
    if (playlist?.isEmpty()) {
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