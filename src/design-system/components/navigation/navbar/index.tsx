import { ActionButton } from "@design-system/components/inputs/action-button"
import { SearchField } from "@design-system/components/inputs/search-field"
import { useIsMobile } from "@design-system/hooks/use-is-mobile"
import { useTheme } from "@design-system/theme"
import { AppBar, Box, Stack, alpha } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useSidebar } from "@design-system/hooks/use-sidebar"
import { Settings } from "@design-system/components/navigation/settings"
import { Logo } from "@design-system/components/data-display/logo"

export const Navbar = () => {
    const { palette, spacing } = useTheme()
    const isMobile = useIsMobile("md")
    const sidebar = useSidebar()

    return (
        <Box 
          sx={{ 
            width: {xs: "100%", md: `calc(100% - ${sidebar.width}px)`}, 
            position: "fixed", 
            zIndex: 1000
          }}
        >
          <AppBar 
            component="nav" 
            position="absolute" 
            elevation={0}
            sx={{ 
                backgroundColor: alpha(palette("sr-100"), 0.8),
                padding: `${spacing("in-xxs")} ${spacing("in-md")}`,
                backdropFilter: "blur(5px)",
                borderBottom: `2px solid ${palette("sr-300")}`,
                position: isMobile ? "absolute" : "static"
            }}
          >
            <Stack 
                width="100%" 
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                sx={{
                  padding: "6px 0"
                }}
            >
                <Stack 
                    direction="row" 
                    gap={spacing("in-sm")}
                    sx={{ display: {xs: "flex", md: "none"} }}
                    alignItems="center"
                >
                    <ActionButton 
                        icon={<MenuRoundedIcon/>} 
                        size="xs" 
                        hoverEffect="opacity"
                        sx={{ marginTop: "8px" }}
                        onClick={sidebar.toggle}
                    />
                    {sidebar.isMini ? null : <Logo/>}
                </Stack>

                <Stack 
                  width="100%"
                  direction="row"
                  alignItems="center"
                  gap={spacing("in-sm")}
                  sx={{ marginTop: isMobile ? 1 : 0 }}
                  justifyContent={isMobile ? "flex-end" : "space-between"}
                >
                  <SearchField placeholder="What are you looking for ?" />
                  <Settings/>
                </Stack>
            </Stack>
          </AppBar>
        </Box>
    )
}