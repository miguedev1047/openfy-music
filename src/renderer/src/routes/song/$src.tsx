import { SongView } from '@renderer/components/song-view'
import { Box } from '@renderer/components/ui/box'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/song/$src')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Box className="size-full grid place-items-center p-4 flex-1 flex-col [view-transition-name:main-content] relative overflow-hidden">
      <SongView />
    </Box>
  )
}
