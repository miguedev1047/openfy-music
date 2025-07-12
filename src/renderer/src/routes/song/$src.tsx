import { SongView } from '@renderer/components/song-view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/song/$src')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="glass-item size-full grid place-items-center p-4 flex-1 flex-col [view-transition-name:main-content] relative">
      <SongView />
    </div>
  )
}
