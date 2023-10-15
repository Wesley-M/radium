/** 
 * Context that watches if the sidebar is in mini mode
*/

import { PropsWithChildren, createContext } from "react";

interface SidebarContextProps {
    isMini: boolean
    toggle: () => void
    width: number
}

export const SidebarContext = createContext<SidebarContextProps>({
    isMini: false,
    toggle: () => {},
    width: 0
});

type SidebarProviderProps = PropsWithChildren<SidebarContextProps>

export const SidebarProvider = (props: SidebarProviderProps) => {
    const { children, isMini, toggle, width } = props
        
    return (
        <SidebarContext.Provider 
            value={{ 
                isMini, 
                toggle,
                width
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}