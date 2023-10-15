import { SidebarContext } from "@design-system/components/navigation/base-sidebar/context"
import { useContext } from "react"

export const useSidebar = () => {
    return useContext(SidebarContext)
}