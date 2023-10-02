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
type TargetType = "CLIENT" | "SERVER"

/** 
 * Type of query to be executed.
 * 
 * - RANDOM: Returns random stations
 * - RECENTLY_PLAYED: Returns recently played stations
 * - GLOBAL_TOP: Returns the most popular stations
 * - TOP: Returns the most popular stations with a specific tag
 * - MANUAL: Returns a list of stations specified by ids
*/
type QueryType = "RANDOM" | "RECENTLY_PLAYED" | "GLOBAL_TOP" | "TOP" | "MANUAL"

/** 
 * A station id
*/
export type StationId = string

/** 
 * It is a description of a set of stations. We use both a 
 * query and a content to decide which stations should be retrieved.
*/
export interface StationCollection {
    /** The title of the collection */
    title: string
    /** A user-friendly and short description for a collection */
    description?: string
    /** Used to specify the request to be executed */
    query: {
        /** Query's ID */
        id: string,
        /** Whether the request is for a local collection (LOCAL) or a remote resource (SERVER) */
        target?: TargetType,
        /** The type of query to be executed */
        type?: QueryType,
        /** Standard filters for the Radio Browser API */
        filters?: AdvancedStationQuery & { ids?: StationId[] }
    }
    /** Used to specify the content of the collection */
    content?: Station[]
    /** Whether the collection should be displayed in a compact way */
    isCompact?: boolean
}

export const stationsMap: Record<string, StationCollection> = {
    "handpicked": {
        "title": "Featured",
        "description": "Handpicked stations for you to enjoy",
        "query": {
            "id": "handpicked",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    "fb5a24f9-ef55-4f05-8217-35a0293d7d47",
                    "17c8d579-662c-401e-8a28-fdf32d79576f",
                    "b011d22e-e725-11e8-a9cc-52543be04c81",
                    "6d6cce52-c2e6-4615-8251-27f5ce62e788",
                    "86b20e25-6719-4017-9592-e7f92de95dea",
                    "961c96ef-0601-11e8-ae97-52543be04c81",
                    "439fafd7-b35b-4a6c-b22f-d9e4fbd9dfd4"
                ]
            }
        },
    },
    "relaxation": {
        "title": "Relaxation",
        "description": "Take a break and listen",
        "query": {
            "id": "relaxation",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    "9618f5ba-0601-11e8-ae97-52543be04c81",
                    "5c35c578-6c34-11ea-b1cf-52543be04c81",
                    "b826a9d2-c08a-4a7d-9879-057eda0ccfb2",
                    "389011a1-3a96-11e9-9b4e-52543be04c81",
                    "1665ae4c-74dc-44f0-bd0a-7a0d0291aa8c",
                    "b6d47672-aa01-4363-bd26-32f0e8d9570e"
                ]
            }
        },
        "isCompact": true
    },
    "news": {
        "title": "News",
        "description": "To keep you well informed",
        "query": {
            "id": "news",
            "target": "SERVER",
            "type": "MANUAL",
            "filters": {
                "ids": [
                    "98adecf7-2683-4408-9be7-02d3f9098eb8",
                    "8b43d8b2-910d-4e10-ac9f-1aa8aabc5fb4",
                    "8490339f-3207-45f4-bbc9-60155e95972f",
                    "43e02577-2635-11e9-a80b-52543be04c81",
                    "7ebbe310-c33a-436b-9f90-6c5b282a5ab4",
                    "506dd5ea-1f85-4ee6-9d94-b1b839f8b8f5"
                ]
            }
        }
    },
    "recently_played": {
        "title": "Recently played",
        "description": "Pick up were you left off",
        "query": {
            "id": "recently_played",
            "target": "CLIENT",
            "type": "RECENTLY_PLAYED"
        }
    }
}

export const stationsArr: StationCollection[] = Object.values(stationsMap)


// "top_stations": {
//     "title": "Top stations",
//     "description": "The most popular stations",
//     "query": {
//         "id": "top_stations",
//         "target": "SERVER",
//         "type": "GLOBAL_TOP",
//         "filters": {
//             "limit": 50,
//             "language": "english"
//         }
//     }
// },
// "rock_stations": {
//     "title": "Let's Rock it!",
//     "description": "Popular Rock Stations",
//     "query": {
//         "id": "rock_stations",
//         "target": "SERVER",
//         "type": "TOP",
//         "filters": {
//             "tag": "rock",
//             "language": "english",
//             "limit": 50,
//         }
//     }
// },
// "workout_stations": {
//     "title": "Working it out!",
//     "description": "Popular Workout Stations",
//     "query": {
//         "id": "workout_stations",
//         "target": "SERVER",
//         "type": "TOP",
//         "filters": {
//             "tag": "workout",
//             "limit": 50,
//         }
//     }
// }