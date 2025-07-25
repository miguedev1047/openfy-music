import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@renderer/components/ui/alert-dialog'
import { Button } from '@renderer/components/ui/button'
import { Ellipsis, Trash2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelectedSongStore } from '@renderer/store/use-player-store'
import { toast } from 'sonner'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'
import { SongItemProps } from '@shared/models'
import { useTranslation } from 'react-i18next'

export function SongOptions(props: SongItemProps) {
  const { filename, id } = props
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)

  const onPreventClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  const onRemoveSong = async () => {
    try {
      if (!selectedSong) {
        toast.error(t('songActions.toasts.errorMessages.noSongSelected'))
        return
      }

      if (selectedSong.id === id) {
        toast.error(t('songActions.toasts.errorMessages.cannotDeletePlayingSong'))
        return
      }

      await window.api.removeSong({
        id: id,
        filename: filename,
        playlist: activePlaylist
      })

      toast.success(t('songActions.toasts.successMessages.deleted'))
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    } catch {
      toast.error(t('songActions.toasts.errorMessages.general'))
    }
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={onPreventClick} side="left">
          <DropdownMenuLabel>{t('songActions.title')}</DropdownMenuLabel>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 />
              {t('songActions.confirmDeleteDialog.title')}
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent onClick={onPreventClick}>
        <AlertDialogHeader>
          <AlertDialogTitle> {t('songActions.confirmDeleteDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('songActions.confirmDeleteDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('songActions.confirmDeleteDialog.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onRemoveSong}>
            {t('songActions.confirmDeleteDialog.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
