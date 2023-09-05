import { Box, Skeleton } from "@mui/material";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { CssSize } from "../../utils/size";
import { Size } from "@design-system/theme/types";
import { useTheme } from "@design-system/theme";
import { ReactComponent as Fallback } from "@design-system/assets/image-fallback.svg";

interface ImageProps {
  /** Alt text for the image */
  alt?: string
  /** Border radius of the image */
  borderRadius?: Size
  /** Fallback component to render when image fails to load */
  fallback?: ReactNode
  /** Whether to add a ringlight to the image */
  hasRinglight?: boolean
  /** Height of the image */
  height?: string | number
  /** Max width of the image */
  maxWidth?: string | number
  /** Aspect ratio of the image */
  ratio?: number
  /** Callback when image height changes */
  onHeightChange?: (height: number) => void
  /** Callback when image loads */ 
  onLoad?: () => void
  /** Callback when image source changes */
  onSrcChange?: (imageRef: RefObject<HTMLImageElement>) => void
  /** Image source */
  src?: string
  /** Whether to use a proxy to load the image */
  useProxy?: boolean
  /** Width of the image */
  width?: string | number
}

export const Image = (props: ImageProps) => {     
  const { palette, radius } = useTheme()
  
  const {
    borderRadius = "md",
    src = "",
    width = 100,
    height,
    maxWidth,
    alt = "",
    fallback = <Fallback/>,
    ratio = 1,
    onSrcChange = () => {},
    onHeightChange = () => {},
    onLoad = () => {},
    useProxy = false,
    hasRinglight = false
  } = props

  const widthInPx = Math.min(CssSize.build(maxWidth || width).toPx() ?? 0, CssSize.build(width).toPx() ?? 0)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [ratioHeight, setRatioHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: widthInPx,
    height: height || ratioHeight,
  }
    
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: maxWidth || widthInPx,
    height: '100%',
    objectFit: 'cover',
    borderRadius: radius(borderRadius),
    opacity: loading ? 0 : 1,
    transition: 'opacity 200ms ease-in-out',
    border: hasRinglight ? `2px solid ${palette("br-500")}` : undefined
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

  // Re-calculate height on width change
  useEffect(() => {
    const newHeight = calculateHeight(ratio, widthInPx)
    setRatioHeight(newHeight)
    onHeightChange(newHeight)
  }, [width, ratio])

  // Render fallback on error
  if (error && fallback) {
    return (
      <Fallback 
        style={{ 
          width: widthInPx, 
          height: height || ratioHeight, 
          borderRadius: radius(borderRadius) 
        }}
      />
    )
  }
     
  return (
    <Box sx={containerStyle}>
      <Skeleton 
        sx={{ 
          borderRadius: radius(borderRadius), 
          backgroundColor: palette("sr-500"),
          opacity: loading ? 1 : 0,
          transition: 'opacity 200ms ease-in-out',
          height: height || ratioHeight,
        }} 
        variant="rounded" 
        width={widthInPx} 
        height={height} 
      />

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

const getURLWithCorsEnabled = (url?: string) => {
  return url && `https://api.allorigins.win/raw?url=${url}`
}

const calculateHeight = (aspectRatio: number, width: number): number => {
  if (aspectRatio <= 0) {
    throw new Error("Aspect ratio must be a positive number.");
  }
  return width / aspectRatio;
}