import { useInfiniteQuery } from "@tanstack/react-query"
import { StationCollection, stationsMap } from '@api/static/station-collections'
import { fetchCollection, getCacheConfig } from "@api/services/collection"

/** 
 * Retrieves a station collection, given a target template or known id
*/
export const useStationCollection = (target: string | StationCollection) => {    
    // Check if the target is a known id
    const isId = typeof target === "string"
    if (isId && !(target in stationsMap)) {
        throw new Error(`Playlist with name "${target}" was not found`)
    }
    
    // Get the target template
    const targetTemplate = isId ? stationsMap[target] : target
    
    return useInfiniteQuery({
        queryKey: ["infinite", targetTemplate.query.id],
        queryFn: ({ pageParam = 0 }) => fetchCollection(targetTemplate, pageParam),
        getNextPageParam: (_lastPage, pages) => pages.length * (targetTemplate.query?.filters?.limit || 0),
        refetchOnWindowFocus: false,
        ...getCacheConfig(targetTemplate)
    })
}