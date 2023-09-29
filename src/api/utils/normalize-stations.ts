import { Station } from "libs/radio-browser-api.types";

/** 
 * Normalize stations: 
 * - Remove duplicates
*/
export const normalizeStations = (stations: Station[]) => {
    let temp = stations;
    temp = uniqueBy(temp, "urlResolved")
    return temp
}

const uniqueBy = (objects: any[], by: string) => {
    return [...new Map(
        objects.map(obj => [obj[by as keyof Object], obj])
    ).values()]
}
