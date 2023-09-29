import { useTheme } from "@design-system/theme";
import { Stack, SvgIconProps } from "@mui/material";
import { ComponentType, useContext } from "react";
import { Text } from "@design-system/components/data-display/text";
import { MiniContext } from "@design-system/components/navigation/base-sidebar/context/mini-context";
import { Link } from "react-router-dom";

interface BaseSidebarItemProps {
  icon: ComponentType<SvgIconProps>
  title: string
  isActive?: boolean
  to?: string
}
  
export const BaseSidebarItem = (props: BaseSidebarItemProps) => {
  const { icon, title, isActive = false, to } = props
  const { palette, spacing } = useTheme()
  const mini = useContext(MiniContext)

  const Icon = icon

  const text = (
    <Text 
      as="body1" 
      sx={{ 
        fontSize: "1rem", 
        fontWeight: "bold", 
        color: palette("tx-primary"),
      }}
    >
      {title}
    </Text>
  )

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent={ mini ? "center" : "flex-start" }
      gap={spacing("in-xxs")}
      paddingY={spacing("in-xs")}
      sx={{
        opacity: isActive ? 1 : 0.8,
        transition: "opacity 200ms ease-in-out",
        "&:hover": {
          cursor: "pointer",
          opacity: 1
        }
      }}
    >
      <Icon 
        sx={{ 
          fontSize: "2rem", 
          color: palette("tx-primary") 
        }} 
      />
      {!mini && (
        <>
          {to ? (
            <Link to={to} style={{ textDecoration: "none" }}>
              {text}
            </Link>
          ) : text}
        </>        
      )}
    </Stack>
  )
}