import '@renderer/styles/main.css'
import '@renderer/styles/view-transitions.css'
import '@renderer/styles/general-styles.css'

import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AudioRefProvider } from '@renderer/providers/audio-ref-provider'

scan({ enabled: process.env.NODE_ENV === 'development' })

const memoryHistory = createMemoryHistory({
  initialEntries: ['/']
})

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
      <QueryClientProvider client={queryClient}>
        <AudioRefProvider>
          <RouterProvider router={router} />
        </AudioRefProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
