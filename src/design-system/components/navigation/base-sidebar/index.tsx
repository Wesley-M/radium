import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@design-system/theme';
import { Stack } from '@mui/material';
import { ReactComponent as Logo } from '@design-system/assets/logo.svg';
import { ActionButton } from '@design-system/components/inputs/action-button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ReactNode, useEffect, useState } from 'react';
import { useIsMobile } from '@design-system/hooks/use-is-mobile';
import { MiniContext } from '@design-system/components/navigation/base-sidebar/context/mini-context';
import { Search } from '@design-system/components/inputs/search';
import { useNavigate } from "react-router-dom"

const DEFAULT_WIDTH = 300;
const MINI_WIDTH = 100;

export interface BaseSidebarProps {
  children?: ReactNode
  content?: ReactNode
}

export function BaseSidebar(props: BaseSidebarProps) {
  const { children, content } = props;

  const isMobile = useIsMobile("md")
  const navigate = useNavigate()
  const { palette, spacing } = useTheme()

  const [open, setOpen] = useState(false)
  const [mini, setMini] = useState(false)
  const [width, setWidth] = useState(DEFAULT_WIDTH)
  
  const handleSearch = (t: string) => {
    if (!t) return
    navigate(`/search?q=${t}`)
  }

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
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const search = (
    <Search 
      placeholder="Search for stations or tags" 
      onEnter={handleSearch}
    />
  )

  const header = (
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent={mini ? "center" : "space-between"}
      sx={{
        padding: spacing("st-xs"),
        paddingBottom: spacing("st-sm"),
        backgroundColor: palette("sr-100"),
        width: "100%"
      }}
    >
      <Stack direction="row" gap={spacing("in-sm")}>
        <ActionButton 
          icon={<MenuRoundedIcon/>} 
          size="xs" 
          hoverEffect="opacity"
          sx={{ marginTop: "8px" }}
          onClick={handleDrawerToggle}
        />
        {mini ? null : <Logo/>}
      </Stack>

      <Box display={{ xs: 'flex', md: "none" }} sx={{ marginTop: 1 }}>
        {search}
      </Box>
    </Stack>
  )

  const drawer = (
    <>
      {header}
      <MiniContext.Provider value={mini}>
        <Stack direction="column">
          {children}
        </Stack>
      </MiniContext.Provider>
    </>
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
              borderRight: `2px solid ${palette("sr-300")}`
            }
          }}
          open={open}
        >
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
        {isMobile ? header : null}
        <Stack
          gap={spacing("st-md")}
          sx={{
            padding: spacing("st-md"),
            paddingTop: spacing("st-sm"),
            paddingBottom: spacing("st-xl", 2),
          }}
        >
          <Box display={{ xs: 'none', md: "flex" }}>
            {search}
          </Box>
          {content}
        </Stack>
      </Box>
    </Box>
  );
}

export { BaseSidebarSection } from './components/base-sidebar-section';
export { BaseSidebarItem } from './components/base-sidebar-item';