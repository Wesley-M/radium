import { Stack, SxProps } from "@mui/material"

interface StaticItemListProps {
    /** Items to render */
    items: any[][]
    /** Props passed for each infinite item wrapper */
    itemWrapperProps?: {
        sx?: SxProps
    }
}

export const StaticItemList = (props: StaticItemListProps) => {
    const {
        items,
        itemWrapperProps
    } = props

    return (
        <>
            {items.map((row, idx) => {
                return (
                    <Stack 
                        key={idx} 
                        direction="row" 
                        sx={itemWrapperProps?.sx}
                    >
                        {row.map((item) => item)}
                    </Stack>
                )
            })}
        </>
    )
}
