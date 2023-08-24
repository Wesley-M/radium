import * as RadioAPI from 'radio-browser-api'
import { useState } from 'react'
import { Station } from '../types/radio-browser-api.types'
import { useQuery } from 'react-query'

export const useStations = () => {
    const api = new RadioAPI.RadioBrowserApi('radium')
    
    const [ stations, setStations ] = useState<Station[]>([])
    
    // Fetch stations
    useQuery(
        'stations', 
        () => api.searchStations({ tagList: ['jazz'], limit: 10 }),
        {
            onSuccess: (res) => handleStations(res),
            onError: (err) => console.error("Not possible to retrieve stations " + err)
        }
    )

    const handleStations = (stations: Station[]) => {
        let temp = stations;
        temp = uniqueObjectsBy(temp, { by: "urlResolved", sanitize: removeExtension }) as Station[]
        setStations(temp)
    }
    
    return stations
}

const uniqueObjectsBy = (objects: Object[], options: { by: string, sanitize?: (a: any) => any }) => {
    const { by, sanitize = (a) => a } = options
    return [...new Map(
        objects.map(s => [sanitize(s[by as keyof Object]), s])
    ).values()]
}

const removeExtension = (text: string) => {
    return text.replace(/\.[^/.]+$/, "")
}