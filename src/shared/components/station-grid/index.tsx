import { Card } from "@design-system/components/surfaces/card"
import { SmartGrid, SmartGridItem, SmartGridProps } from "@design-system/components/layout/smart-grid"
import { Title } from "@design-system/components/data-display/title"
import { Station } from "libs/radio-browser-api.types"
import { StationCard } from "@components/station-card"
import { Section } from "@design-system/components/data-display/section"
import { GridFit, useSmartGrid } from "@design-system/components/layout/smart-grid/use-smart-grid"
import { useNavigate } from "react-router-dom"
import { Button } from "@design-system/components/inputs/button"
import merge from "lodash.merge"

interface StationGridProps {
    /** Stations to render */
    data: Station[]
    /** Title of the grid */
    title?: string
    /** Subtitle of the grid */
    subtitle?: string
    /** Go back to this route */
    goBack?: string
    /** Go to this route */
    goTo?: string
    /** Smart grid properties */
    smartGridProps?: SmartGridProps
    /** Loading state */
    loading?: boolean
    /** Number of loading items */
    loadingItems?: number
    /** Whether the grid is compact */
    isCompact?: boolean
    /** Whether to enable the title section */
    enableTitleSection ?: boolean
}

export const StationGrid = (props: StationGridProps) => {
    const { 
        data = [],
        title = "",
        subtitle = "",
        goBack,
        goTo = "/",
        loadingItems = 20,
        loading = true,
        isCompact = false, 
        enableTitleSection = true,
    } = props

    /** 
     * Default smart grid props
    */
    const smartGridProps = merge({
        variant: "fit-xy",
        items: data,
        itemProps: { gap: "sm", minWidth: isCompact ? 400 : 180 },
    }, props.smartGridProps)

    /** 
     * Stantiate the smart grid logic
    */
    const grid = useSmartGrid({
        variant: smartGridProps.variant as GridFit,
        items: smartGridProps.items,
        itemProps: smartGridProps.itemProps,
    })

    const navigate = useNavigate()

    const hasHiddenStations = () => grid.hasHiddenItems()

    const stationCards = smartGridProps.items.map((station: Station, index: number) => (
        <SmartGridItem key={station.id}>
            <StationCard 
                station={station} 
                stationIdx={index} 
                collection={smartGridProps.items}
                isCompact={isCompact}                        
            />
        </SmartGridItem>
    ))

    const loadingCards = [...Array(loadingItems)].map((_, index) => (
        <SmartGridItem key={index}>
            <Card
                padding={isCompact ? "xs" : "sm"}
                borderRadius='md'
                variant={isCompact ? "compact" : "default"}
                enableAlwaysShowAction={false}
                loading={true}
            />
        </SmartGridItem>
    ))

    return (
        <Section 
            innerRef={grid.ref}
            title={enableTitleSection ? title : ""} 
            subtitle={enableTitleSection ? subtitle : ""}
            actions={hasHiddenStations() && (
                <Button onClick={() => navigate(goTo)}>
                    Show all
                </Button>
            )}
            goBack={goBack}
        >
            {enableTitleSection && loading && <Title isAbove loading={true}/>}
            <SmartGrid {...smartGridProps}>
                {loading ? [...stationCards, ...loadingCards] : stationCards}              
            </SmartGrid>
        </Section>
    )
}