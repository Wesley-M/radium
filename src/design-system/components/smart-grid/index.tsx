import { Box, Stack, SxProps } from "@mui/material";
import { GridFit, useSmartGrid } from "./use-smart-grid";
import { ReactNode } from "react";
import React from "react";
import { Size } from "@design-system/theme/types";
import merge from "lodash.merge";
  
type GridProps = {
    itemProps?: {
        // Gap between items (in pixels)
        gap?: Size,
        // Minimum width of an item (in pixels)
        minWidth?: number, 
        // Aspect ratio of an item (e.g. 3/4, 1/1)
        ratio?: number,
    },
    // Grid items to render
    children?: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[],
    // Grid variant
    variant?: GridFit,
    // Enable the items to receive height that matches the aspect ratio
    enableAspectRatio?: boolean
}

export const SmartGrid = (props: GridProps) => {    
    const itemProps = merge({
        gap: "md",
        minWidth: 200,
        ratio: 1
    }, props.itemProps)
    
    const { 
        children = [],
        variant = "fit-x",
        enableAspectRatio = false
    } = props

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
    
    // Injecting the dimensions into the grid items
    const itemsWithDimensions = grid.render.map(row => {
        return row.map((item, idx) => {
            if (React.isValidElement(item)) {
                return React.cloneElement(item, {key: `item-${idx}`, width: grid.itemProps.width, height: grid.itemProps.height });
            }
            return item;
        })
    })

    return (
        <Stack 
            sx={{ 
                width: "100%", 
                gap: grid.itemProps.gap, 
                ...getOverflowXStyles(),
            }} 
            ref={grid.ref} 
        >
            {itemsWithDimensions.map((row, idx) => {
                return (
                    <Stack key={`item-row-${idx}`} direction="row" sx={{ gap: grid.itemProps.gap}}>
                        {row.map((item) => item)}
                    </Stack>
                )
            })}
        </Stack>
    )
}

interface ItemProps {
    children?: ReactNode,
    width?: number,
    height?: number,
    sx?: SxProps
}
  
export const Item = (props: ItemProps) => {
    const { 
        children, 
        width, 
        height,
        sx 
    } = props

    return (
        <Box 
            width={width} 
            sx={{ 
                minWidth: width,
                height,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}
  