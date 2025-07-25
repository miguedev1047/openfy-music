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
import { useTranslation } from 'react-i18next'

const onPreventClick = (e: MouseEventProps) => e.stopPropagation()

export function PlaylistOptions(props: PlaylistFolderProps) {
  const { t } = useTranslation()
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
        <DropdownMenuLabel>{t('playlistDialogs.optionsMenu.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={() => handleSelectOption('rename')}>
              <Pencil />
              {t('playlistDialogs.optionsMenu.rename.label')}
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={() => handleSelectOption('remove')}>
              <Trash />
              {t('playlistDialogs.optionsMenu.delete.label')}
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DialogRemovePlaylist() {
  const { t } = useTranslation()
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
          toast.error(t('playlistDialogs.optionsMenu.delete.toasts.errors.cannotDeleteDefault'))
          return
        }

        if (selectedManagerPlaylist === activePlaylist) {
          toast.error(t('playlistDialogs.optionsMenu.delete.toasts.errors.cannotDeleteCurrent'))
          return
        }

        await window.api.removePlaylist(selectedManagerPlaylist)
        queryClient.invalidateQueries(playlistsFoldersQueryOptions)
        toast.success(t('playlistDialogs.optionsMenu.delete.toasts.success.message'))
      } catch {
        toast.error(t('playlistDialogs.optionsMenu.delete.toasts.errors.general'))
      }
    })
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('playlistDialogs.optionsMenu.delete.title')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t('playlistDialogs.optionsMenu.delete.description')}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{t('playlistDialogs.optionsMenu.delete.cancel')}</AlertDialogCancel>
        <AlertDialogAction disabled={isPending} onClick={handleDeletePlaylist}>
          {t('playlistDialogs.optionsMenu.delete.confirm')}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DialogRenamePlaylist() {
  const { t } = useTranslation()
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
        toast.error(t('playlistDialogs.optionsMenu.rename.toasts.errors.cannotRenameDefault'))
        return
      }

      await window.api.renamePlaylist({ oldName: oldPlaylist, newName: newPlaylist })
      queryClient.invalidateQueries(playlistsFoldersQueryOptions)

      if (selectedManagerPlaylist === activePlaylist) {
        setActivePlaylist(newPlaylist)
      }
      form.reset()
      toast.success(t('playlistDialogs.optionsMenu.rename.toasts.success.message'))
    } catch {
      toast.error(t('playlistDialogs.optionsMenu.rename.toasts.errors.general'))
    }
  })

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{t('playlistDialogs.optionsMenu.rename.title')}</AlertDialogTitle>
        <AlertDialogDescription>
          {t('playlistDialogs.optionsMenu.rename.description')}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <Form {...form}>
        <form id="rename-playlist-form" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="playlistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('playlistDialogs.optionsMenu.rename.form.fields.name.title')}
                </FormLabel>
                <FormControl>
                  <Input
                    className="!glass-item"
                    placeholder={t(
                      'playlistDialogs.optionsMenu.rename.form.fields.name.placeholder'
                    )}
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
        <AlertDialogCancel>{t('playlistDialogs.optionsMenu.rename.cancel')}</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button type="submit" disabled={isPending} form="rename-playlist-form">
            {t('playlistDialogs.optionsMenu.rename.confirm')}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export function DialogAddPlaylist() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  const form = useForm<PlaylistName>({
    defaultValues: { playlistName: t('playlistDialogs.optionsMenu.create.label') },
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

      toast.success(t('playlistDialogs.optionsMenu.create.toasts.success.message'))
    } catch {
      toast.error(t('playlistDialogs.optionsMenu.create.toasts.errors.message'))
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant='outline'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('playlistDialogs.optionsMenu.create.title')}</DialogTitle>
          <DialogDescription>
            {t('playlistDialogs.optionsMenu.create.description')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="new-playlist-form" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="playlistName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('playlistDialogs.optionsMenu.create.form.fields.name.title')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="!glass-item"
                      placeholder={t(
                        'playlistDialogs.optionsMenu.create.form.fields.name.placeholder'
                      )}
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
              {t('playlistDialogs.optionsMenu.create.cancel')}
            </Button>
          </DialogClose>

          <Button form="new-playlist-form" type="submit" disabled={isPending}>
            {t('playlistDialogs.optionsMenu.create.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
