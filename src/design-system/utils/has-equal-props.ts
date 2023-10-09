import isEqual from "react-fast-compare"

/** 
 * Used to compare if two components have the same props
*/
export const hasEqualProps = (oldProps: any, newProps: any) => {
    return isEqual(oldProps, newProps)
}