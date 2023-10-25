/** 
 * @file: Specifies all station collections. 
 * 
 * REMINDER: In the future, it would be best to use smarter ways of selecting 
 * content - by using a remote json or using ML to recommend content.
*/

import { AdvancedStationQuery, Station } from "libs/radio-browser-api.types"

/** 
 * The target where the query should be executed.
*/
export type TargetType = "SERVER" | "RECENTLY_PLAYED" | "LIBRARY"

/** 
 * Type of query to be executed.
 * 
 * - RANDOM: Returns random stations
 * - LOCAL_COLLECTION: Returns a local collection
 * - TOP: Returns the most popular stations with a specific tag
 * - MANUAL: Returns a list of stations specified by ids
*/
export type QueryType = "RANDOM" | "LOCAL_COLLECTION" | "TOP" | "MANUAL"

/** 
 * A station id
*/
export type StationId = string

/** 
 * It is a description of a set of stations. We use both a 
 * query and a content to decide which stations should be retrieved.
*/
export interface StationCollection {
    /** Used to specify the request to be executed */
    query: {
        /** Query's ID */
        id: string,
        /** Whether the request is for a local collection (LOCAL) or a remote resource (SERVER) */
        target?: TargetType,
        /** The type of query to be executed */
        type?: QueryType,
        /** Standard filters for the Radio Browser API */
        filters?: AdvancedStationQuery & { ids?: [string, StationId][] }
    }
    /** Used to specify the content of the collection */
    content?: Station[]
    /** Whether the collection should be displayed in a compact way */
    isCompact?: boolean
    /** Number of items loading */
    loadingItems?: number
}

export const stationsMap: Record<string, StationCollection> = {
    "handpicked": {
        "query": {
            "id": "handpicked",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    ["funky_radio", "439fafd7-b35b-4a6c-b22f-d9e4fbd9dfd4"],
                    ["bossa_beyond", "2553f86a-83db-4f3f-acee-e91dfd026a54"],
                    ["somafm_the_trip", "960eb52f-0601-11e8-ae97-52543be04c81"],
                    ["hunter_fm_80s", "fb5a24f9-ef55-4f05-8217-35a0293d7d47"],
                    ["nightride_fm_ebsm", "6d6cce52-c2e6-4615-8251-27f5ce62e788"],
                    ["somafm_boot_liquor", "ffe33802-6417-11e9-a622-52543be04c81"],
                    ["rock_fm", "961c96ef-0601-11e8-ae97-52543be04c81"],
                    ["pirate_fm", "8306414a-6122-4641-bec6-43ba97c44a2c"],
                    ["rouge_fm_latino", "9632ae87-0601-11e8-ae97-52543be04c81"],
                    ["rouge_fm_suisse", "9625c2cb-0601-11e8-ae97-52543be04c81"],
                    ["outlaw_country", "b011d22e-e725-11e8-a9cc-52543be04c81"],
                ]
            }
        },
        "loadingItems": 20
    },
    "relaxation": {
        "query": {
            "id": "relaxation",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    ["house_fusion", "b6d47672-aa01-4363-bd26-32f0e8d9570e"],
                    ["soma_fm_vapowaves", "0e60a2b4-99de-4507-9931-a23449bcae1d"],
                    ["hunter_fm_lofi", "5c35c578-6c34-11ea-b1cf-52543be04c81"],
                    ["yoga_sounds", "0696cc0c-114f-490c-9418-55f1593ddee1"],
                    ["epic_classical", "1665ae4c-74dc-44f0-bd0a-7a0d0291aa8c"],
                    ["ambient_modern", "b1236340-5ec2-4b17-a9e2-81413b7722ed"],
                    ["chill", "9618f5ba-0601-11e8-ae97-52543be04c81"]
                ]
            }
        },
        "isCompact": true,
        "loadingItems": 6
    },
    "news": {
        "query": {
            "id": "news",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    ["brasil_de_fato", "42df389c-af7d-11e8-afe1-52543be04c81"],
                    ["cbn_belo_horizonte", "d93a1368-9156-44de-a895-05b25605263b"],
                    ["jovem_pan_natal", "07604a13-094e-4eb1-83c3-0adf5d77a8a9"],
                    ["radio_clube_de_lages", "7bd28cbd-7b13-484e-942d-b348fd4ec3a9"],
                    ["bbc_world_service", "98adecf7-2683-4408-9be7-02d3f9098eb8"],
                    ["cnn_international", "8b43d8b2-910d-4e10-ac9f-1aa8aabc5fb4"],
                    ["msnbc", "8490339f-3207-45f4-bbc9-60155e95972f"],
                    ["bloomber_radio", "43e02577-2635-11e9-a80b-52543be04c81"],
                    ["voice_of_america", "7ebbe310-c33a-436b-9f90-6c5b282a5ab4"],
                    ["abc_news", "506dd5ea-1f85-4ee6-9d94-b1b839f8b8f5"],
                    ["times_radio", "d1b0b82d-aa27-49e5-a98e-716ceff7e2f7"]
                ]
            }
        },
        "loadingItems": 20
    },
    "introducing_nightride": {
        "query": {
            "id": "introducing_nightride",
            "target": "SERVER",
            "type": "TOP",
            "filters": {
                "name": "Nightride",
                "limit": 20
            }
        },
        "loadingItems": 20
    },
    "introducing_0n": {
        "query": {
            "id": "introducing_0n",
            "target": "SERVER",
            "type": "TOP",
            "filters": {
                "name": "- 0 N -",
                "limit": 20
            }
        },
        "loadingItems": 20
    },
    "introducing_radio_art": {
        "query": {
            "id": "introducing_radio_art",
            "target": "SERVER",
            "type": "TOP",
            "filters": {
                "name": "Radio Art",
                "limit": 20
            }
        },
        "loadingItems": 20
    },
    "recently_played": {
        "query": {
            "id": "recently_played",
            "target": "RECENTLY_PLAYED",
            "type": "LOCAL_COLLECTION",
            "filters": {
                "reverse": true
            }
        },
        "loadingItems": 20
    },
    "library": {
        "query": {
            "id": "library",
            "target": "LIBRARY",
            "type": "LOCAL_COLLECTION",
        },
        "loadingItems": 20
    }
}

export const stationsArr: StationCollection[] = Object.values(stationsMap)