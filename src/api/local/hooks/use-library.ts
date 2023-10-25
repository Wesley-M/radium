/** 
 * @file: Manages the user's personal station library
*/

import { useLocalCollection } from "@api/local/hooks/use-local-collection";
import { useQueryClient } from "@tanstack/react-query";

export const useLibrary = () => {
    const queryClient = useQueryClient()
    
    return useLocalCollection('library', {
        onStorageChange: () => {
            queryClient.invalidateQueries({ queryKey: ["all", "library"] })
        }
    })
}