import { useStationCollection } from "@api/remote/hooks/use-station-collection";
import { useParams } from "react-router-dom";
import { StationGrid } from "@components/station-grid";

export const ShowAll = () => {
    const { collectionId } = useParams()
    const collectionReq = useStationCollection(collectionId ?? "")
    
    return (
        <StationGrid 
            collection={collectionReq} 
            isCompact={true}
            goBack="/"
        />
    )
}