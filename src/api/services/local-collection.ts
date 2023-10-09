/** 
 * @file: It manages a local collection of stations that 
 * is stored in localStorage
*/

import { AdvancedStationQuery, Station } from "libs/radio-browser-api.types"
import Fuse from "fuse.js"

export type CollectionId = string

export type CollectionMap = Map<CollectionId, Station>

export class LocalCollection {
    collectionId: CollectionId
    limit?: number

    constructor(collectionId: CollectionId, limit?: number) {
        this.collectionId = collectionId
        this.limit = limit
    }

    getFromStorage(): CollectionMap {
        const tempCollection = localStorage.getItem(this.collectionId)
        return tempCollection ? new Map(JSON.parse(tempCollection || '')) : new Map()
    }

    isEmpty(): boolean {
        return this.getFromStorage().size === 0
    }
    
    add(station?: Station | null): CollectionMap {
        if (!station) return this.getFromStorage()
                
        // Remove the item
        let collection = this.remove(station.id)

        // Add the item to the collection
        collection.set(station.id, station)

        // Remove the first inserted item, if the limit is reached
        collection = this.#ensureLimitRestriction(collection)
        
        return this.#save(collection)
    }

    remove(id: CollectionId): CollectionMap {
        if (!this.has(id)) return this.getFromStorage()
        const collection = this.getFromStorage()
        collection.delete(id)
        return this.#save(collection)
    }

    toggle(station?: Station | null): CollectionMap {
        if (!station) return this.getFromStorage()
        if (!this.has(station.id)) {
            return this.add(station)
        } else {
            return this.remove(station.id)
        }
    }

    list(filters?: AdvancedStationQuery): Station[] {
        const items = [...this.getFromStorage().values()]
        if (filters) return this.#applyFilters(items, filters) 
        return items
    }

    has(id: CollectionId): boolean {
        return this.getFromStorage().has(id)
    }

    #applyFilters(items: Station[], filters: AdvancedStationQuery): Station[] {
        const offset = filters.offset || 0
        const limit = filters.limit || items.length
        let result = this.#search(items, filters)

        // Apply reverse order
        if (filters.reverse) result = result.reverse()

        return result.slice(offset, offset + limit)
    }

    #search(items: Station[], filters: AdvancedStationQuery): Station[] {
        const newFilters = this.#replaceKeysBy(filters, { 
            tagList: "tags" 
        })
        
        const fuzzySearcher = new Fuse(items, {
            keys: this.#getSupportedFilterKeys(newFilters),
            threshold: 0.3
        })

        // If there are no supported filters, return all items
        const supportedFilters = this.#getSupportedFilters(newFilters)
        if (supportedFilters.length === 0) return items

        return fuzzySearcher.search({
            $and: supportedFilters
        }).map(result => result.item)
    }

    #replaceKeysBy(filters: AdvancedStationQuery, by: Record<string, string>) {
        return Object.keys(filters).reduce((acc, key) => {
            const newKey = by[key] || key;
            acc[newKey] = filters[key as keyof AdvancedStationQuery];
            return acc;
        }, {} as Record<string, any>);
    }

    #getSupportedFilters(filters: AdvancedStationQuery) {
        const supportedFilterKeys = this.#getSupportedFilterKeys(filters)
        return supportedFilterKeys.reduce((tot, key) => {
            const filter = filters[key]
            if (filter) tot.push({[key]: filter.toString() })
            return tot
        }, [] as ({ [x: string]: string})[])
    }

    #getSupportedFilterKeys(filters: AdvancedStationQuery): (keyof AdvancedStationQuery)[] {
        const supportedFilterKeys = [
            "name", 
            "country", 
            "state", 
            "language",
            "tags"
        ]

        return Object.keys(filters).filter((f) => {
            return supportedFilterKeys.includes(f as keyof AdvancedStationQuery)
        }) as (keyof AdvancedStationQuery)[]
    }

    #ensureLimitRestriction(collection: CollectionMap): CollectionMap {
        if (this.limit && collection.size > this.limit) {
            collection.delete(collection.keys().next().value)
            return this.#save(collection)
        }
        return collection
    }

    #save(collection: CollectionMap): CollectionMap {
        localStorage.setItem(this.collectionId, JSON.stringify([...collection]))
        window.dispatchEvent(new Event(`storage-${this.collectionId}`));
        return this.getFromStorage()
    }
}
