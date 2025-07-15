import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { SongColorBackground } from '@renderer/components/song-color-background'
import { SongPlayer } from '@renderer/components/song-player/_index'
import { Button } from '@renderer/components/ui/button'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@renderer/components/ui/sonner'
import { MainHeader } from '@renderer/components/main-header'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SongsManager } from '@renderer/components/songs-manager'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => (
    <main className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="glass-item p-5 w-[440px] text-center mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-center">Ruta no encontrada</h2>
        <Button asChild>
          <Link to="/">Volver</Link>
        </Button>
      </div>
    </main>
  ),
  errorComponent: () => (
    <main className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="glass-item p-5 w-[440px] text-center mx-auto space-y-2">
        <h2 className="text-2xl font-bold text-center">¡Oh, no! Algo salió mal</h2>

        <p className="text-pretty">Ha ocurrido un error desconocido</p>

        <Button asChild>
          <Link to="/">Reiniciar</Link>
        </Button>
      </div>
    </main>
  )
})

export default function RootComponent() {
  return (
    <SongsManager>
      <SongColorBackground className="w-full h-screen overflow-hidden p-3 select-none">
        <main className="w-full h-full flex flex-col gap-3">
          <MainHeader />

          <Outlet />

          <SongPlayer />
        </main>
      </SongColorBackground>

      <Toaster position='top-center' richColors />

      <ReactQueryDevtools />
      {/* <TanStackRouterDevtools /> */}
    </SongsManager>
  )
}
