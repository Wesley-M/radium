import { DominantColorContext } from "@context/dominant-color-context"
import { RefObject, useContext, useEffect, useState } from "react"

export const useDominantColor = () => {
    const context = useContext(DominantColorContext)
    if (!context) return { dominantColor: null, resetDominantColor: () => {} }

    const {dominantColor, update, reset} = context
    const [imageRef, setImageRef] = useState<RefObject<HTMLImageElement> | null>(null)
    const [imageIsReady, setImageIsReady] = useState(false)
    
    useEffect(() => {
        if (imageRef?.current && imageRef.current.width !== 0 && imageIsReady) {
            update(imageRef)
        } else {
            reset()
        }
    }, [imageRef?.current?.src, imageIsReady])
    
    const updateColor = (ref: RefObject<HTMLImageElement>) => {
        setImageRef?.(ref)
        setImageIsReady?.(false)
    }

    return { 
        dominantColor, 
        updateColor, 
        setImageIsReady
    }
}