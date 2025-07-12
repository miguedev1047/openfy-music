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
import { useNextButton } from '@renderer/components/song-player/next-button'

export function SongOptions() {
  const { onNextSong } = useNextButton()

  const queryClient = useQueryClient()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const onPreventClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  const onDeleteSong = async () => {
    try {
      if (!selectedSong) {
        toast.error('Esta cancion no se podido encontrar')
        return
      }

      onNextSong()

      await window.api.removeSong({
        songHashId: selectedSong.id,
        filename: selectedSong.src
      })

      toast.success('Cancion eliminada!')

      queryClient.invalidateQueries({ queryKey: ['songs'] })
    } catch {
      toast.error('Error al eliminar la cancion')
    }
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute left-4 inset-y-0 flex items-center h-full z-10">
            <Button size="icon">
              <Ellipsis />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={onPreventClick} side="left" className="!glass-item">
          <DropdownMenuLabel className="text-muted">Opciones</DropdownMenuLabel>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="text-muted" />
              Eliminar canción
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent onClick={onPreventClick} className="!glass-item">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar anción</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            ¿Deseas eliminar esta canción? Esta acción es irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteSong}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
