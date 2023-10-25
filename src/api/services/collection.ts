import { StationCollection } from "@api/static/station-collections"
import { LocalCollection } from "@api/services/local-collection"
import { normalizeStations } from "@api/remote/utils/normalize-stations"
import * as RadioAPI from 'radio-browser-api'
import { Station } from "libs/radio-browser-api.types"

const api = new RadioAPI.RadioBrowserApi('radium')

const SERVER_CACHE_TIME = 1000 * 60 * 60 * 24
const SERVER_STALE_TIME = 1000 * 60 * 60 * 24

export interface FetchCollectionResult extends StationCollection {
    content: Station[]
}

const fetchCollection = async (collection: StationCollection, offset = 0): Promise<FetchCollectionResult> => {
    const stations = await fetchStations(collection, offset)
    
    return {
        ...collection,
        content: normalizeStations(stations)
    }
}

const fetchStations = async (collection: StationCollection, offset: number) => {
    switch(collection.query.target) {
        case "SERVER":
            return await fetchServerStations(api, collection.query, offset)
        default:
            return await fetchClientStations(collection.query, offset)
    }
}

const fetchClientStations = async (query: any, offset: number) => {
    const collectionId = query.target.toLowerCase()
    const collection = new LocalCollection(collectionId)
    return collection.list({...query.filters, offset})
}

const fetchServerStations = async (api: any, query: any, offset: number) => {
    switch (query.type) {
        case "RANDOM": 
            return await api.getAllStations({...query.filters, order: "random", offset}, {}, true)
        case "TOP":
            return await api.searchStations({...query.filters, order: "clickCount", offset}, {}, true)
        case "MANUAL":
            return await fetchStationsById(query.filters.ids, offset)
        default:
            return await api.searchStations({...query.filters, offset}, {}, true)
    }
}

const fetchStationsById = async (ids: [string, string][], offset = 0) => {
    if (offset > 0) return []
    const onlyIds = ids.map(id => id[1])
    const stations = await api.getStationsById(onlyIds)
    return sortStationsByIdOrder(onlyIds, stations)
}

function sortStationsByIdOrder(ids: string[], stations: Station[]) {
    return stations.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
}

const getCacheConfig = (collection: StationCollection) => {
    if (collection.query.target !== "SERVER") {
        return { staleTime: 0 }
    }
    return {
        cacheTime: SERVER_CACHE_TIME,
        staleTime: SERVER_STALE_TIME
    }
}

export {
    fetchCollection,
    getCacheConfig
}