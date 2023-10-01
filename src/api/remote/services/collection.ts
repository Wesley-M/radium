import { StationCollection } from "@api/static/station-collections"
import { LocalCollection } from "@api/local/services/local-collection"
import { normalizeStations } from "@api/remote/utils/normalize-stations"
import * as RadioAPI from 'radio-browser-api'

const api = new RadioAPI.RadioBrowserApi('radium')

const SERVER_CACHE_TIME = 1000 * 60 * 60 * 24
const SERVER_STALE_TIME = 1000 * 60 * 60 * 24

const fetchCollection = async (collection: StationCollection) => {
    const stations = await fetchStations(collection)
        
    return {
        ...collection,
        content: normalizeStations(stations)
    }
}

const fetchStations = async (collection: StationCollection) => {
    switch(collection.query.target) {
        case "CLIENT":
            return await fetchClientStations(collection.query.id)
        case "SERVER":
            return await fetchServerStations(api, collection.query)
    }
}

const fetchClientStations = async (collectionId: string) => {
    const collection = new LocalCollection(collectionId)
    return collection.list(true)
}

const fetchServerStations = async (api: any, query: any) => {
    switch (query.type) {
        case "RANDOM": 
            return await api.getAllStations({...query.filters, order: "random"}, {}, true)
        case "GLOBAL_TOP":
            return await api.getAllStations({...query.filters, order: "clickCount"}, {}, true)
        case "TOP":
            return await api.searchStations({...query.filters, order: "clickCount"})
        default:
            return await api.searchStations(query.filters)
    }
}

const getCacheConfig = (collection: StationCollection) => {
    if (collection.query.target === "CLIENT") {
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