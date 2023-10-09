import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@design-system/theme';
import { AppBar, Stack, Toolbar, alpha } from '@mui/material';
import { ReactComponent as Logo } from '@design-system/assets/logo.svg';
import { ActionButton } from '@design-system/components/inputs/action-button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '@design-system/hooks/use-is-mobile';
import { MiniContext } from '@design-system/components/navigation/base-sidebar/context/mini-context';
import { SearchField } from '@design-system/components/inputs/search-field';

const DEFAULT_WIDTH = 300;
const MINI_WIDTH = 100;

export interface BaseSidebarProps {
  children?: ReactNode
  content?: ReactNode
  onResize?: () => void
}

export function BaseSidebar(props: BaseSidebarProps) {
  const { children, content, onResize } = props;

  const [open, setOpen] = useState(false)
  const [mini, setMini] = useState(false)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  
  const { palette, spacing, theme } = useTheme()
  const isMobile = useIsMobile("md")

  const handleDrawerToggle = () => {
    if (!isMobile) {
      setWidth(!mini ? MINI_WIDTH : DEFAULT_WIDTH)
      setMini(!mini)
    } else {
      setOpen(!open)
      setMini(false)
    }
  };

  const handleResize = () => {
    setOpen(false)
    setMini(false)
    setWidth(DEFAULT_WIDTH)
    onResize?.()
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const search = (
    <SearchField placeholder="What are you looking for?" />
  )

  const drawer = (
    <MiniContext.Provider value={mini}>
      <Stack direction="column" marginTop={isMobile ? "4em" : 0}>
        {children}
      </Stack>
    </MiniContext.Provider>
  )
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { md: width }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          container={window.document.body}
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'flex', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              backgroundColor: palette("sr-100"), 
              width,
              overflow: "auto",
              borderRight: `2px solid ${palette("sr-300")}`
            },
          }}
        >
          <SidebarHeader 
            onDrawerToggle={handleDrawerToggle} 
            mini={mini}
            search={search}
            disableSearch
          />
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'flex' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              backgroundColor: palette("sr-100"), 
              width,
              overflow: "hidden",
              height: `calc(100% - ${theme("components.player.compact.height")})`,
              borderRight: `2px solid ${palette("sr-300")}`
            }
          }}
          open={open}
        >
          <SidebarHeader 
            onDrawerToggle={handleDrawerToggle} 
            mini={mini}
            search={search}
          />
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { xs: "100%", md: `calc(100% - ${width}px)` },
          minHeight: "100vh", 
          background: palette("bc-body")
        }}
      >
        {isMobile ? (
          <SidebarHeader 
            onDrawerToggle={handleDrawerToggle} 
            mini={mini}
            search={search}
          />
        ) : null}
        
        <Box 
          sx={{ 
            display: { xs: 'none', md: "flex" }, 
            width: "100%", 
            position: "fixed", 
            zIndex: 1000
          }}
        >
          <AppBar 
            component="nav" 
            position="absolute" 
            elevation={0}
            sx={{ 
              backgroundColor: alpha(palette("sr-200"), 0.9), 
              padding: spacing("in-xxs"),
              backdropFilter: "blur(5px)",
              borderBottom: `2px solid ${palette("sr-300")}`
            }}
          >
            <Toolbar>
              {search}
            </Toolbar>
          </AppBar>
        </Box>

        <Stack
          gap={spacing("st-md")}
          sx={{
            padding: spacing("st-md"),
            paddingTop: spacing("st-xl", 1.5),
            paddingBottom: spacing("st-xl", 2),
            position: "relative",
          }}
        >
          {content}
        </Stack>
      </Box>
    </Box>
  );
}

interface SidebarHeaderProps {
  mini?: boolean
  onDrawerToggle: () => void
  search: ReactNode
  disableSearch?: boolean
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { 
    mini, 
    onDrawerToggle, 
    search,
    disableSearch = false 
  } = props

  const { palette, spacing } = useTheme()
  const isMobile = useIsMobile("md")

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent={mini ? "center" : "space-between"}
      sx={{
        padding: spacing("st-xs"),
        paddingBottom: spacing("st-sm"),
        backgroundColor: palette("sr-100"),
        width: "100%",
        position: isMobile ? "absolute" : "static",
        zIndex: 1000
      }}
    >
      <Stack direction="row" gap={spacing("in-sm")}>
        <ActionButton 
          icon={<MenuRoundedIcon/>} 
          size="xs" 
          hoverEffect="opacity"
          sx={{ marginTop: "8px" }}
          onClick={onDrawerToggle}
        />
        {mini ? null : <Logo/>}
      </Stack>

      <Box 
        display={{ xs: disableSearch ? "none" : "flex", md: "none" }} 
        sx={{ marginTop: 1 }}
      >
        {search}
      </Box>
    </Stack>
  )
}

export { BaseSidebarSection } from './components/base-sidebar-section';
export { BaseSidebarItem } from './components/base-sidebar-item';