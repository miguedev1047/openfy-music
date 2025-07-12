import { EmptySongsStateProps } from '@renderer/components/empty-songs-state/empty-songs.props'
import { OpenFolderButton } from '@renderer/components/open-folder-button'

export function EmptySongsState({
  message = 'No hay canciones disponibles'
}: EmptySongsStateProps) {
  return (
    <div className="glass-item w-1/2 h-full flex flex-col items-center justify-center py-12 text-center">
      <div className="w-1/2 mx-auto space-y-4">
        <OpenFolderButton />
        <p className="text-lg font-bold text-pretty">{message}</p>
      </div>
    </div>
  )
}
