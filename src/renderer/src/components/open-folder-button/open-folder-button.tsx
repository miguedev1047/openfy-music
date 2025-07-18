
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'
import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'

export function OpenFolderButton() {
  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)
  const onOpenFolder = () => window.api.openSongFolder(activePlaylist)

  if (!activePlaylist) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={onOpenFolder}>
            <FolderIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Abrir carpeta de la playlist: <strong>{activePlaylist}</strong>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

