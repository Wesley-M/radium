import { Grid } from "@mui/material";
import { GridFit, useSmartGrid } from "./use-smart-grid";
import React from "react";
import { Size } from "@design-system/theme/types";
import merge from "lodash.merge";
import { SmartGridItemProps } from "./components/item";
import { InfiniteItemList } from "@design-system/components/layout/smart-grid/components/infinite-item-list";
import { FixedSizeListProps } from "react-window";
import { StaticItemList } from "@design-system/components/layout/smart-grid/components/static-item-list";

export type SmartGridProps = {
    // Grid items to render
    children?: React.ReactElement<SmartGridItemProps> | React.ReactElement<SmartGridItemProps>[],
    // Grid variant
    variant?: GridFit,
    // Enable the items to receive height that matches the aspect ratio
    itemProps?: {
        // Gap between items
        gap?: Size,
        // Minimum width of an item (in pixels)
        minWidth?: number, 
        // Aspect ratio of an item (e.g. 3/4, 1/1)
        ratio?: number,
    },
    // Infinite grid props
    infiniteGridProps?: {
        loadMore: () => void,
        hasMore: () => boolean,
        loading: boolean,
        listProps?: Partial<FixedSizeListProps>
    }
    // Enable aspect ratio
    enableAspectRatio?: boolean
    // Enable infinite grid
    enableInfiniteGrid?: boolean
}

export const SmartGrid = (props: SmartGridProps) => {    
    const { 
        children = [],
        variant = "fit-x",
        enableAspectRatio = false,
        enableInfiniteGrid = false
    } = props

    const itemProps = merge({
        gap: "sm",
        minWidth: 200,
        ratio: 1
    }, props.itemProps)

    const infiniteGridProps = merge({
        loadMore: (() => {}),
        hasMore: (() => false),
        loading: true
    }, props.infiniteGridProps)

    const grid = useSmartGrid({ 
        itemProps, 
        variant,
        items: !Array.isArray(children) ? [children] : children,
        enableAspectRatio,
    })

    // Styles to be applied when overflow-x variant is selected
    const getOverflowXStyles = () => {
        if (grid.variant === "overflow-x") {
            return {
                overflow: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none"
            } as React.CSSProperties
        }
        return {}
    }
    
    // Injecting dimensions into the grid items
    const itemsWithDimensions = grid.rows.map(row => {
        return row.map((item) => {
            if (React.isValidElement(item)) {
                return React.cloneElement(item, {width: grid.itemProps.width, height: grid.itemProps.height });
            }
            return item;
        })
    })

    const ItemList = enableInfiniteGrid ? (
        <InfiniteItemList
            items={itemsWithDimensions}
            loading={infiniteGridProps.loading}
            loadMore={infiniteGridProps.loadMore}
            hasMore={infiniteGridProps.hasMore}
            listProps={infiniteGridProps.listProps}
            itemWrapperProps={{
                sx: { gap: grid.itemProps.gap }
            }}
        />
    ) : (
        <StaticItemList
            items={itemsWithDimensions}
            itemWrapperProps={{
                sx: { gap: grid.itemProps.gap }
            }}
        />
    )

    return (
        <Grid
            container
            sx={{ 
                width: "100%", 
                ...getOverflowXStyles() 
            }} 
            ref={grid.ref} 
            gap={grid.itemProps.gap}
        >
            {ItemList}
        </Grid>
    )
}

export { SmartGridItem } from "./components/item"