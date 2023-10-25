import { ActionButton } from "@design-system/components/inputs/action-button"
import { useTheme } from "@design-system/theme"
import { Stack, alpha } from "@mui/material"
import { ReactNode } from "react"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useSidebar } from "@design-system/hooks/use-sidebar"
import { Logo } from "@design-system/components/data-display/logo"
import { useIsPageTop } from "@design-system/hooks/use-is-page-top";

export interface BaseSidebarHeaderProps {
    /** Additional options to be rendered on the header */
    options?: ReactNode
}
  
/**
 * The sidebar header is the top section of the sidebar.
 * It contains the toggle button, logo and additional options.
 */
export const BaseSidebarHeader = (props: BaseSidebarHeaderProps) => {
    const { options } = props
  
    const { palette, spacing } = useTheme()
    const { isMini, toggle } = useSidebar()
    const isPageTop = useIsPageTop()
    
    return (
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent={isMini ? "center" : "space-between"}
        sx={{
          padding: spacing("st-xs"),
          paddingBottom: spacing("st-sm"),
          backgroundColor: alpha(palette("sr-100"), isPageTop && isMini ? 0 : 1),
          width: "100%"
        }}
      >
        <Stack direction="row" gap={spacing("in-sm")} alignItems="center">
          <ActionButton 
            icon={<MenuRoundedIcon/>} 
            size="xs" 
            hoverEffect="opacity"
            sx={{ marginTop: "8px" }}
            onClick={toggle}
          />
          {!isMini && <Logo/>}
        </Stack>
  
        {options}
      </Stack>
    )
  }