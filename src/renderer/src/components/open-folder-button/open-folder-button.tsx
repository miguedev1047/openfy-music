import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'

export function OpenFolderButton() {
  const onOpenFolder = () => window.api.openSongFolder()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={onOpenFolder}>
            <FolderIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Abrir carpeta de canciones</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
