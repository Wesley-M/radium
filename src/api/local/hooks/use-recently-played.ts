/** 
 * @file: Manages the user's recently played stations.
*/

import { useLocalCollection } from "@api/local/hooks/use-local-collection";
import { useQueryClient } from "@tanstack/react-query";

export const useRecentlyPlayed = () => {
    const queryClient = useQueryClient()

    return useLocalCollection('recently_played', {
        onStorageChange: () => {
            queryClient.invalidateQueries({ queryKey: ["all", "recently_played"] })
        }
    })
}