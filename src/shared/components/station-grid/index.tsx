import { Card } from "@design-system/components/surfaces/card"
import { SmartGrid, Item } from "@design-system/components/layout/smart-grid"
import { Title } from "@design-system/components/data-display/title"
import { useTheme } from "@design-system/theme"
import { Stack } from "@mui/material"
import { Station } from "libs/radio-browser-api.types"
import { StationCard } from "@components/station-card"
import { Section } from "@design-system/components/data-display/section"
import { GridFit, useSmartGrid } from "@design-system/components/layout/smart-grid/use-smart-grid"
import { useNavigate } from "react-router-dom"
import { Button } from "@design-system/components/inputs/button"

interface StationGridProps {
    collection: any
    isCompact?: boolean
    variant?: GridFit
    goBack?: string
}

export const StationGrid = (props: StationGridProps) => {
    const { collection, isCompact, variant, goBack } = props
    
    const gridOptions = {
        variant: variant ?? "fit-xy",
        items: collection.data?.content,
        itemProps: { minWidth: isCompact ? 300 : 150 },
    }

    const grid = useSmartGrid(gridOptions)
    
    const hasHiddenStations = () => grid.hasHiddenItems()

    const navigate = useNavigate();

    const isLoading = () => collection.status === "loading"
    
    if (isLoading()) {
        return <LoadingStationGrid isCompact={isCompact}/>
    }

    return (
        <Section 
            title={collection.data?.title} 
            subtitle={collection.data?.description}
            actions={hasHiddenStations() && (
                <Button onClick={() => navigate(collection.data?.query.name)}>
                    Show all
                </Button>
            )}
            goBack={goBack}
        >
            <SmartGrid {...gridOptions}>
                {collection.data?.content.map((station: Station, index: number) => (
                    <Item key={station.id}>
                        <StationCard 
                            station={station} 
                            stationIdx={index} 
                            collection={collection}
                            isCompact={isCompact}                        
                        />
                    </Item>
                ))}
            </SmartGrid>
        </Section>
    )
}

interface LoadingStationGridProps {
    isCompact?: boolean
}

const LoadingStationGrid = (props: LoadingStationGridProps) => {
    const { isCompact = false } = props
    const { spacing } = useTheme()

    return (
        <Stack gap={spacing("st-md")}>
            <Title isAbove loading={true}/>
            
            <SmartGrid 
                itemProps={{ minWidth: isCompact ? 300 : 150 }}
                variant={isCompact ? "fill-xy" : "fit-x"}
            >
                {[...Array(isCompact ? 3 : 10)].map((_, index) => (
                    <Item key={index}>
                        <Card
                            size={!isCompact ? 150 : undefined}
                            padding={isCompact ? "xs" : "sm"}
                            borderRadius='md'
                            variant={isCompact ? "compact" : "default"}
                            enableAlwaysShowAction={false}
                            loading={true}
                        />
                    </Item>
                ))}
            </SmartGrid>
        </Stack>
    )
}