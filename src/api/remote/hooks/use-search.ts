import { getTranslationMetadata } from "@api/remote/utils/translation-metadata"
import { FetchCollectionResult, fetchCollection, getCacheConfig } from "@api/services/collection"
import { StationCollection, TargetType, stationsMap } from "@api/static/station-collections"
import { useInfiniteQuery } from "@tanstack/react-query"
import { AdvancedStationQuery } from "libs/radio-browser-api.types"
import merge from "lodash.merge"
import { useTranslation } from "react-i18next"

export type FilterOption = keyof AdvancedStationQuery

export type SearchProps = {
        /** The search query */
        query: string
        /** The filters to apply to the search */
        by: FilterOption[]
        /** Local collection to search againt */
        localCollection?: TargetType
    } |
    {
        /** A known collection id from a static collection template */
        collectionId: string
    } |
    {
        /** A collection template, which gives the most search flexibility */
        collectionTemplate: StationCollection
    }


/** 
 * You can specify a query and filters or a target (known id, or object), 
 * but not both.
 * */
export const useSearch = (props: SearchProps) => {    
    // Search for a query
    const hasQuery = "query" in props
    const query = hasQuery ? props.query : ""
    const by = hasQuery ? props.by : []
    const localCollection = hasQuery ? props.localCollection : undefined

    // Search for a collection
    const hasCollectionId = "collectionId" in props
    const collectionId = hasCollectionId ? props.collectionId : ""

    // Search for a collection template
    const hasCollectionTemplate = "collectionTemplate" in props
    const collectionTemplate = hasCollectionTemplate ? props.collectionTemplate : undefined
    
    const { t } = useTranslation()
    
    /** 
     * Returns a mapping of the selected filters to the query.
     * - Used when a query is specified.
    */
    const getFilterToQueryMapping = () => {
        return by.reduce((tot, f) => {
            tot[f] = query
            return tot
        }, {} as Record<FilterOption, any>)
    }

    /** 
     * Default collection template. This is used when the template is 
     * not specified. It will search for the query in the specified 
     * filters.
     * - Used when a query is specified.
    */
    const defaultCollectionTemplate: StationCollection = {
        query: {
            id: `search-${query}-by-${by}-in-${localCollection}`,
            target: localCollection ? localCollection : "SERVER",
            filters: merge(getFilterToQueryMapping(), {
                limit: 50      
            })
        }
    }
    
    /** 
     * Extracts the stations from the search request
    */
    const extractStations = () => {
        const stations = searchReq.data?.pages?.map(page => page.content).flat()
        return stations || []
    }

    /** 
     * The template used to specify all request details
    */
    const getCollection = () => {
        if (hasCollectionId) {
            const unknown = !(collectionId in stationsMap)
            if (unknown) throw new Error(t("error.collectionNotFound", { name: collectionId }))
            return stationsMap[collectionId]
        } else if (hasCollectionTemplate) {
            return collectionTemplate
        }
        return defaultCollectionTemplate
    }

    /** 
     * Fetches the collection based on an offset
    */
    const fetchPage = ({ pageParam = 0 }) => {
        return fetchCollection(getCollection() || defaultCollectionTemplate, pageParam)
    }

    /** 
     * Whether the search request has more pages to load. If the last 
     * page has content, we assume there is more content to load.
    */
    const hasNextPage = (pages?: FetchCollectionResult[]) => {
        return (pages?.[pages?.length - 1]?.content?.length || 0) > 0
    }

    /** 
     * Returns the next offset that will be passed to fetch a page
    */
    const getNextOffset = (_lastPage: FetchCollectionResult, pages: FetchCollectionResult[]) => {
        return pages.length * (getCollection()?.query?.filters?.limit || 20)
    }
    
    /** 
     * Search request
    */
    const searchReq = useInfiniteQuery({
        queryKey: ["infinite", getCollection()?.query.id],
        queryFn: fetchPage,
        getNextPageParam: getNextOffset,
        refetchOnWindowFocus: false,
        ...getCacheConfig(getCollection() || defaultCollectionTemplate)
    })

    /** 
     * The pages of the search request
    */
    const pages = searchReq.data?.pages

    /** 
     * Each page has metadata about the request. Get from
     * the first one.
    */
    const firstPage = pages?.[0]

    /** 
     * Whether there was an error in the search request
    */
    if (searchReq.error) {
        throw new Error(t("error.impossibleToLoadStations"))
    }

    return {
        req: {
            ...searchReq,
            hasNextPage: () => hasNextPage(pages),
        }, 
        data: extractStations(), 
        metadata: {
            title: firstPage?.query.id ? getTranslationMetadata(t, firstPage?.query.id).title : undefined,
            description: firstPage?.query.id ? getTranslationMetadata(t, firstPage?.query.id).description : undefined,
            query: firstPage?.query,
            isCompact: firstPage?.isCompact,
        }
    }
}