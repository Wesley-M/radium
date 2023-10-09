import { useSearchParams } from "react-router-dom"
import { Stack } from "@mui/material"
import { useTheme } from "@design-system/theme"
import { Tabs } from "@design-system/components/navigation/tabs"
import { useState } from "react"
import { ChipSelect } from "@design-system/components/inputs/chip-select"
import { FilterOption, useSearch } from "../../shared/hooks/use-search"
import { StationGrid } from "@components/station-grid"
import { TargetType } from "@api/static/station-collections"

type Tab = TargetType

export const Search = () => {
    const { spacing } = useTheme()
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("q") || ""

    const [tab, setTab] = useState<Tab>("SERVER")
    const [filters, setFilters] = useState<FilterOption[]>(["name"])

    const isLocalSearch = tab !== "SERVER"

    const search = useSearch({
        query: searchQuery,
        by: filters,
        localCollection: isLocalSearch ? tab : undefined
    })
    
    return (
        <Stack gap={spacing("st-sm")}>
            <Tabs
                items={[
                    {label: "All", value: "SERVER"},
                    {label: "Your library", value: "LIBRARY"},
                    {label: "Recently played", value: "RECENTLY_PLAYED"},
                ]}
                onChange={(v: string) => setTab(v as Tab)}
            />

            <ChipSelect 
                items={[
                    {label: "Name", value: "name"},
                    {label: "Tag", value: "tagList"},
                    {label: "Country Code", value: "countryCode"},
                    {label: "Language", value: "language"},
                ]}
                onChange={(v: string[]) => setFilters(v as FilterOption[])}
                multiple
                atLeastOne
            />

            <StationGrid
                data={search.data} 
                loading={search.req.isLoading || search.req.isFetching}
                goTo={"/" + search.metadata.query?.id}
                isCompact={true}
                enableTitleSection={false}
                smartGridProps={{
                    variant: "fit-xy",
                    itemProps: { minWidth: 300 },
                    infiniteGridProps: {
                        loadMore: search.req.fetchNextPage,
                        hasMore: search.req.hasNextPage,
                        loading: search.req.isFetching,
                        listProps: {
                            height: 450
                        }
                    },
                    enableInfiniteGrid: true
                }}
            />
        </Stack>
    )
}