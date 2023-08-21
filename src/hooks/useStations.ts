import * as RadioAPI from 'radio-browser-api'
import { useEffect, useState } from 'react'
import { Station } from '../types/radio-browser-api.types'

export const useStations = () => {
    const api = new RadioAPI.RadioBrowserApi('radium')
    
    const [ stations, setStations ] = useState<Station[]>([])
    
    const fetchStations = async () => {
        const fetched = await api.searchStations({ tagList: ['jazz'], limit: 10 })
        handleStations(fetched)
    }

    const handleStations = (stations: Station[]) => {
        let temp = stations;
        temp = uniqueObjectsBy(temp, { by: "urlResolved", sanitize: removeExtension }) as Station[]
        setStations(temp)
    }
    
    // Fetch
    useEffect(() => { fetchStations() }, [])

    return stations
}

const uniqueObjectsBy = (objects: Object[], options: { by: string, sanitize?: (a: any) => any }) => {
    const {
        by, 
        sanitize = (a) => a
    } = options
    
    return [...new Map(
        objects.map(s => [sanitize(s[by as keyof Object]), s])
    ).values()]
}

const removeExtension = (text: string) => {
    return text.replace(/\.[^/.]+$/, "")
}