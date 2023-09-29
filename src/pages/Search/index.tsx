import { useSearchParams } from "react-router-dom"
import { Text } from "@design-system/components/data-display/text"

export const Search = () => {
    const [searchParams] = useSearchParams()
    console.log(searchParams.get("q"))

    return (<Text>Searching for {searchParams.get("q")}...</Text>)
}