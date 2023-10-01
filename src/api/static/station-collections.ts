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
*/
type QueryType = "RANDOM" | "RECENTLY_PLAYED" | "GLOBAL_TOP" | "TOP"

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
        filters?: AdvancedStationQuery
    }
    content?: Station[] | StationId[]
}

export const stationsMap: Record<string, StationCollection> = {
    "feeling_lucky": {
        "title": "Feeling lucky",
        "description": "Here are some random stations",
        "query": {
            "id": "feeling_lucky",
            "target": "SERVER",
            "type": "RANDOM",
            "filters": {
                "limit": 3,
                "language": "english"
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
    },
    "top_stations": {
        "title": "Top stations",
        "description": "The most popular stations",
        "query": {
            "id": "top_stations",
            "target": "SERVER",
            "type": "GLOBAL_TOP",
            "filters": {
                "limit": 50,
                "language": "english"
            }
        }
    },
    "rock_stations": {
        "title": "Let's Rock it!",
        "description": "Popular Rock Stations",
        "query": {
            "id": "rock_stations",
            "target": "SERVER",
            "type": "TOP",
            "filters": {
                "tag": "rock",
                "language": "english",
                "limit": 50,
            }
        }
    },
    "workout_stations": {
        "title": "Working it out!",
        "description": "Popular Workout Stations",
        "query": {
            "id": "workout_stations",
            "target": "SERVER",
            "type": "TOP",
            "filters": {
                "tag": "workout",
                "limit": 50,
            }
        }
    }
}

export const stationsArr: StationCollection[] = Object.values(stationsMap)
