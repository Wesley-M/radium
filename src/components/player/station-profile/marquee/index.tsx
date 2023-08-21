import { Typography, keyframes } from "@mui/material"

interface MarqueeProps {
    text?: string
}

const scroll = keyframes`
    from {transform: translateX(100%);}
    to {transform: translateX(-100%);}
`

export const Marquee = (props: MarqueeProps) => {
    const { text } = props

    const getAnimation = () => {
        const widthProxy = (text?.length || 0) * 4
        const hasAnimation = widthProxy > 100
        return hasAnimation ? `${scroll} ${widthProxy / 20}s infinite linear` : "none"
    }

    return (
        <Typography 
            sx={{ 
                color: "#F1F1F1DD",
                fontSize: "1.2em",
                fontWeight: "bold",
                animation: getAnimation(),
                "&:hover": {
                    animationPlayState: "paused"
                }, 
            }}
            noWrap
        >
            {text}
        </Typography>
    )
} 