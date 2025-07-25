import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'
import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'
import { handlePlaylistFolder } from '@renderer/helpers/open-folder'
import { useTranslation } from 'react-i18next'

export function OpenPlaylistFolderButton() {
  const { t } = useTranslation()
  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)
  if (!activePlaylist) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handlePlaylistFolder(activePlaylist)}
          >
            <FolderIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {t('tooltips.openFolder')} <strong>{activePlaylist}</strong>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
