import { useStationCollection } from "@api/index"
import { StationCollection, TargetType } from "@api/static/station-collections"
import { AdvancedStationQuery } from "libs/radio-browser-api.types"
import merge from "lodash.merge"

export type FilterOption = keyof AdvancedStationQuery

type SearchProps = {
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
    const hasQuery = "query" in props
    const query = hasQuery ? props.query : ""
    const by = hasQuery ? props.by : []
    const localCollection = hasQuery ? props.localCollection : undefined

    const hasCollectionId = "collectionId" in props
    const collectionId = hasCollectionId ? props.collectionId : ""

    const hasCollectionTemplate = "collectionTemplate" in props
    const collectionTemplate = hasCollectionTemplate ? props.collectionTemplate : undefined
    
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
        title: `Search for "${query}"`,
        query: {
            id: ['search', by, query, localCollection],
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
     * The target of the search request
    */
    const getTarget = () => {
        if (hasCollectionId) {
            return collectionId
        } else if (hasCollectionTemplate) {
            return collectionTemplate
        }
        return defaultCollectionTemplate
    }
    
    /** 
     * Search request
    */
    const searchReq = useStationCollection(getTarget() || "")
    
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
     * Whether the search request has more pages to load
    */
    const hasNextPage = () => (pages?.[pages.length - 1]?.content?.length || 0) > 0

    return {
        req: {
            ...searchReq,
            hasNextPage,
        }, 
        data: extractStations(), 
        metadata: {
            title: firstPage?.title,
            description: firstPage?.description,
            query: firstPage?.query,
            isCompact: firstPage?.isCompact,
        }
    }
}