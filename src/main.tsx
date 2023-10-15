import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { DominantColorProvider } from './design-system/context/dominant-color-context.tsx'
import { ThemeProvider } from '@design-system/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { routes } from './pages/routes.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HotToaster } from '@design-system/components/data-display/hot-toaster/index.tsx'
import { PlayerProvider } from '@design-system/components/player/context/player-context.tsx'
import { PlaylistProvider } from '@design-system/components/player/context/playlist-context.tsx'
import { GlobalStyle } from './GlobalStyle.tsx'

const queryClient = new QueryClient()

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

persistQueryClient({
  queryClient,
  persister,
})

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle/>
        <DominantColorProvider>
          <PlaylistProvider>
            <PlayerProvider>
              <RouterProvider router={router} />
            </PlayerProvider>
          </PlaylistProvider>
        </DominantColorProvider>
        <HotToaster/>
      </ThemeProvider>
    </QueryClientProvider>
  </>,
)
