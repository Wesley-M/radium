import { ScrollContext } from "@design-system/context/scroll-context"
import { useContext } from "react"

export const useScroll = () => {
    return useContext(ScrollContext)
}