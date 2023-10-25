/** 
 * The goal is to reach a grid that knows how to fill all of its
 * available space, given different circumstances. Such as:
 * 
 * - Minimum width of each element
 * - Aspect ratio of each element
 * - How many elements to fit in each line
 * - How many lines to fit in the grid
 */

import { useIsMobile } from "@design-system/hooks/use-is-mobile";
import { useTheme } from "@design-system/theme";
import { Size } from "@design-system/theme/types";
import { CssSize } from "@design-system/utils";
import useMeasure from "react-use-measure"

/* 
* The grid display variants are:
* 
* - oneline: Shows only one line of elements, and it hides the rest. This line
* should fill all of the available space, given the minimum width of each 
* element (e.g. a width of 200px and an item's minimum width of 45px will
* result in 4 items per line, each with 50px of width). In mobile, this
* variant will change to overflow-oneline.
* 
* - overflow-oneline: Shows only one line of elements, and it allows overflow. 
* All elements will have the same minimum width.
* 
* - all: Shows the all elements, each line follows the same rules as the oneline 
* variant. Except the last line will be filled with the remaining elements.
* 
* - rect: If there is only one line, it will fill it with items. If it is not
* possible, it will show the items in multiple lines, each line follows the same 
* rules as the oneline. Except the last line will not be shown if it is not filled.
*/
export type GridFit = "oneline" | "overflow-oneline" | "all" | "rect"

interface GridOptions<I> {
    /** Properties to be applied to each item */
    itemProps?: {
        /** Item`s minimum width */
        minWidth?: number,
        /** Item`s aspect ratio */
        ratio?: number,
        /** Item`s gap */
        gap?: Size
    },
    /** Grid display variant */
    variant?: GridFit,
    /** Items to be processed */
    items?: I[],
    /** If true, the item`s height will be calculated based on its width and aspect ratio */
    enableAspectRatio?: boolean
}

interface GridReturn<I> {
    /** Properties to be applied to each item */
    itemProps: {
        /** Item`s computed width */
        width: number;
        /** Item`s computed height */
        height?: number;
        /** Item`s minimum width */
        minWidth?: number;
        /** Item`s aspect ratio */
        ratio?: number;
        /** Item`s gap */
        gap?: string;
    },
    /** Grid display variant */
    variant: GridFit,
    /** Items to be displayed */
    rows: I[][],
    /** Reference to the grid container */
    smartGridRef: (element: HTMLElement | null) => void
    /** Returns true if there are hidden items */
    hasHiddenItems: () => boolean,
}

export const useSmartGrid = <I>(options: GridOptions<I>): GridReturn<I> => {
    const {
        variant = "oneline",
        itemProps,
        items = [],
        enableAspectRatio = false
    } = options

    const {spacing} = useTheme()
    const isMobile = useIsMobile("md")
    
    // Item`s aspect ratio
    const ratio = itemProps?.ratio || 1
    
    // Item`s minimum width
    const minWidth = itemProps?.minWidth || 100

    // Item`s gap
    const gap = CssSize.build(spacing(`in-${itemProps?.gap || "md"}`)).toPx() || 0
    
    // Reference and boundaries for the grid container
    const [containerRef, containerBounds] = useMeasure()

    /** 
     * Variants can change depending on the screen size, so we 
     * need to compute it.
    */
    const computeVariant = () => {
        if (variant === "oneline" && isMobile) return "overflow-oneline"
        return variant
    }

    /** 
     * Computes the number of items to fit in each line
     * 
     * [FIT EXPLANATION]: The logic behind the fit of each line, it is as follows:
     *  
     *  Variables:
     *  - Imw: Item minimum width
     *  - Iw:  Item width
     *  - Tw:  Total grid width
     *  - Gp:  Gap between items
     *  - In:  Number of whole items able to fit in Tw
     *  - Ixn: Exact number of items to fit in Tw
     * 
     *  Rules:
     *  1. Ixn = (Tw + Gp) / (Imw + Gp)
     *  2. In = floor(Ixn)
     *  3. Iw = (Tw - (In x Gp) + Gp) / In
    */
    const computeItemsPerLine = () : number => {
        // Item has no dimensions
        if (minWidth + gap === 0) return 0
        
        // Needed to fit all items in one line
        const onelineFit = Math.floor((containerBounds.width + gap) / (minWidth + gap))

        // Rect mode, but there are not enough items to fill the line
        const isIncompleteRect = computeVariant() === "rect" && items.length < onelineFit
        
        // Overflow mode
        const isOverflow = computeVariant() === "overflow-oneline"

        let result = onelineFit
        if (isIncompleteRect || isOverflow) result = items.length
        
        // Prevent division by zero
        return Math.max(1, result)
    }

    /** 
     * Compute the width of each item, based on the variant
    */
    const computeItemWidth = () : number => {
        const itemsPerLine = computeItemsPerLine()
        const isOverflow = computeVariant() === "overflow-oneline"
        const onelineFit = (containerBounds.width - (itemsPerLine * gap) + gap) / itemsPerLine

        let result = onelineFit
        if (itemsPerLine === 0) result = 0
        if (isOverflow) result = minWidth

        return Math.max(0, result)
    }

    /** 
     * Compute the dimensions of each item (width, height). It is
     * important to note that the height is only computed if the
     * aspect ratio is enabled.
    */
    const computeItemDimensions = () => {
        const width = computeItemWidth()
        if (enableAspectRatio) return { width, height: width / ratio}
        return {width, height: undefined}
    }

    /** 
     * Compute the rows which will be displayed
    */
    const computeRows = () => {
        const rows = to2D(items, computeItemsPerLine())
        
        const firstRow = rows[0]
        const lastRow = rows[rows.length - 1]
        const isLastRowIncomplete = lastRow?.length < computeItemsPerLine()

        switch (computeVariant()) {
            case "oneline":
                return rows.length === 0 ? [] : [firstRow]
            case "overflow-oneline":
                return items.length === 0 ? [] : [items]
            case "rect":
                if (rows.length <= 1) return rows
                return (isLastRowIncomplete) ? rows.slice(0, -1) : rows 
            default: 
                return rows
        }
    }

    /** 
     * Checks if the grid has hidden items
    */
    const hasHiddenItems = () => {
        const rows = to2D(items, computeItemsPerLine())
        const onelineHasHidden = computeVariant() === "oneline" && items.length > computeItemsPerLine()
        const rectHasHidden = computeVariant() === "rect" && computeRows().length < rows.length
        return onelineHasHidden || rectHasHidden
    }

    /**
     * Converts a 1D array into a 2D array with a specified number of columns.
     */
    const to2D = (arr: any[], numCols: number): Array<any> => {
        return arr.reduce((acc, val, index) => {
            const rowIndex = Math.floor(index / numCols);
            acc[rowIndex] = acc[rowIndex] || [];
            acc[rowIndex].push(val);
            return acc;
        }, []);
    }

    return {
        itemProps: {
            ratio, 
            minWidth, 
            gap: `${gap}px`, 
            ...computeItemDimensions()
        },
        variant: computeVariant(),
        rows: computeRows(),
        hasHiddenItems,
        smartGridRef: containerRef,
    }
}