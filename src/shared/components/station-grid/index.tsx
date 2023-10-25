import { Card } from "@design-system/components/surfaces/card"
import { SmartGrid, SmartGridItem, SmartGridProps } from "@design-system/components/layout/smart-grid"
import { Station } from "libs/radio-browser-api.types"
import { StationCard } from "@components/station-card"
import { Section, SectionProps } from "@design-system/components/data-display/section"
import { GridFit, useSmartGrid } from "@design-system/components/layout/smart-grid/use-smart-grid"
import { useNavigate } from "react-router-dom"
import { Button } from "@design-system/components/inputs/button"
import merge from "lodash.merge"
import { CardProps } from "@design-system/components/surfaces/card/variants/base-card"
import { useTranslation } from "react-i18next"
import { useTheme } from "@design-system/theme"
import { useEffect, useState } from "react"

interface StationGridProps {
    /** Stations to render */
    data: Station[]
    /** Error message */
    error?: string
    /** Properties for the section */
    sectionProps?: SectionProps
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
    /** Whether the grid only shows editors choice stations */
    isEditorsChoice?: boolean
    /** Whether to enable a section wrapping the grid */
    enableSection?: boolean
    /** Card properties */
    cardProps?: CardProps
}

export const StationGrid = (props: StationGridProps) => {
    const { 
        data = [],
        error = "",
        goTo = "/",
        loadingItems = 20,
        loading = true,
        isCompact = false, 
        sectionProps,
        enableSection = true,
        cardProps
    } = props    
    
    const { radius } = useTheme()
    const { t } = useTranslation()
    const navigate = useNavigate()

    /**
     * Used to delay loading indicators
    */
    const [debouncedLoading, setDebouncedLoading] = useState(false)
    
    /** 
     * Default smart grid props
    */
    const smartGridProps = merge({
        variant: "all",
        items: data,
        itemProps: { gap: "xs", minWidth: isCompact ? 400 : 190 },
    }, props.smartGridProps)

    /** 
     * Stantiate the smart grid logic
    */
    const grid = useSmartGrid({
        variant: smartGridProps.variant as GridFit,
        items: smartGridProps.items,
        itemProps: smartGridProps.itemProps,
    })

    const stationCards = smartGridProps.items.map((station: Station, index: number) => (
        <SmartGridItem key={station.id}>
            {(width, height) => (
                <StationCard 
                    width={width}
                    height={height}
                    station={station} 
                    stationIdx={index} 
                    collection={smartGridProps.items}
                    isCompact={isCompact} 
                    cardProps={cardProps}
                    loading={false}      
                />
            )}
        </SmartGridItem>
    ))

    const loadingCards = [...Array(loadingItems)].map((_, index) => (
        <SmartGridItem key={index}>
            {(width, height) => (
                <Card
                    width={width}
                    height={height}
                    padding={isCompact ? "xs" : "sm"}
                    borderRadius='md'
                    variant={isCompact ? "compact" : "default"}
                    enableAlwaysShowAction={false}
                    loading={true}
                    {...cardProps}
                />
            )}
        </SmartGridItem>
    ))

    const render = (contentCards: JSX.Element[], loadingCards: JSX.Element[]) => {
        if (debouncedLoading) {
            return smartGridProps.enableInfiniteGrid ? [...contentCards, ...loadingCards] : loadingCards
        }
        return contentCards
    }

    const showAll = (
        <Button 
            size="small" 
            sx={{ borderRadius: radius("lg") }} 
            onClick={() => navigate(goTo)}
        >
            {t("controls.showAll")}
        </Button>
    )

    const content = (
        <SmartGrid {...smartGridProps}>
            {render(stationCards, loadingCards)}
        </SmartGrid>
    )

    if (error) {
        throw new Error(t("error.failedWhileFetchingStations"))
    }

    /**
     * Debounce loading state
    */
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedLoading(loading)
        }, 250)
        return () => clearTimeout(timeout)
    }, [loading])

    return (
        <>
            {enableSection ? (
                <Section 
                    {...sectionProps}
                    innerRef={grid.smartGridRef}
                    actions={grid.hasHiddenItems() && showAll}
                    loading={loading}
                >
                    {content}
                </Section>
            ) : (
                <>{content}</>
            )}
        </>
    )
}