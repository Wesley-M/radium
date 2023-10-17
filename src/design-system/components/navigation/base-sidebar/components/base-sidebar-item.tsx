import { useTheme } from "@design-system/theme";
import { Stack, SvgIconProps } from "@mui/material";
import { ComponentType } from "react";
import { Text } from "@design-system/components/data-display/text";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@design-system/hooks/use-sidebar";

interface BaseSidebarItemProps {
  /** Icon to be used when the item is inactive */
  inactiveIcon?: ComponentType<SvgIconProps>
  /** Icon to be used when the item is active */
  activeIcon?: ComponentType<SvgIconProps>
  /** Title of the item */
  title: string
  /** Whether the item is active or not */
  isActive?: boolean
  /** Path to navigate to when the item is clicked */
  to?: string
}

/**
 * A sidebar item is a clickable element that can be used to 
 * navigate to a different page.
 */
export const BaseSidebarItem = (props: BaseSidebarItemProps) => {
  const {
    activeIcon, 
    inactiveIcon, 
    title,
    to, 
    isActive = false 
  } = props

  const { palette, spacing } = useTheme()
  const { isMini } = useSidebar()
  const navigate = useNavigate()
  
  const SelectedIcon = isActive ? activeIcon : inactiveIcon

  /** 
   * If the sidebar is in mini mode, the text is not rendered
  */
  const text = isMini ? null : (
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
      justifyContent={ isMini ? "center" : "flex-start" }
      gap={spacing("in-xxs")}
      paddingY={spacing("in-xs")}
      sx={{
        opacity: isActive ? 1 : 0.7,
        transition: "opacity 300ms ease-in-out",
        "&:hover": {
          cursor: "pointer",
          opacity: 1
        }
      }}
      onClick={() => to && navigate(to)}
      title={title}
    >
      {SelectedIcon && (
        <SelectedIcon
          sx={{ 
            fontSize: "2rem", 
            color: palette("tx-primary") 
          }} 
        />
      )}
      {text}
    </Stack>
  )
}