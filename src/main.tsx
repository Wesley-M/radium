import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { DominantColorProvider } from './shared/context/dominant-color-context.tsx'
import { ThemeProvider } from '@design-system/theme'
import { PlayerProvider } from '@context/player-context'
import { PlaylistProvider } from '@context/playlist-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import "./main.css"
import { routes } from './pages/routes.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HotToaster } from '@design-system/components/data-display/hot-toaster/index.tsx'

const queryClient = new QueryClient()

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

persistQueryClient({
  queryClient,
  persister,
})

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
  </React.StrictMode>,
)
