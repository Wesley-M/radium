import { fetchCollection, getCacheConfig } from "@api/services/collection"
import { StationCollection, stationsArr } from "@api/static/station-collections"
import { useQueries } from "@tanstack/react-query"

export const useStaticSearch = () => {
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