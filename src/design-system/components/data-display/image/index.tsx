/** 
 * @file Image component that supports aspect ratio, proxy loading, skeletons, 
 * custom fallbacks, ringlights, and custom background based on dominant color.
*/

import { Box, Skeleton } from "@mui/material";
import { ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CssSize } from "../../../utils/size";
import { Size } from "@design-system/theme/types";
import { useTheme } from "@design-system/theme";
import Fallback from "@design-system/assets/image-fallback.svg";
import { useColorPicker } from "@design-system/hooks/use-color-picker";

export interface ImageProps {
  /** Alternative text for the image */
  alt?: string
  /** Border radius */
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
  /** 
   * Whether to use a proxy to load the image. Useful 
   * when there is CORS restrictions. 
   * */
  useProxy?: boolean
  /** Width */
  width?: string | number
}

export const Image = (props: ImageProps) => {     
  const { palette, radius } = useTheme()
  
  const {
    borderRadius = "md",
    src = "",
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

  // Calculate image width in pixels (considering a maximum width). It 
  // enables aspect ratio to work with relative values (vh, vw, rem, em).
  const maxWidthInPx = CssSize.build(maxWidth || props.width || 100).toPx() || 0
  const widthInPx = CssSize.build(props.width || 100).toPx() || 0
  const width = Math.min(maxWidthInPx, widthInPx)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [ratioHeight, setRatioHeight] = useState(0)
  const [background, setBackground] = useState<string | undefined>("transparent")

  const imageRef = useRef<HTMLImageElement>(null)
  const colorPicker = useColorPicker()

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: width,
    height: height || ratioHeight,
    backgroundColor: background,
    borderRadius: radius(borderRadius),
  }
    
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: maxWidth || "auto",
    height: '100%',
    objectFit: 'cover',
    borderRadius: radius(borderRadius),
    transition: 'opacity 300ms ease-in-out',
    border: hasRinglight ? `2px solid ${palette("br-500")}` : undefined,
    opacity: 0
  }
  
  /** 
   * Update background color based on a darker version of the 
   * image dominant color
  */
  const updateBackgroundColor = (imageRef?: RefObject<HTMLImageElement>) => {
    if (!imageRef?.current) return
    const color = colorPicker.pickDarkerDominant(imageRef.current.src, imageRef, 50)
    setBackground(color)
  }

  /** 
   * Handle image load event by updating background color and
   * bubbling up the event
  */
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.style.opacity = '1'
    setLoading(false)
    setError(false)
    updateBackgroundColor(imageRef)
    onLoad()
  }

  /** 
   * Handle image error event by hiding the image and 
   * bubbling up the event
  */
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.style.display = 'none'
    setLoading(false)
    setError(true)
  }

  /** 
   * Handle height change by re-calculating the height 
   * based on the aspect ratio (called when the width changes)
  */
  const handleHeightChange = () => {
    const newHeight = width / ratio
    setRatioHeight(newHeight)
    onHeightChange(newHeight)
  }

  /** 
   * Reset component state to initial values
  */
  const reset = () => {
    setLoading(true) 
    setError(false)
    setBackground("transparent")
    onSrcChange(imageRef)
  }

  /** 
   * For security reasons, browsers do not allow the access of image 
   * data unless it is served with CORS enabled.
  */
  const getProxyURL = (url?: string) => {
    return url && `https://corsproxy.io/?${url}`
  }

  // Reset state when image changes
  useLayoutEffect(() => {
    reset()
  }, [src])

  // Re-calculate height on width change
  useEffect(() => {
    handleHeightChange()
  }, [widthInPx, ratio])

  /** 
   * Render fallback component when image fails to load and/or 
   * it is not provided
  */
  if ((error || !src) && fallback) {
    return (
      <Box sx={containerStyle}>
        <img 
          src={Fallback}
          style={{
            width: width, 
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
            transition: 'opacity 300ms ease-in-out',
            height: height || ratioHeight,
          }} 
          variant="rounded" 
          width={width} 
          height={height} 
        />
      )}

      <img 
        src={useProxy ? getProxyURL(src) : src}
        alt={alt} 
        crossOrigin="anonymous"
        ref={imageRef} 
        style={imageStyle}
        loading="lazy"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </Box>
  )
}