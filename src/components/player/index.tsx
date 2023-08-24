import { useDominantColor } from "../../context/dominant-color-context"
import { usePlayer } from "../../hooks/usePlayer"
import { StationProfile } from "./station-profile"
import { Controls } from "./controls"
import { FullContainer, PreviewContainer, getBackground } from "./index.styles"
import { Slide } from "@mui/material"
import { useIsMobile } from "../../hooks/useIsMobile"

export const Player = () => {
    const { dominantColor } = useDominantColor()
    const isMobile = useIsMobile()
    const player = usePlayer()

    const content = (
        <>
            <StationProfile />
            <Controls />
            <audio 
                src={player?.station?.urlResolved} 
                ref={player?.audioRef}
                onLoadedData={player?.controls.onAudioLoad}
                onPause={player?.controls.onPause}
                onPlay={player?.controls.onPlay}
            />
        </>
    )

    // Preview version
    if (player?.isPreview) {
        return (
            <PreviewContainer 
                onLoad={player?.controls.resetAudio} 
                sx={{ background: getBackground(dominantColor, player?.isFull) }}
            >
                {content}
            </PreviewContainer>
        )
    }

    // Mobile version
    if (isMobile) {
        return (
            <Slide 
                onLoad={player?.controls.resetAudio} 
                direction="up" 
                in={true} 
                mountOnEnter 
                unmountOnExit
            >
                <FullContainer 
                    isMobile={isMobile} 
                    sx={{ background: getBackground(dominantColor, player?.isFull) }}
                >
                    {content}
                </FullContainer>
            </Slide>
        )
    }

    // Desktop version
    return (
        <FullContainer 
            isMobile={false} 
            sx={{ background: getBackground(dominantColor, player?.isFull) }}
        >
            {content}
        </FullContainer>         
    )
}

// const LoadingState = () => {
//     const player = usePlayer()
//     const isMobile = useIsMobile()
    
//     return (
//         <>
//             {player?.isFull && (
//                 <FullContainer isMobile={isMobile} gap={4} sx={{ background: "#33373d66" }}>
//                     <Stack direction="column" alignItems="center" gap={2}>
//                         <Skeleton variant="rounded" width={200} height={200}/>
//                         <Stack alignItems="center" gap={1}>
//                             <Skeleton variant="rounded" width={180} height={30}/>
//                             <Skeleton variant="rounded" width={140} height={20}/>
//                         </Stack>
//                     </Stack>
//                     <Controls/>
//                 </FullContainer>
//             )}
//         </>
//     )
// }