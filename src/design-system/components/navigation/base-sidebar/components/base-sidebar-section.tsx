import { Surface } from "@design-system/components/surfaces/surface";
import { useTheme } from "@design-system/theme";
import { SxProps } from "@mui/material";

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
  const { spacing } = useTheme()
  
  return (
    <Surface 
      color="sr-200" 
      padding="xs"
      sx={{ 
        margin: spacing("in-xs"), 
        width: "auto",
        ...sx 
      }}
    >
      {children}
    </Surface>
  )
}