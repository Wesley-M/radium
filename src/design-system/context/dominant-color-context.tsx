import { useColorPicker } from "@design-system/hooks/use-color-piker";
import { ReactNode, RefObject, createContext, useState } from "react";

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
    const colorPicker = useColorPicker()
    
    const update = (imageRef?: RefObject<HTMLImageElement>) => {
        if (!imageRef?.current) return
        const color = colorPicker.pickDominant(imageRef.current.src, imageRef)
        setDominantColor(color)
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