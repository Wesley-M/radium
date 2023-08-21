import { useEffect, useRef, useState } from "react";
import RadioRoundedIcon from '@mui/icons-material/RadioRounded';
import { DefaultThumbnail } from "./index.styles";
import { getURLWithCorsEnabled } from "../../../../utils/cors";
import { useDominantColor } from "../../../../context/dominant-color-context";
import { Skeleton } from "@mui/material";

interface ThumbnailProps {
    url?: string,
}

export const Thumbnail = (props: ThumbnailProps) => {
    const { url } = props
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const imageRef = useRef<HTMLImageElement>(null)

    const handleImageLoad = () => {
        setLoading(false)
        setError(false)
    }

    const handleImageError = () => {
        setLoading(false)
        setError(true)
    }

    // Update dominant color
    const { resetDominantColor } = useDominantColor(imageRef, !loading && !error)

    // Reset default thumbnail status to false
    useEffect(() => {
        setLoading(true) 
        setError(false)
        resetDominantColor()
    }, [url])

    if (error) {
        return (
            <DefaultThumbnail>
                <RadioRoundedIcon/>
            </DefaultThumbnail>
        )
    }

    return (
        <>
            {loading && (
                <Skeleton sx={{ borderRadius: "10px" }} variant="rounded" width={200} height={200} />
            )}

            <img 
                src={getURLWithCorsEnabled(url)}
                alt="The radio station thumbnail" 
                crossOrigin="anonymous"
                ref={imageRef} 
                width={200}
                height={200}
                style={{ display: (error || loading) ? 'none' : 'block', borderRadius: "10px" }}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
        </>
    )
}