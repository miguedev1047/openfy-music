import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'
import { usePlaylistSelectedStore } from '@renderer/store/use-playlist-selected'

export function OpenFolderButton() {
  const selectedPlaylist = usePlaylistSelectedStore((state) => state.playlist)
  const onOpenFolder = () => window.api.openSongFolder(selectedPlaylist)

  if (!selectedPlaylist) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={onOpenFolder}>
            <FolderIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Abrir carpeta de la playlist: <strong>{selectedPlaylist}</strong>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

