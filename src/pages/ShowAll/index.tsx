import { useParams } from "react-router-dom";
import { StationGrid } from "@components/station-grid";
import { useSearch } from "@hooks/use-search";

export const ShowAll = () => {
    const { collectionId } = useParams()
    
    const collection = useSearch({ collectionId: collectionId || "" })
    
    return (
        <StationGrid
            title={collection.metadata.title}
            subtitle={collection.metadata.description}
            data={collection.data} 
            loading={collection.req.isLoading}
            isCompact={true}
            goTo={"/" + collection.metadata.query?.id}
            goBack="/"
        />
    )
}