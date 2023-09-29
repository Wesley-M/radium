import { useQuery } from "@tanstack/react-query"
import { stationsMap } from '@api/assets/station-collections'
import { fetchCollection, getCacheConfig } from "@api/utils/fetch-collection"

/** 
 * Retrieves a station collection
*/
export const useStationCollection = (collectionId: string) => {
    const collection = stationsMap[collectionId]

    return useQuery({
        queryKey: [collection.query.name],
        queryFn: () => fetchCollection(collection),
        refetchOnWindowFocus: false,
        ...getCacheConfig(collection)
    })
}