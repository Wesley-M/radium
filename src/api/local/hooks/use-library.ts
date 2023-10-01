/** 
 * @file: Manages the user's personal station library
*/

import { useLocalCollection } from "@api/local/hooks/use-local-collection";

export const useLibrary = () => {
    return useLocalCollection('library')
}