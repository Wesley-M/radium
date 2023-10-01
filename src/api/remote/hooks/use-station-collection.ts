import { useQuery } from "@tanstack/react-query"
import { StationCollection, stationsMap } from '@api/static/station-collections'
import { fetchCollection, getCacheConfig } from "@api/remote/services/collection"

/** 
 * Retrieves a station collection
*/
export const useStationCollection = (collection: string | StationCollection) => {
    let collectionObj: StationCollection
    if (typeof collection === "string") {
        collectionObj = stationsMap[collection]
    } else {
        collectionObj = collection
    }

    return useQuery({
        queryKey: [collectionObj.query.id],
        queryFn: () => fetchCollection(collectionObj),
        refetchOnWindowFocus: false,
        ...getCacheConfig(collectionObj)
    })
}