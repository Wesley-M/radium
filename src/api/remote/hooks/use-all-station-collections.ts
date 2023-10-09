import { useQueries } from "@tanstack/react-query"
import { StationCollection, stationsArr } from '@api/static/station-collections'
import { fetchCollection, getCacheConfig } from "@api/services/collection"

/** 
 * Retrieves stations as an array of collections
*/
export const useAllStationCollections = () => {
    return useQueries({
        queries: stationsArr.map((collection: StationCollection) => {
            return {
                queryKey: ["all", collection.query.id],
                queryFn: () => fetchCollection(collection),
                refetchOnWindowFocus: false,
                ...getCacheConfig(collection)
            }
        }) 
    })
}