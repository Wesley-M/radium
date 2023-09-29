import ColorThief from "colorthief";
import { ReactNode, RefObject, createContext, useState } from "react";
import { prominent } from 'color.js'

interface DominantColorContextProps {
    dominantColor: string | null;
    update: (imageRef?: RefObject<HTMLImageElement>) => void,
    reset: () => void
}

export const DominantColorContext = createContext<DominantColorContextProps | null>(null)


interface DominantColorProviderProps {
    children: ReactNode
}

export const DominantColorProvider = (props: DominantColorProviderProps) => {
    const { children } = props
    
    const [ dominantColor , setDominantColor] = useState<string | null>(null)

    const update = (imageRef?: RefObject<HTMLImageElement>) => {
        if (!imageRef?.current) return
        const colorThief = new ColorThief();
        const pickedColor = colorThief.getColor(imageRef.current)
        setDominantColor(`rgb(${pickedColor.toString()})`)
    }

    const reset = () => {
        setDominantColor(null)
    }
    
    return (
        <DominantColorContext.Provider value={{ dominantColor, update, reset }}>
            {children}
        </DominantColorContext.Provider>
    )
}