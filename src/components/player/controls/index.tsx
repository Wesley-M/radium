import { IconButton, Stack } from "@mui/material";
import { SkipButton } from "./skip-button";
import { PlayButton } from "./play-button";
import { Volume } from "./volume";
import { usePlayer } from "../../../hooks/usePlayer";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useIsMobile } from "../../../design-system/hooks/use-is-mobile";

export const Controls = () => {
    const player = usePlayer()
    
    return (
        <>
            {player?.isPreview ? <PreviewControls/> : <FullControls/>}
        </>
    )
}

export const MobileTopControls = () => {
    const player = usePlayer()
    const isMobile = useIsMobile()

    if (!player?.isFull || !isMobile) return

    return (
        <Stack sx={{ marginRight: "1em", marginTop: "1em" }} direction="row" justifyContent="flex-end" width="100%">
            <IconButton sx={{ color: "#F1F1F1", "& .MuiSvgIcon-root": { width: 40, height: 40 } }} onClick={player?.controls.toggleMode}>
                <KeyboardArrowDownIcon/>
            </IconButton>
        </Stack>
    )
}

const PreviewControls = () => {
    const player = usePlayer()
    
    return (
        <Stack direction="row" alignItems="center">
            <PlayButton 
                onClick={player?.controls?.toggle} 
                isPlaying={player?.controls?.isPlaying()}
                width={45}
                height={45}
            />
            <IconButton sx={{ color: "#F1F1F1", "& .MuiSvgIcon-root": { width: 32, height: 32 } }} onClick={player?.controls.toggleMode}>
                <KeyboardArrowUpIcon/>
            </IconButton>
        </Stack>
    )
}

const FullControls = () => {
    const player = usePlayer()
    const isMobile = useIsMobile()
    
    return (
        <Stack 
            gap={5} 
            alignItems="center" 
            sx={{ 
                width: isMobile ? "60vw" : "auto",
                marginTop: isMobile ? "1.5em" : 0 
            }} 
        >
            <Stack 
                sx={{ width: "100%" }} 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between" 
                gap={1}
            >
                <SkipButton 
                    onClick={player?.controls?.skipPrevious} 
                    disabled={!player?.controls?.canSkipPrevious()}
                />

                <PlayButton 
                    onClick={player?.controls?.toggle} 
                    isPlaying={player?.controls?.isPlaying()}
                    width={isMobile ? 70 : 60}
                    height={isMobile ? 70 : 60}
                />
                
                <SkipButton 
                    onClick={player?.controls?.skipNext} 
                    disabled={!player?.controls?.canSkipNext()}
                    isNext
                />
            </Stack>
            <Volume 
                value={player?.controls?.getVolume() || 0} 
                setVolume={player?.controls?.changeVolume}
            />
        </Stack>
    )
}