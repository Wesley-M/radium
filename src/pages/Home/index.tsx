import { useTheme } from "@design-system/theme"
import Stack from "@mui/material/Stack"
import React from "react"
import { useAllStationCollections } from "@api/index"
import { StationGrid } from "@components/station-grid"
import { Search } from "@design-system/components/inputs/search"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const { spacing } = useTheme()
    const navigate = useNavigate()
    const collections = useAllStationCollections()
    
    const isEmptyCollection = (collection: any) => {
        const content = collection.data?.content
        return content && content.length === 0
    }

    const isCompactCollection = (index: Number) => index === 0

    const handleSearch = (t: string) => {
        navigate(`/search?q=${t}`)
    }

    return (
       <Stack gap={spacing("st-xl")}>
            <Box display={{ xs: 'none', md: "flex" }}>
                <Search 
                    placeholder="Search for stations or tags" 
                    onEnter={handleSearch}
                />
            </Box>
            {collections.map((collection, index) => (
                <React.Fragment key={index}>
                    {!isEmptyCollection(collection) && (
                        <StationGrid 
                            collection={collection} 
                            isCompact={isCompactCollection(index)}
                            variant={isCompactCollection(index) ? "fill-xy" : "fit-x"}
                        />
                    )}
                </React.Fragment>
            ))}
       </Stack>   
    )
}