import '@renderer/styles/main.css'
import '@renderer/styles/view-transitions.css'

import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AudioRefProvider } from '@renderer/providers/audio-ref-provider'
import { ThemeProvider } from '@renderer/providers/theme-provider'
import { ActiveThemeProvider } from '@renderer/components/ui/active-theme'

import './i18next'

scan({ enabled: process.env.NODE_ENV === 'development' })

const memoryHistory = createHashHistory()

// Import the generated route tree
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

// Create a new router instance
const router = createRouter({
  routeTree,
  history: memoryHistory,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultStaleTime: 0,
  scrollRestoration: true
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ActiveThemeProvider>
            <AudioRefProvider>
              <RouterProvider router={router} />
            </AudioRefProvider>
          </ActiveThemeProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
