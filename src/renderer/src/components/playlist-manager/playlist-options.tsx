import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@renderer/components/ui/dropdown-menu'
import {
  PlaylistActions,
  usePlaylistActionsStore,
  usePlaylistActiveStore
} from '@renderer/store/use-playlist-manager-store'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@renderer/components/ui/alert-dialog'
import { Trash, Ellipsis, Pencil } from 'lucide-react'
import { Plus } from 'lucide-react'
import { playlistName, PlaylistName } from '@schemas/index'
import { playlistsFoldersQueryOptions } from '@renderer/queries/use-query-playlist'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@renderer/components/ui/input'
import { toast } from 'sonner'
import { Button } from '@renderer/components/ui/button'
import { MouseEventProps } from './_types'
import { PlaylistFolderProps } from '@shared/models'
import { useState, useTransition } from 'react'
import { useConfig } from '@renderer/queries/use-query-data'

const onPreventClick = (e: MouseEventProps) => e.stopPropagation()

export function PlaylistOptions(props: PlaylistFolderProps) {
  const { playlist } = props

  const setSelectedAction = usePlaylistActionsStore((state) => state.setSelectedAction)
  const setSelectedPlaylist = usePlaylistActionsStore((state) => state.setSelectedPlaylist)

  const handleSelectOption = (opts: PlaylistActions) => {
    setSelectedAction(opts)
    setSelectedPlaylist(playlist)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" onClick={onPreventClick} size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={onPreventClick}>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={() => handleSelectOption('rename')}>
              <Pencil />
              Renombrar
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={() => handleSelectOption('remove')}>
              <Trash />
              Eliminar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DialogRemovePlaylist() {
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()

  const dataConfigQuery = useConfig()
  const dataConfig = dataConfigQuery.data

  const selectedManagerPlaylist = usePlaylistActionsStore((state) => state.selectedPlaylist)
  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)

  const handleDeletePlaylist = async () => {
    startTransition(async () => {
      try {
        if (selectedManagerPlaylist === dataConfig.defaultFolder) {
          toast.error('No puedes eliminar la playlist por defecto')
          return
        }

        if (selectedManagerPlaylist === activePlaylist) {
          toast.error('No puedes eliminar la playlist que estás viendo actualmente')
          return
        }

        await window.api.removePlaylist(selectedManagerPlaylist)
        queryClient.invalidateQueries(playlistsFoldersQueryOptions)
        toast.success('Playlist eliminada con éxito')
      } catch {
        toast.error('Error al eliminar la playlist')
      }
    })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Eliminar playlist</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Deseas eliminar esta playlist? Esta acción es irreversible. Todas las canciones de esta
          playlist serán eliminadas.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction disabled={isPending} onClick={handleDeletePlaylist}>
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DialogRenamePlaylist() {
  const queryClient = useQueryClient()

  const configQuery = useConfig()
  const config = configQuery.data

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)
  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  const selectedManagerPlaylist = usePlaylistActionsStore((state) => state.selectedPlaylist)

  const form = useForm<PlaylistName>({
    defaultValues: { playlistName: selectedManagerPlaylist },
    values: { playlistName: selectedManagerPlaylist },
    resolver: zodResolver(playlistName)
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const oldPlaylist = selectedManagerPlaylist
      const newPlaylist = values.playlistName

      if (selectedManagerPlaylist === config.defaultFolder) {
        toast.error('No puedes renombrar la playlist por defecto')
        return
      }

      await window.api.renamePlaylist({ oldName: oldPlaylist, newName: newPlaylist })
      queryClient.invalidateQueries(playlistsFoldersQueryOptions)

      if (selectedManagerPlaylist === activePlaylist) {
        setActivePlaylist(newPlaylist)
      }
      form.reset()
      toast.success('El nombre de la playlist ha sido actualizado')
    } catch {
      toast.error('Error al cambiar el nombre de la playlist')
    }
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Renombrar playlist</AlertDialogTitle>
        <AlertDialogDescription>
          ¿Deseas renombrar esta playlist? Introduce el nuevo nombre de la playlist.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <Form {...form}>
        <form id="rename-playlist-form" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="playlistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la playlist</FormLabel>
                <FormControl>
                  <Input
                    className="!glass-item"
                    placeholder="Nueva playlist"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button type="submit" disabled={isPending} form="rename-playlist-form">
            Confirmar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DialogAddPlaylist() {
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  const form = useForm<PlaylistName>({
    defaultValues: { playlistName: 'Nueva playlist' },
    resolver: zodResolver(playlistName)
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const playlistName = values.playlistName

      await window.api.newPlaylist(playlistName)
      queryClient.invalidateQueries(playlistsFoldersQueryOptions)

      form.reset()
      setIsOpen(false)
      setActivePlaylist(playlistName)

      toast.success('Playlist creada con éxito')
    } catch {
      toast.error('Error al crear la playlist')
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva playlist</DialogTitle>
          <DialogDescription>Crea una nueva playlist para tus canciones.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="new-playlist-form" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="playlistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la playlist</FormLabel>
                  <FormControl>
                    <Input
                      className="!glass-item"
                      placeholder="Nueva playlist"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button form="new-playlist-form" type="submit" disabled={isPending}>
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
