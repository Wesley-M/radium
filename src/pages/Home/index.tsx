import { useTheme } from "@design-system/theme"
import Stack from "@mui/material/Stack"
import React from "react"
import { useAllStationCollections } from "@api/index"
import { StationGrid } from "@components/station-grid"

export const Home = () => {
    const { spacing } = useTheme()
    const collections = useAllStationCollections()
    
    const isEmptyCollection = (collection: any) => {
        const content = collection.data?.content
        return content && content.length === 0
    }

    return (
       <Stack gap={spacing("st-xl")}>
            {collections.map((collection, index) => (
                <React.Fragment key={index}>
                    {!isEmptyCollection(collection) && (
                        <StationGrid 
                            collection={collection} 
                            isCompact={collection.data?.isCompact}
                            variant={collection.data?.isCompact ? "fill-xy" : "fit-x"}
                        />
                    )}
                </React.Fragment>
            ))}
       </Stack>   
    )
}