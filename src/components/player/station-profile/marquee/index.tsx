import { Typography, keyframes } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { CssSize } from "@design-system/utils";

interface MarqueeProps {
    text?: string
    width: string | number,
    size?: string,
}

export const Marquee = (props: MarqueeProps) => {
    const { text, width, size = "1.2em" } = props

    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const [hiddenTextWidth, setHiddenTextWidth] = useState(0);

    const marqueeKeyframes = keyframes`
        0% {transform: translateX(${hiddenTextWidth/2}px);}
        45% {transform: translateX(${-hiddenTextWidth/2}px);}
        50% {transform: translateX(${-hiddenTextWidth/2}px);}
        95% {transform: translateX(${hiddenTextWidth/2}px);}
        100% {transform: translateX(${hiddenTextWidth/2}px);}
    `

    // Re-calculate the width of the text not in the screen
    useEffect(() => {
        if (!paragraphRef.current) return
        const paragraphElement = paragraphRef.current;
        const paragraphWidth = paragraphElement.clientWidth;
        const hiddenWidth = paragraphWidth - (CssSize.build(width).toPx() || 0);
        setHiddenTextWidth(hiddenWidth);
    }, [text]);

    const getAnimation = () => {
        const hasAnimation = hiddenTextWidth > 0
        return hasAnimation ? `${marqueeKeyframes} ${(text?.length || 0) / 5}s infinite ease-in-out` : "none"
    }

    return (
        <Typography 
            sx={{ 
                width: "fit-content",
                color: "#F1F1F1DD",
                fontSize: size,
                fontWeight: "bold",
                animation: getAnimation(),
                "&:hover": {
                    animationPlayState: "paused"
                }, 
            }}
            ref={paragraphRef}
            noWrap
        >
            {text}
        </Typography>
    )
} 