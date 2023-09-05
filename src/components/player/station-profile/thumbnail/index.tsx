import { RefObject, useState } from "react";
import RadioRoundedIcon from '@mui/icons-material/RadioRounded';
import { useDominantColor } from "../../../../context/dominant-color-context";
import { usePlayer } from "../../../../hooks/usePlayer";
import { useIsMobile } from "../../../../design-system/hooks/use-is-mobile";
import { Image } from "../../../../design-system/components/image"
import { Stack } from "@mui/material";

const getSize = (isPreview?: boolean, isMobile?: boolean) => {
    if (isPreview) {
        return "50px"
    }
    return isMobile ? "80vw" : "200px"
}

export const Thumbnail = () => {        
    const player = usePlayer()
    const [imageRef, setImageRef] = useState<RefObject<HTMLImageElement> | null>(null)
    const [loaded, setLoaded] = useState(false)
    const isMobile = useIsMobile()

    const size = getSize(player?.isPreview, isMobile)
    const { resetDominantColor } = useDominantColor(imageRef ?? undefined, loaded)

    const handleSrcChange = (ref: RefObject<HTMLImageElement>) => {
        resetDominantColor()
        setImageRef(ref)
        setLoaded(false)
    }

    return (
        <Image
            src={player?.station?.favicon}
            width={size}
            maxWidth={300}
            alt={`Thumbnail from the following station: ${player?.station?.name}`} 
            fallback={<DefaultThumbnail/>}
            onLoad={() => setLoaded(true)}
            onSrcChange={handleSrcChange}
            useProxy
        />    
    )
}

const DefaultThumbnail = () => {
    const player = usePlayer()
    const isMobile = useIsMobile()

    return (
        <Stack 
            sx={{ 
                background: "#F1F1F1AA",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                "& .MuiSvgIcon-root": {
                    width: player?.isPreview ? 25 : (isMobile ? 100 : 60),
                    height: player?.isPreview ? 25 : (isMobile ? 100 : 60),
                    color: "#F1F1F1"
                } 
            }}
        >
            <RadioRoundedIcon/>
        </Stack>
    )
}