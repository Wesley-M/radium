import { Box, Skeleton } from "@mui/material";
import { ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CssSize } from "../../../utils/size";
import { Size } from "@design-system/theme/types";
import { useTheme } from "@design-system/theme";
import { ReactComponent as Fallback } from "@design-system/assets/image-fallback.svg";
import ColorThief from "colorthief";
import { Color } from "@design-system/utils";

export interface ImageProps {
  /** Alt text for the image */
  alt?: string
  /** Border radius of the image */
  borderRadius?: Size
  /** Fallback component to render when image fails to load */
  fallback?: ReactNode
  /** Whether to add a ringlight */
  hasRinglight?: boolean
  /** Height */
  height?: string | number
  /** Maximum width */
  maxWidth?: string | number
  /** Aspect Ratio */
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
  /** Width */
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
  const [background, setBackground] = useState<string | undefined>("transparent")
  const imageRef = useRef<HTMLImageElement>(null)

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: widthInPx,
    height: height || ratioHeight,
    backgroundColor: background,
    borderRadius: radius(borderRadius),
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
    transition: 'opacity 200ms ease-in-out',
    border: hasRinglight ? `2px solid ${palette("br-500")}` : undefined
  }
  
  const updateBackgroundColor = (imageRef?: RefObject<HTMLImageElement>) => {
    if (!imageRef?.current) return
    const colorThief = new ColorThief();
    const pickedColor = `rgb(${colorThief.getColor(imageRef.current).toString()})`
    const backgroundColor = Color.build(pickedColor).logShade(-0.5)
    setBackground(backgroundColor)
  }

  const handleImageLoad = () => {
    setLoading(false)
    setError(false)
    updateBackgroundColor(imageRef)
    onLoad()
  }

  const handleImageError = () => {
    setLoading(false)
    setError(true)
  }

  const handleHeightChange = () => {
    const newHeight = calculateHeight(ratio, widthInPx)
    setRatioHeight(newHeight)
    onHeightChange(newHeight)
  }

  const reset = () => {
    setLoading(true) 
    setError(false)
    setBackground("transparent")
    onSrcChange(imageRef)
  }

  // Reset state when image changes
  useLayoutEffect(() => {
    reset()
  }, [src])

  // Re-calculate height on width change
  useEffect(() => {
    handleHeightChange()
  }, [width, ratio])

  // Render fallback on error
  if ((error || !src) && fallback) {
    return (
      <Box sx={containerStyle}>
        <Fallback 
          style={{ 
            width: widthInPx, 
            height: height || ratioHeight, 
            borderRadius: radius(borderRadius) 
          }}
        />
      </Box>
    )
  }
     
  return (
    <Box sx={containerStyle}>
      {loading && (
        <Skeleton 
          sx={{ 
            borderRadius: radius(borderRadius), 
            backgroundColor: palette("sr-500"),
            transition: 'opacity 200ms ease-in-out',
            height: height || ratioHeight,
          }} 
          variant="rounded" 
          width={widthInPx} 
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

const getURLWithCorsEnabled = (url?: string) => {
  return url && `https://corsproxy.io/?${url}`
}

const calculateHeight = (aspectRatio: number, width: number): number => {
  if (aspectRatio <= 0) {
    throw new Error("Aspect ratio must be a positive number.");
  }
  return width / aspectRatio;
}