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

export function SongOptions(props: SongItemProps) {
  const { filename, id } = props

  const queryClient = useQueryClient()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)

  const onPreventClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  const onRemoveSong = async () => {
    try {
      if (!selectedSong) {
        toast.error('No hay ninguna canción seleccionada')
        return
      }

      if (selectedSong.id === id) {
        toast.error('No puedes eliminar la canción que estas reproduciendo')
        return
      }

      await window.api.removeSong({
        id: id,
        filename: filename,
        playlist: activePlaylist
      })

      toast.success('Canción eliminada')
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    } catch {
      toast.error('Error al eliminar la canción')
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
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 />
              Eliminar canción
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent onClick={onPreventClick}>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar anción</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Deseas eliminar esta canción? Esta acción es irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onRemoveSong}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
