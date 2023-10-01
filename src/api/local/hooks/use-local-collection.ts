/** 
 * @file: This hook is used to provide a collection from local storage, 
 * keeping it up to date with a react state version. This is useful for
 * components that need to access the collection in real time and cause
 * re-renderings.
*/

import { Station } from "libs/radio-browser-api.types"
import { useEffect, useState } from "react";
import { CollectionId, LocalCollection } from "@api/local/services/local-collection";

interface Options {
    limit?: number
    onStorageChange?: () => void
}

export const useLocalCollection = (collectionId: CollectionId, options?: Options) => {
    /** 
     * Build a new LocalCollection
    */
    const localCollection = new LocalCollection(collectionId, options?.limit)
    
    /** 
     * The collection is stored in localStorage and in the state
    */
    const [_, saveStateCollection] = useState<Map<CollectionId, Station>>(localCollection.getFromStorage());

    /** 
     * Save the collection in the state when it changes in localStorage
    */
    const handleStorageChange = () => {
        saveStateCollection(localCollection.getFromStorage());
        options?.onStorageChange?.();
    };

    /**
     * Listen to changes in localStorage
     */
    useEffect(() => {
        window.addEventListener(`storage-${collectionId}`, handleStorageChange);
        return () => window.removeEventListener(`storage-${collectionId}`, handleStorageChange);
    }, []);

    return localCollection
}