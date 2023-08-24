import { Box, Skeleton } from "@mui/material";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { getURLWithCorsEnabled } from "../../utils/cors";
import { Size } from "../../utils/size";

interface ImageProps {
    width?: string
    maxWidth?: number
    src?: string
    alt?: string
    fallback?: ReactNode
    ratio?: number
    onSrcChange?: (imageRef: RefObject<HTMLImageElement>) => void
    onLoad?: () => void
    useProxy?: boolean
}

export const Image = (props: ImageProps) => {     
    const {
        src = "",
        width = "100px",
        maxWidth = 100,
        alt = "",
        fallback = <>Error while loading...</>,
        ratio = 1,
        onSrcChange = () => {},
        onLoad = () => {},
        useProxy = false
    } = props

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)
    const [height, setHeight] = useState(calculateHeight(ratio, width, maxWidth))

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
        width,
        maxWidth,
        height
    }
    
    const imageStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: (error || loading) ? 'none' : 'block', 
        borderRadius: "10px",
        transition: 'display 0.3s ease-in-out',
    }
    
    const handleImageLoad = () => {
        setLoading(false)
        setError(false)
        onLoad()
    }

    const handleImageError = () => {
        setLoading(false)
        setError(true)
    }

    // Reset state when image changes
    useEffect(() => {
        setLoading(true) 
        setError(false)
        onSrcChange(imageRef)
    }, [src])

    // Re-calculate height on resize event
    useEffect(() => {
        function handleResize() {
          setHeight(calculateHeight(ratio, width, maxWidth))
        }    
        window.addEventListener('resize', handleResize)
    })

    // Render fallback on error
    if (error && fallback) {
        return (
            <Box width={width} height={height} maxWidth={maxWidth}>
                {fallback}
            </Box>
        )
    }
     
    return (
        <Box sx={containerStyle}>
            {loading && (
                <Skeleton 
                    sx={{ borderRadius: "10px", backgroundColor: "#FFFFFF20", maxWidth }} 
                    variant="rounded" 
                    width={width} 
                    height={height} 
                />
            )}

            <img 
                src={useProxy ? getURLWithCorsEnabled(src) : src}
                alt={alt} 
                crossOrigin="anonymous"
                ref={imageRef} 
                style={imageStyle}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
        </Box>
    )
}

/**
 * Calculates the height based on a given aspect ratio and width.
 * @param {number} aspectRatio - The aspect ratio as a number (width / height).
 * @param {string} width - The width in CSS size value (e.g., '50px', '2rem', '10vw').
 * @param {string} maxWidth - The maxium width in pixels.
 * @returns {number} The calculated height in pixels.
 * @throws {Error} If the aspect ratio is not positive or the width is invalid.
 */
function calculateHeight(aspectRatio: number, width: string, maxWidth: number): number {
    if (aspectRatio <= 0) {
        throw new Error("Aspect ratio must be a positive number.");
    }

    const numericWidth = Math.min(maxWidth, Size.build(width).toPx() ?? 0);
    if (numericWidth === null || numericWidth <= 0) {
        throw new Error("Invalid width value.");
    }

    return numericWidth / aspectRatio;
}