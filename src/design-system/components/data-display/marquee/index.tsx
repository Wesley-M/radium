import { Box, keyframes } from "@mui/material"
import { Text, TextProps } from "@design-system/components/data-display/text"
import useMeasure from "react-use-measure"
import { useEffect, useRef, useState } from "react"
import merge from "lodash.merge"

interface MarqueeProps {
    /** The text to be displayed */
    text?: string
    /** The props to be passed to the text component */
    textProps?: TextProps
    /** The speed of the marquee (how fast the hidden text will be shown) */
    speed?: number
    /** The maximum duration of the animation in seconds */
    maxDurationInSec?: number
    /** The minimum duration of the animation in seconds */
    minDurationInSec?: number
}

export const Marquee = (props: MarqueeProps) => {
    const { 
        text, 
        textProps, 
        speed = 20,
        minDurationInSec = 5,
        maxDurationInSec = 25 
    } = props

    const textRef = useRef<HTMLParagraphElement | null>(null);
    const [containerRef, containerBounds] = useMeasure();
    const [hiddenSpace, setHiddenSpace] = useState(0);

    const marqueeKeyframes = keyframes`
        0% {transform: translateX(0);}
        10% {transform: translateX(0);}
        50% {transform: translateX(${-hiddenSpace}px);}
        60% {transform: translateX(${-hiddenSpace}px);}
        100% {transform: translateX(0);}
    `

    const calculateHiddenSpace = () => {
        if (!textRef.current) return
        const textEl = textRef.current
        const textWidth = textEl.clientWidth
        const hiddenSpace = textWidth - containerBounds.width
        setHiddenSpace(hiddenSpace);
    }

    const getAnimationDuration = () => {
        const duration = (hiddenSpace || 0) / speed
        return Math.min(maxDurationInSec, Math.max(minDurationInSec, duration))
    }

    const getAnimation = () => {
        const hasAnimation = hiddenSpace > 0
        return hasAnimation ? `${marqueeKeyframes} ${getAnimationDuration()}s infinite linear` : "none"
    }

    /** 
     * Calculate the hidden space when the text or container 
     * size changes
    */
    useEffect(() => {
        calculateHiddenSpace()
    }, [textRef?.current?.clientWidth, containerBounds.width]);

    return (
        <Box ref={containerRef} sx={{ width: "100%", overflow: "hidden" }}>
            <Text 
                {...textProps}
                innerRef={textRef}
                sx={merge({
                    width: "fit-content",
                    animation: getAnimation()
                }, textProps?.sx)}
            >
                {text}
            </Text>
        </Box>
    )
}