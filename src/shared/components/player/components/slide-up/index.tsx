import { Box, Slide } from "@mui/material"
import { ReactNode } from "react"

interface SlideUpProps {
    children?: ReactNode
    isOpen?: boolean
}

export const SlideUp = (props: SlideUpProps) => {
    const { children, isOpen } = props
    
    return (
        <Slide 
            direction={"up"} 
            in={isOpen} 
            mountOnEnter 
            unmountOnExit
        >
            <Box 
                sx={{ 
                    position: "fixed", 
                    zIndex: 1100, 
                    width: "100%", 
                    height: "100%",
                    top: 0
                }}
            >
                {children}
            </Box>
        </Slide>
    )
}