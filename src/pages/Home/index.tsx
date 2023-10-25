import { useTheme } from "@design-system/theme"
import Stack from "@mui/material/Stack"
import React from "react"
import { StationGrid } from "@components/station-grid"
import { stationsArr } from "@api/static/station-collections"
import { useTranslation } from "react-i18next"
import { HeroSection } from "./components/hero-section"
import { useStaticSearch } from "@api/remote/hooks/use-static-search"
import { getTranslationMetadata } from "@api/remote/utils/translation-metadata"

export const Home = () => {
    const { spacing } = useTheme()
    const collections = useStaticSearch()
    
    return (
        <Stack gap={spacing("st-md")}>
            <HeroSection/>
            <Stack gap={spacing("st-xl")}>
                {collections.map((collection, index) => (
                    <React.Fragment key={index}>
                        <StationCollection
                            collection={collection}
                            index={index}
                        />
                    </React.Fragment>
                ))}
            </Stack>  
        </Stack> 
    )
}

interface StationCollectionProps {
    collection: any
    index: number
}

const StationCollection = (props: StationCollectionProps) => {
    const { collection, index } = props

    const { t } = useTranslation()

    const isEditorsChoice = (collection: any) => {
        return Boolean(collection.data?.query.filters?.ids)
    }

    const isEmptyCollection = (collection: any) => {
        const content = collection.data?.content
        return content && content.length === 0
    }

    if (isEmptyCollection(collection)) return null

    const collectionId = collection.data?.query?.id.toString()

    return (
        <StationGrid 
            data={collection.data?.content || []}
            error={collection.error as string}
            goTo={collectionId ? `/collections/${collectionId}` : "/"}
            loading={collection.isFetching}
            loadingItems={stationsArr[index].loadingItems}
            isCompact={stationsArr[index].isCompact}
            sectionProps={{
                chip: isEditorsChoice(collection) ? t("grid.editorsChoice") : t("grid.automatic"),
                title: getTranslationMetadata(t, collection.data?.query.id).title,
                subtitle: getTranslationMetadata(t, collection.data?.query.id).description,
            }}
            smartGridProps={{
                variant: stationsArr[index].isCompact ? "rect" : "oneline",
                itemProps: { gap: "sm" }
            }}
        />
    )
}