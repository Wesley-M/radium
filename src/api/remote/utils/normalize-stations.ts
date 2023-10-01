import { Station } from "libs/radio-browser-api.types";

/** 
 * Normalize stations: 
 * - Remove duplicates
*/
export const normalizeStations = (stations: Station[]) => {
    let temp = stations;
    temp = uniqueBy(temp, "urlResolved")
    temp = removeEmptyBy(temp, "name")
    return temp
}

const uniqueBy = (objects: any[], by: string) => {
    return [...new Map(
        objects.map(obj => [obj[by as keyof Object], obj])
    ).values()]
}

const removeEmptyBy = (objects: any[], by: string) => {
    return objects.filter(obj => obj[by as keyof Object].trim() !== "")
}
