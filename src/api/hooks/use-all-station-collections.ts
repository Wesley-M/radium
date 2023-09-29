import { useQueries } from "@tanstack/react-query"
import { StationCollection, stationsArr } from '@api/assets/station-collections'
import { fetchCollection, getCacheConfig } from "@api/utils/fetch-collection"

/** 
 * Retrieves stations as an array of collections
*/
export const useAllStationCollections = () => {
    return useQueries({
        queries: stationsArr.map((collection: StationCollection) => {
            return {
                queryKey: [collection.query.name],
                queryFn: () => fetchCollection(collection),
                refetchOnWindowFocus: false,
                ...getCacheConfig(collection)
            }
        }) 
    })
}