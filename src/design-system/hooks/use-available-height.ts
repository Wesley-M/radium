import { useOnResize } from "@design-system/hooks/use-on-resize"
import { useTheme } from "@design-system/theme"
import { useEffect, useState } from "react"

/** 
 * It is used to calculate the available height for any 
 * element on the screen, given the height of the player.
*/
export const useAvailableHeight = (startY = 0) => {
    const { theme } = useTheme()  

    const [availableHeight, setAvailableHeight] = useState(0)  

    const computeAvailableSize = () => {
        const playerHeight = parseInt(theme("components.player.compact.height"))
        const endY = window.innerHeight - playerHeight
        const available = (endY - startY)
        setAvailableHeight(available)
    }
    
    // Compute available size when y coordinate changes
    useEffect(() => {
        computeAvailableSize()
    }, [startY])

    // Compute available size when window resizes
    useOnResize(computeAvailableSize)

    return availableHeight
}
