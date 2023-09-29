import { Surface } from "@design-system/components/surfaces/surface";
import { useTheme } from "@design-system/theme";
import { SxProps } from "@mui/material";

interface BaseSidebarSectionProps {
  children: React.ReactNode;
  sx?: SxProps
}

export const BaseSidebarSection = (props: BaseSidebarSectionProps) => {
  const { children, sx } = props;
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