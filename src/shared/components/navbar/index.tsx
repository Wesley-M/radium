import { ActionButton } from "@design-system/components/inputs/action-button"
import { SearchField } from "@components/search-field"
import { useIsMobile } from "@design-system/hooks/use-is-mobile"
import { useTheme } from "@design-system/theme"
import { AppBar, Box, Stack, alpha } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useSidebar } from "@design-system/hooks/use-sidebar"
import { Settings } from "@components/settings"
import { Logo } from "@design-system/components/data-display/logo"
import { useTranslation } from "react-i18next"
import { useIsPageTop } from "@design-system/hooks/use-is-page-top"

export const Navbar = () => {
    const { palette, spacing } = useTheme()
    const { t } = useTranslation()
    const isMobile = useIsMobile("md")

    const sidebar = useSidebar()
    const isPageTop = useIsPageTop()

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
                backgroundColor: alpha(palette("sr-100"), isPageTop ? 0 : 0.9),
                padding: `${spacing("in-xxs")} ${spacing(isMobile ? "in-sm" : "in-md")}`,
                backdropFilter: "blur(5px)",
                borderBottom: `2px solid ${isPageTop ? "transparent" : palette("sr-300")}`,
                position: isMobile ? "absolute" : "static",
                transition: "background-color 0.3s ease-in-out, border-bottom 0.3s ease-in-out",
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
                  <SearchField placeholder={t("search.placeholder")} />
                  <Settings/>
                </Stack>
            </Stack>
          </AppBar>
        </Box>
    )
}