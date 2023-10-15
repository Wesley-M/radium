import { useParams } from "react-router-dom";
import { StationGrid } from "@design-system/components/layout/station-grid";
import { useSearch } from "@api/remote/hooks/use-search";
import { useEffect } from "react";
import { useScroll } from "@design-system/hooks/use-scroll";

export const ShowAll = () => {
    const { collectionId } = useParams()
    
    const scroll = useScroll()
    const collection = useSearch({ collectionId: collectionId || "" })
    
    useEffect(() => {
        scroll?.scrollTo(0)
    }, [])

    return (
        <StationGrid
            sectionProps={{
                title: collection.metadata.title,
                subtitle: collection.metadata.description,
                goBack: "/"
            }}
            data={collection.data} 
            loading={collection.req.isLoading}
            isCompact={true}
            goTo={"/" + collection.metadata.query?.id}
        />
    )
}