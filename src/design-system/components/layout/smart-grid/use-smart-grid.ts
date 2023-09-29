/** 
 * The goal is to represent a grid where the elements fit 100% of the grid width,
 * while considering gaps and each element aspect ratio.
 * 
 * To fit the elements horizontally, the following needs to be true:
 * 
 *  Variables:
 *  - Cmw: Card minimum width
 *  - Cw:  Card width
 *  - Tw:  Total grid width
 *  - Cg:  Width of inter-card gap
 *  - Cn:  Number of whole cards able to fit in Tw
 *  - Cxn: Exact number of cards to fit in Tw
 * 
 *  Rules:
 *  1. Cxn = (Tw + Cg) / (Cmw + Cg)
 *  2. Cn = floor(Cxn)
 *  3. Cw = (Tw - (Cn x Cg) + Cg) / Cn
 * 
 *  The variant can be explained as:
 *  
 *  <fit-x>
 *     Fit one line of items on desktop (only shows what is possible). 
 *     On mobile, switch to the overflow-x variant to improve experience (scrollable).
 *  <fit-xy>
 *     Fit all items in multiple lines as needed
 *  <fill-xy>
 *     When possible, all the items will fill one line. Otherwise, 
 *     it switches to the fit-xy variant.
 *  <overflow-x>
 *     Fit all items in one line (each item receives a minimum width), 
 *     but it allows overflow. 
*/

import { useIsMobile } from "@design-system/hooks/use-is-mobile";
import { useTheme } from "@design-system/theme";
import { Size } from "@design-system/theme/types";
import { CssSize } from "@design-system/utils";
import useMeasure from "react-use-measure"

export type GridFit = "fit-x" | "fill-xy" | "fit-xy" | "overflow-x"

interface Options<I> {
    itemProps?: {
        minWidth?: number,
        ratio?: number,
        gap?: Size
    },
    variant?: GridFit,
    items?: I[],
    enableAspectRatio?: boolean
}

interface GridReturn<I> {
    itemProps: {
        width: number;
        height?: number;
        minWidth?: number;
        ratio?: number;
        gap?: string;
    },
    variant: GridFit,
    rows: I[][],
    hasHiddenItems: () => boolean,
    ref: (element: HTMLElement | null) => void
}

export const useSmartGrid = <I>(options: Options<I>): GridReturn<I> => {
    const {
        variant = "fit-x",
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
    
    // Reference and grid boundaries
    const [ref, bounds] = useMeasure()

    // Grid variants can change behaviour when certain conditions are met
    const getVariant = () => {
        // When variant is fit-x, in mobile it is better to use a slideshow approach
        if (variant === "fit-x" && isMobile) return "overflow-x"

        // When variant is fill-xy, it is only possible to fit all items in one line
        // if the grid width is greater than the sum of all items minimum width + gaps
        if (variant === "fill-xy" && items.length * (minWidth + gap) > bounds.width) return "fit-xy"
        
        return variant
    }

    const getNumberOfItemsInX = () : number => {
        let itens = 0
        if (getVariant() === "fill-xy") {
            itens = items.length
        } else if (minWidth + gap === 0) {
            itens = 0
        } else {
            itens = Math.floor((bounds.width + gap) / (minWidth + gap))
        }
        return Math.max(1, itens)
    }

    const getItemWidth = () : number => {
        const numberOfItemsInX = getNumberOfItemsInX()
        if (numberOfItemsInX === 0) return 0
        if (getVariant() === "overflow-x") return minWidth
        return Math.max(0, (bounds.width - (numberOfItemsInX * gap) + gap) / numberOfItemsInX)
    }

    const getItemDimensions = () => {
        const width = getItemWidth()
        if (enableAspectRatio) return { width, height: width / ratio}
        return {width, height: undefined}
    }

    const getItems = () => {
        const items2d = convertTo2DArray(items, getNumberOfItemsInX())
        switch (getVariant()) {
            case "fit-x":
                return items2d.length === 0 ? [] : [items2d[0]]
            case "fill-xy":
                return [items]
            case "overflow-x":
                return items.length === 0 ? [] : [items]
            default: 
                return items2d
        }
    }

    const hasHiddenItems = () => {
        return getVariant() === "fit-x" && items.length > getNumberOfItemsInX()
    }

    return {
        itemProps: {ratio, minWidth, gap: `${gap}px`, ...getItemDimensions()},
        variant: getVariant(),
        rows: getItems(),
        hasHiddenItems,
        ref,
    }
}

/**
 * Converts a 1D array into a 2D array with a specified number of columns.
 *
 * @param {Array} arr - The input 1D array.
 * @param {number} numCols - The number of columns in the resulting 2D array.
 * @returns {Array} The resulting 2D array.
 */
const convertTo2DArray = (arr: any[], numCols: number): Array<any> => {
    return arr.reduce((acc, val, index) => {
      const rowIndex = Math.floor(index / numCols);
      acc[rowIndex] = acc[rowIndex] || [];
      acc[rowIndex].push(val);
      return acc;
    }, []);
  }
  