import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { DominantColorProvider } from './design-system/context/dominant-color-context.tsx'
import { ThemeProvider } from '@design-system/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { routes } from './pages/routes.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HotToaster } from '@components/hot-toaster/index.tsx'
import { PlayerProvider } from '@components/player/context/player-context.tsx'
import { PlaylistProvider } from '@components/player/context/playlist-context.tsx'
import { ScrollStyle } from './shared/utils/ScrollStyle.tsx'
import './i18n'
import { LanguageProvider } from './i18n/context'
import './main.css'

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
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ScrollStyle/>
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
    </LanguageProvider>
  </>,
)
