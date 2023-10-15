import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@design-system/theme';
import { Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useIsMobile } from '@design-system/hooks/use-is-mobile';
import { useOnResize } from '@design-system/hooks/use-on-resize';
import { SidebarProvider } from '@design-system/components/navigation/base-sidebar/context';

export interface BaseSidebarProps {
  /** Content of the main section */
  children?: ReactNode
  /** Header of the sidebar */
  header?: ReactNode
  /** Content of the sidebar */
  content?: ReactNode
}

// Constants
const DEFAULT_WIDTH = 300
const MINI_WIDTH = 100

export function BaseSidebar(props: BaseSidebarProps) {
  const { children, header, content } = props;

  const { palette, theme } = useTheme()
  const isMobile = useIsMobile("md")
  const inMiniMode = !isMobile && localStorage.getItem("mini") === "true"

  const [open, setOpen] = useState(false)
  const [miniMode, setMiniMode] = useState(inMiniMode)
  const [width, setWidth] = useState(inMiniMode ? MINI_WIDTH : DEFAULT_WIDTH)

  /** 
   * Toggles the sidebar between mini and default mode
   * Used when in desktop.
  */
  const _toggleMiniMode = () => {
    setWidth(!miniMode ? MINI_WIDTH : DEFAULT_WIDTH)
    setMiniMode(!miniMode)
    localStorage.setItem("mini", (!miniMode).toString())
  }
  
  /** 
   * Toggles the sidebar between open and closed mode
   * Used when in mobile.
  */
  const _toggleOpenMode = () => {
    setOpen(!open)
    setMiniMode(false)
  }

  /** 
   * Chooses the correct toggle function based on the device
  */
  const handleToggle = () => {
    if (!isMobile) {
      _toggleMiniMode()
    } else {
      _toggleOpenMode()
    }
  };

  /** 
   * On resize, the sidebar is closed and mini mode is disabled
  */
  const handleResize = () => {
    setOpen(false)
    setMiniMode(false)
    setWidth(DEFAULT_WIDTH)
  }

  useOnResize(handleResize)
  
  return (
    <SidebarProvider 
      isMini={miniMode} 
      toggle={handleToggle} 
      width={width}
    >
      <Stack direction="row">
        <Box
          component="nav"
          sx={{ width: { md: width }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant="temporary"
            container={window.document.body}
            open={open}
            onClose={handleToggle}
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
            {header}
            {content}
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
            {header}
            {content}
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
          {children}
        </Box>
      </Stack>
    </SidebarProvider>
  );
}

export { BaseSidebarSection } from './components/base-sidebar-section';
export { BaseSidebarItem } from './components/base-sidebar-item';