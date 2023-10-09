import 'simplebar-react/dist/simplebar.min.css'
import '@design-system/components/surfaces/scroll/scroll-style.css'
import { Sidebar } from '@components/sidebar'
import { Player } from '@components/player'
import { Outlet } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { Stack } from '@mui/material'
import { useTheme } from '@design-system/theme'
import { useIsMobile } from '@design-system/hooks/use-is-mobile'

export function App() { 
  const { palette, spacing, theme } = useTheme()
  const isMobile = useIsMobile()
  
  return (
    <QueryParamProvider 
      adapter={ReactRouter6Adapter}
      options={{ removeDefaultsFromUrl: true }}
    >
      <Stack 
        gap={spacing("st-xs")} 
        sx={{ 
          width: "100%", 
          height: "100%",
          backgroundColor: palette("sr-100") 
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: isMobile ? "100%" : `calc(100% - ${theme("components.player.compact.height")})`,
            overflow: "auto",
          }}
        >
          <Sidebar content={<Outlet/>}/>
        </Stack>

        <Stack
          sx={{
            width: "100%",
            height: isMobile ? 0 : `calc(${theme("components.player.compact.height")} - ${spacing("st-xs")})`,
          }}
        >
          <Player/>
        </Stack>
      </Stack>
    </QueryParamProvider>
  )
}
  
export default App
  