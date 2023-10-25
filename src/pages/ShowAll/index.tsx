import { useParams } from "react-router-dom";
import { StationGrid } from "@components/station-grid";
import { SearchProps, useSearch } from "@api/remote/hooks/use-search";
import { useEffect, useState } from "react";
import { useScroll } from "@design-system/hooks/use-scroll";
import { useAvailableHeight } from "@design-system/hooks";

interface ShowAllProps {
    /** Whether it is a manual collection or not */ 
    mode?: "manual" | "auto" 
}

export const ShowAll = (props: ShowAllProps) => {
    const { mode = "manual" } = props

    const { id, name } = useParams()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")

    const showAllMaxHeight = useAvailableHeight(200)

    /**
     * Get criteria that will be used to search for a collection of
     * stations
    */
    const getSearchCriteria = () => {
        const manualCriteria = { collectionId: id || "" } as SearchProps
        const autoCriteria = { query: name || "", by: ["name"] } as SearchProps
        return mode === "manual" ? manualCriteria : autoCriteria
    }

    const search = useSearch(getSearchCriteria())
    
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


    /**
     * Set title and subtitle when search metadata changes
    */
    useEffect(() => {
        if (mode === "auto") {
            setTitle(`#${name}`)
            return
        }

        const searchTitle = search.metadata.title
        const searchSubtitle = search.metadata.description

        if (searchTitle) setTitle(searchTitle)
        if (searchSubtitle) setSubtitle(searchSubtitle)
    }, [JSON.stringify(search.metadata)])

    return (
        <StationGrid
            data={search.data} 
            loading={search.req.isFetching}
            goTo={"/" + search.metadata.query?.id}
            cardProps={{
                hideWhileEmpty: false
            }}
            sectionProps={{
                title,
                subtitle,
                goBack: "/",
                disableLoading: Boolean(title)
            }}
            smartGridProps={{
                variant: "all",
                itemProps: { minWidth: 300 },
                infiniteGridProps: {
                    loadMore: search.req.fetchNextPage,
                    hasMore: search.req.hasNextPage,
                    loading: search.req.isFetching,
                    listProps: {
                        height: showAllMaxHeight
                    }
                },
                enableInfiniteGrid: true
            }}
            isCompact={true}
        />
    )
}