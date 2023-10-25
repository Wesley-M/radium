import { Surface } from "@design-system/components/surfaces/surface";
import { useSidebar } from "@design-system/hooks";
import { useIsPageTop } from "@design-system/hooks/use-is-page-top";
import { useTheme } from "@design-system/theme";
import { SxProps, alpha } from "@mui/material";

interface BaseSidebarSectionProps {
  /** Content of the sidebar section */
  children: React.ReactNode
  /** Custom styles for the sidebar section */
  sx?: SxProps
}

/**
 * A sidebar section is a container for sidebar items.
 * It is used to group items that belong to the same category.
 */
export const BaseSidebarSection = (props: BaseSidebarSectionProps) => {
  const { children, sx } = props
  
  const { palette, spacing } = useTheme()
  const isPageTop = useIsPageTop()
  const { isMini } = useSidebar()
  
  return (
    <Surface 
      color="sr-200" 
      padding="xs"
      sx={{ 
        margin: spacing("in-xs"), 
        width: "auto",
        backgroundColor: isPageTop && isMini ? alpha(palette("tx-primary"), 0.05) : palette("sr-200"),
        ...sx 
      }}
    >
      {children}
    </Surface>
  )
}