import ColorThief from "colorthief";
import { ReactNode, RefObject, createContext, useContext, useEffect, useState } from "react";

interface DominantColorContextProps {
    dominantColor: string | null;
    updateDominantColor: (imageRef?: RefObject<HTMLImageElement>) => void,
    resetDominantColor: () => void
}

export const DominantColorContext = createContext<DominantColorContextProps | null>(null)


interface DominantColorProviderProps {
    children: ReactNode
}

export const DominantColorProvider = (props: DominantColorProviderProps) => {
    const { children } = props
    
    const [ dominantColor , setDominantColor] = useState<string | null>(null)

    const updateDominantColor = (imageRef?: RefObject<HTMLImageElement>) => {
        if (!imageRef?.current) return
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(imageRef.current)
        setDominantColor(rgbToHex(r, g, b))
    }

    const resetDominantColor = () => {
        setDominantColor(null)
    }
    
    function rgbToHex(r: number, g: number, b: number) {
        const toHex = (num: number) => {
            const hex = num.toString(16)
            return hex.length === 1 ? "0" + hex : hex
        }   
        return "#" + toHex(r) + toHex(g) + toHex(b);
    }
    
    return (
        <DominantColorContext.Provider value={{ dominantColor, updateDominantColor, resetDominantColor }}>
            {children}
        </DominantColorContext.Provider>
    )
}
    

export const useDominantColor = (imageRef?: RefObject<HTMLImageElement>, isLoaded = false) => {
    const context = useContext(DominantColorContext)
    if (!context) return { dominantColor: null, resetDominantColor: () => {} }

    const {dominantColor, updateDominantColor, resetDominantColor} = context
    
    useEffect(() => {
        if (imageRef?.current && imageRef.current.width !== 0 && isLoaded) {
            updateDominantColor(imageRef)
        } else {
            resetDominantColor()
        }
    }, [imageRef?.current?.src, isLoaded])
    
    return { dominantColor, resetDominantColor }
}