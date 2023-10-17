import { useTheme } from "@design-system/theme"
import Stack from "@mui/material/Stack"
import React from "react"
import { useAllStationCollections } from "@api/index"
import { StationGrid } from "@design-system/components/layout/station-grid"
import { stationsArr } from "@api/static/station-collections"
import { useTranslation } from "react-i18next"

export const Home = () => {
    const { spacing } = useTheme()
    const { t } = useTranslation()
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
                            data={collection.data?.content || []}
                            error={collection.error as string}
                            goTo={collection.data?.query?.id.toString() || "/"}
                            loading={collection.isFetching}
                            loadingItems={stationsArr[index].loadingItems}
                            isCompact={stationsArr[index].isCompact}
                            sectionProps={{
                                title: t(`assets.stations.${collection.data?.query.id}.title`),
                                subtitle: t(`assets.stations.${collection.data?.query.id}.description`),
                            }}
                            smartGridProps={{
                                variant: stationsArr[index].isCompact ? "rect" : "oneline",
                                itemProps: { gap: "sm" }
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
       </Stack>   
    )
}