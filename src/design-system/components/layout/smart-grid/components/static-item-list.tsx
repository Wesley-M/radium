import { GridFit } from "@design-system/components/layout/smart-grid/use-smart-grid"
import { Box, Stack, SxProps } from "@mui/material"
import { FixedSizeListProps, FixedSizeList as List } from 'react-window';

interface StaticItemListProps {
    /** Items to render */
    items: any[][]
    /** Props passed for each item */
    itemWrapperProps?: {
        sx?: SxProps
    }
    /** Grid variant */
    variant?: GridFit
    /** Virtual list properties */
    virtualListProps?: Partial<FixedSizeListProps>
}

export const StaticItemList = (props: StaticItemListProps) => {
    const {
        items,
        itemWrapperProps,
        variant = "oneline",
        virtualListProps
    } = props

    const itemCount = items.length;

    const hasOverflown = variant === "overflow-oneline"

    const regularList = items.map((row, idx) => (
        <Stack 
            key={idx} 
            direction="row" 
            sx={itemWrapperProps?.sx}
        >
            {row.map((item) => item)}
        </Stack>
    ))

    const virtualList = (
        <List
            height="100%"
            width={virtualListProps?.width || window.innerWidth}
            itemData={{ items, sx: itemWrapperProps?.sx }}
            itemCount={itemCount}
            itemSize={virtualListProps?.itemSize || 200}
            overscanCount={virtualListProps?.overscanCount || 2}
            layout="horizontal"
        >
            {VirtualItem}
        </List>
    )

    return (
        <>{hasOverflown ? virtualList : regularList}</>
    )
}

interface VirtualItemProps {
    data: { items: any[][], sx?: SxProps },
    index: number
    style: React.CSSProperties
}

/** 
 * Each item in the virtualized list represents a row of components.
 * This component wraps each one of these rows.
*/
const VirtualItem = (props: VirtualItemProps) => {
    const { data, index, style } = props
    const {items, sx} = data

    return (
        <Box
            key={index} 
            sx={{ ...style, display: "inline-flex", ...sx}}
        >
            {items[index]}
        </Box>
    )
}
