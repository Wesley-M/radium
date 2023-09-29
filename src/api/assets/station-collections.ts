/** 
 * @file: Specifies all station collections. 
 * 
 * REMINDER: In the future, it would be best to use smarter ways of selecting 
 * content - by using a remote json or using ML to recommend content.
*/

import { AdvancedStationQuery } from "libs/radio-browser-api.types"

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

export interface StationCollection {
    title: string
    description: string
    query: {
        name: string,
        target: TargetType,
        type: QueryType,
        filters?: AdvancedStationQuery
    }
}

export const stationsMap: Record<string, StationCollection> = {
    "feeling_lucky": {
        "title": "Feeling lucky",
        "description": "Here are some random stations",
        "query": {
            "name": "feeling_lucky",
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
            "name": "recently_played",
            "target": "CLIENT",
            "type": "RECENTLY_PLAYED"
        }
    },
    "top_stations": {
        "title": "Top stations",
        "description": "The most popular stations",
        "query": {
            "name": "top_stations",
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
            "name": "rock_stations",
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
            "name": "workout_stations",
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
