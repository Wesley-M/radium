import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
import { DominantColorProvider } from './context/dominant-color-context.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@design-system/theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DominantColorProvider>
          <App />
        </DominantColorProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
