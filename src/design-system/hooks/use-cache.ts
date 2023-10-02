export const useCache = (cacheId: string) => {
    const load = () => {
        const tempCollection = sessionStorage.getItem(cacheId)
        return tempCollection ? new Map(JSON.parse(tempCollection || '')) : new Map()
    }

    const get = (key: string) => {
        const collection = load()
        return collection.get(key)
    }

    const has = (key: string) => {
        const collection = load()
        return collection.has(key)
    }

    const save = (collection: Map<string, string>) => {
        sessionStorage.setItem(cacheId, JSON.stringify([...collection]))
    }

    const update = (key: string, value: string) => {
        const collection = load()
        collection.set(key, value)
        save(collection)
    }

    return { get, has, update }
}