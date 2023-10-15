import { useSearchParams } from "react-router-dom"
import { Stack } from "@mui/material"
import { useTheme } from "@design-system/theme"
import { Tabs } from "@design-system/components/navigation/tabs"
import { useEffect, useState } from "react"
import { ChipSelect } from "@design-system/components/inputs/chip-select"
import { FilterOption, useSearch } from "../../api/remote/hooks/use-search"
import { StationGrid } from "@design-system/components/layout/station-grid"
import { TargetType } from "@api/static/station-collections"
import { useScroll } from "@design-system/hooks/use-scroll"
import { ErrorIndicator } from "@design-system/components/data-display/error-indicator"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type Tab = TargetType

export const Search = () => {
    const { theme, spacing } = useTheme()
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

    const getMaxHeight = () => {
        const playerHeight = parseInt(theme("components.player.compact.height"))
        const endY = window.innerHeight - playerHeight
        return (endY - 250)
    }

    /** 
     * Lock scroll when component mounts and unlock 
     * when unmounts
    */
    const scroll = useScroll()
    
    useEffect(() => {
        scroll?.lock()
        scroll?.scrollTo(0)
        return () => scroll?.unlock()
    }, [])

    const emptySearch = (
        <ErrorIndicator 
            icon={<SearchRoundedIcon sx={{ width: "100%", height: "100%", color: "white" }}/>}
            title={`No results were found for "${searchQuery}"`} 
            subtitle="Maybe try using some other combination of words ?"  
        />
    )
    
    return (
        <Stack gap={spacing("st-md")}>
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
            </Stack>

            {!search.req.isFetching && search.data.length === 0 ? (
                <Stack 
                    alignItems="center" 
                    justifyContent="center"
                    sx={{
                        width: "100%",
                        height: "50vh"
                    }}
                >
                    {emptySearch}
                </Stack>
            ) : (
                <StationGrid
                    data={search.data} 
                    loading={search.req.isLoading || search.req.isFetching}
                    goTo={"/" + search.metadata.query?.id}
                    cardProps={{
                        hideWhileEmpty: false
                    }}
                    smartGridProps={{
                        variant: "all",
                        itemProps: { minWidth: 300 },
                        infiniteGridProps: {
                            loadMore: search.req.fetchNextPage,
                            hasMore: search.req.hasNextPage,
                            loading: search.req.isFetching,
                            listProps: {
                                height: getMaxHeight()
                            }
                        },
                        enableInfiniteGrid: true
                    }}
                    enableSection={false}
                    isCompact={true}
                />
            )}
        </Stack>
    )
}