import { useCache } from "@design-system/hooks/use-cache";
import { Color } from "@design-system/utils";
import ColorThief from "colorthief";
import { RefObject } from "react";

export const useColorPicker = () => {
    const cache = useCache('color-picker')

    const pickDominant = (imageId: string, imageRef: RefObject<HTMLImageElement>) => {
        if (!imageRef.current) return 'rgba(0,0,0,0)'
        if (!imageId) return 'rgba(0,0,0,0)'
        if (cache.has(imageId)) return cache.get(imageId)
        
        const colorThief = new ColorThief();
        const pickedColor = `rgb(${colorThief.getColor(imageRef.current).toString()})`
        
        cache.update(imageId, pickedColor)
        
        return pickedColor
    }

    /** 
     * Picks a darker shade of the dominant color
     * @param percentage - percentage of the shade (0-100)
    */
    const pickDarkerDominant = (imageId: string, imageRef: RefObject<HTMLImageElement>, percentage: number) => {
        const pickedColor = pickDominant(imageId, imageRef)
        return Color.build(pickedColor).logShade(-percentage/100)
    }

    return { pickDominant, pickDarkerDominant }
}
