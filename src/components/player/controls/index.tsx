import { PlayerControls } from "../../../types/player.types"
import { Stack } from "@mui/material";
import { SkipButton } from "./skip-button";
import { PlayButton } from "./play-button";
import { Volume } from "./volume";

interface ControlsProps {
    controls?: PlayerControls
}

export const Controls = (props: ControlsProps) => {
    const { controls } = props
    
    return (
        <Stack direction="column" gap={5}>
            <Stack direction="row" alignItems="center" gap={1}>
                <SkipButton 
                    onClick={controls?.skipPrevious} 
                    disabled={!controls?.canSkipPrevious()}
                />

                <PlayButton 
                    onClick={controls?.toggle} 
                    isPlaying={controls?.isPlaying()}
                />
                
                <SkipButton 
                    onClick={controls?.skipNext} 
                    disabled={!controls?.canSkipNext()}
                    isNext
                />
            </Stack>
            <Volume value={controls?.getVolume()} setVolume={controls?.setVolume}/>
        </Stack>
    )
}