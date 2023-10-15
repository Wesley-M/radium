import { Sidebar } from '@design-system/components/navigation/sidebar'
import { Player } from '@design-system/components/player'
import { Outlet } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { Stack } from '@mui/material'
import { useTheme } from '@design-system/theme'
import { useIsMobile } from '@design-system/hooks/use-is-mobile'
import { useRef } from 'react';
import { ScrollProvider } from '@design-system/context/scroll-context';

export function App() { 
  const { palette, spacing, theme } = useTheme()
  const isMobile = useIsMobile()

  const ref = useRef<HTMLDivElement>(null)

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
        <ScrollProvider scrollRef={ref}>
          <Stack
            sx={{
              width: "100%",
              height: isMobile ? "100%" : `calc(100% - ${theme("components.player.compact.height")})`,
            }}
            ref={ref}
          >
            <Sidebar>
              <Outlet/>
            </Sidebar>
          </Stack>
        </ScrollProvider>

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
  