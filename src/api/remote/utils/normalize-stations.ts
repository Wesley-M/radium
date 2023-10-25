import { Station } from "libs/radio-browser-api.types";

/** 
 * Normalize stations: 
 * - Remove duplicates (name and URL)
 * - Remove empty names
 * - Remove unsupported extensions
*/
export const normalizeStations = (stations: Station[]) => {
    let temp = stations;
    temp = removeEmptyBy(temp, "name")
    temp = removeEmptyBy(temp, "urlResolved")
    temp = uniqueBy(temp, "urlResolved")
    temp = uniqueBy(temp, "name")
    temp = removeByUnsupportedExtensions(temp, "urlResolved", ["m3u", "m3u8"])
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

const removeByUnsupportedExtensions = (objects: any[], by: string, ext: string[]) => {
    return objects.filter(obj => !ext.includes(obj[by as keyof Object].split(".").pop()))
}
