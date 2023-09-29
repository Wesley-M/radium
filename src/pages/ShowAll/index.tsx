import { useStationCollection } from "@api/hooks/use-station-collection";
import { useParams } from "react-router-dom";
import { StationGrid } from "@components/station-grid";

export const ShowAll = () => {
    const { collectionId } = useParams()
    const collection = useStationCollection(collectionId ?? "")
    
    return (
        <StationGrid 
            collection={collection} 
            isCompact={false}
            goBack="/"
        />
    )
}