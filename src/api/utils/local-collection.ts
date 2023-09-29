/** 
 * @file: It manages a local collection of stations that 
 * is stored in localStorage
*/

import { Station } from "libs/radio-browser-api.types"

export class LocalCollection {
    collectionId: string
    limit?: number

    constructor(collectionId: string, limit?: number) {
        this.collectionId = collectionId
        this.limit = limit
    }

    getFromStorage(): Map<string, Station> {
        const tempCollection = localStorage.getItem(this.collectionId)
        return tempCollection ? new Map(JSON.parse(tempCollection || '')) : new Map()
    }

    isEmpty(): boolean {
        return this.getFromStorage().size === 0
    }

    save(collection: Map<string, Station>): Map<string, Station> {
        localStorage.setItem(this.collectionId, JSON.stringify([...collection]))
        window.dispatchEvent(new Event(`storage-${this.collectionId}`));
        return this.getFromStorage()
    }
    
    add(station?: Station | null): Map<string, Station> {
        if (!station) return this.getFromStorage()
        
        // Remove the item
        let collection = this.remove(station.id)

        // Add the item to the collection
        collection.set(station.id, station)

        // Remove the first inserted item, if the limit is reached
        collection = this.ensureLimitRestriction(collection)
        return this.save(collection)
    }

    ensureLimitRestriction(collection: Map<string, Station>): Map<string, Station> {
        if (this.limit && collection.size > this.limit) {
            collection.delete(collection.keys().next().value)
            return this.save(collection)
        }
        return collection
    }

    remove(id: string): Map<string, Station> {
        if (!this.has(id)) return this.getFromStorage()
        const collection = this.getFromStorage()
        collection.delete(id)
        return this.save(collection)
    }

    toggle(station?: Station | null): Map<string, Station> {
        if (!station) return this.getFromStorage()
        if (!this.has(station.id)) {
            return this.add(station)
        } else {
            return this.remove(station.id)
        }
    }

    list(reverse = false): Station[] {
        const items = [...this.getFromStorage().values()]
        if (reverse) return items.reverse()
        return items
    }

    has(id: string): boolean {
        return this.getFromStorage().has(id)
    }
}