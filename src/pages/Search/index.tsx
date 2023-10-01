import { useSearchParams } from "react-router-dom"
import { StationCollection } from "@api/static/station-collections"
import { useStationCollection } from "@api/remote/hooks/use-station-collection"
import { StationGrid } from "@components/station-grid"
import { Stack } from "@mui/material"
import { useTheme } from "@design-system/theme"

export const Search = () => {
    const { spacing } = useTheme()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("q") || ""

    const collectionByName: StationCollection = {
        title: `Searching for "${searchParams.get("q")}" by name`,
        query: {
            id: `search_by_name_${searchParams.get("q")}`,
            target: "SERVER",
            filters: {
                name: searchQuery,
                limit: 20
            }
        }
    }

    const collectionByTag: StationCollection = {
        title: `Searching for "${searchParams.get("q")}" by tag`,
        query: {
            id: `search_by_tag_${searchParams.get("q")}`,
            target: "SERVER",
            filters: {
                tag: searchQuery,
                limit: 20
            }
        }
    }

    const collectionReqByName = useStationCollection(collectionByName)
    const collectionReqByTag = useStationCollection(collectionByTag)

    return (
        <Stack gap={spacing("st-md")}>
            <StationGrid 
                collection={collectionReqByName} 
                isCompact={false}
                goBack="/"
                variant="fit-xy"
            />
            <StationGrid 
                collection={collectionReqByTag} 
                isCompact={false}
                goBack="/"
                variant="fit-xy"
            />
        </Stack>
    )
}