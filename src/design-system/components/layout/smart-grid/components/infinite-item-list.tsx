import { Stack, SxProps } from '@mui/material';
import { FixedSizeListProps, FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

interface InfiniteItemListProps {
    /** Items to render */
    items: any[][]
    /** Loading state */
    loading: boolean
    /** Load more items */
    loadMore: () => void
    /** Has more items */
    hasMore: () => boolean
    /** Props passed to the virtual list */
    listProps?: Partial<FixedSizeListProps>
    /** Props passed for each infinite item wrapper */
    itemWrapperProps?: {
        sx?: SxProps
    }
}

/** 
 * This component renders a list of items with
 * virtualization and infinite loading built-in.
*/
export const InfiniteItemList = (props: InfiniteItemListProps) => {
    const { 
        items,
        loading = true, 
        loadMore, 
        hasMore, 
        listProps,
        itemWrapperProps
    } = props

    // Number of items
    const itemCount = items.length

    // Load more items or do nothing if loading
    const loadMoreItems = loading ? (() => {}) : loadMore
    
    // Whether the item is loaded
    const isItemLoaded = () => !hasMore()

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems} 
        >
            {({ onItemsRendered, ref }) => (
                <List
                    height={listProps?.height || 600}
                    width="100%"
                    itemData={{ items, sx: itemWrapperProps?.sx }}
                    itemCount={itemCount}
                    itemSize={listProps?.itemSize || 88}
                    onItemsRendered={onItemsRendered}
                    overscanCount={listProps?.overscanCount || 20}
                    style={{ overflowX: "hidden" }}
                    ref={ref}
                    {...listProps}
                >
                    {InfiniteItemWrapper}
                </List>
            )}
        </InfiniteLoader>
    )
}

interface InfiniteItemWrapperProps {
    data: { items: any[][], sx?: SxProps }
    index: number
    style: React.CSSProperties
}

/** 
 * Each item in the virtualized list represents a row of components.
 * This component wraps each one of these rows.
*/
const InfiniteItemWrapper = (props: InfiniteItemWrapperProps) => {
    const { data, index, style } = props
    const {items, sx} = data

    return (
        <Stack 
            key={index} 
            direction="row" 
            sx={{ ...style, ...sx}}
        >
            {items[index] && items[index].map((item: any) => item)}
        </Stack>
    )
}
  