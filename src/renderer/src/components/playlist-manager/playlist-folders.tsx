import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import {
  usePlaylistActionsStore,
  usePlaylistActiveStore
} from '@renderer/store/use-playlist-manager-store'
import { AlertDialog } from '@renderer/components/ui/alert-dialog'
import { Check, Folder } from 'lucide-react'
import { playlistsFoldersQueryOptions } from '@renderer/queries/use-query-playlist'
import { useQuery } from '@tanstack/react-query'
import { DialogRemovePlaylist, DialogRenamePlaylist, PlaylistOptions } from './playlist-options'
import { useConfig } from '@renderer/queries/use-query-data'
import { useTranslation } from 'react-i18next'

export function PlaylistFolders() {
  const { t } = useTranslation()
  const selectedManagerOption = usePlaylistActionsStore((state) => state.selectedAction)

  const DialogContent = () => {
    switch (selectedManagerOption) {
      case 'remove':
        return <DialogRemovePlaylist />
      case 'rename':
        return <DialogRenamePlaylist />
      default:
        return null
    }
  }

  return (
    <AlertDialog>
      <Command>
        <CommandInput placeholder={t('playlistManager.selector.label')} />
        <CommandList className="scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-(--radius)">
          <CommandEmpty>{t('playlistManager.uiStates.noPlaylists')}</CommandEmpty>
          <CommandGroup>
            <PlaylistFolderList />
          </CommandGroup>
        </CommandList>
      </Command>

      <DialogContent />
    </AlertDialog>
  )
}

export function PlaylistFolderList() {
  const configDataQuery = useConfig()
  const configData = configDataQuery.data

  const playlistFoldersQuery = useQuery(playlistsFoldersQueryOptions)
  const playlistFolders = playlistFoldersQuery.data ?? []

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)
  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  const setIsOpen = usePlaylistActionsStore((state) => state.setIsOpen)

  return playlistFolders.map((folder) => {
    const isChecked = activePlaylist === folder.playlist
    const isDefaultPlaylist = folder.playlist === configData.defaultFolder

    const Checked = () => (isChecked ? <Check size={16} className="absolute left-2" /> : null)

    const onChangeFolder = (value: string) => {
      const folder = playlistFolders.find((folder) => folder.playlist === value)
      if (!folder) return
      setActivePlaylist(value)
    }

    const onSelectFolder = (value: string) => {
      onChangeFolder(value === activePlaylist ? '' : value)
      setIsOpen(false)
    }

    return (
      <CommandItem
        key={folder.playlist}
        value={folder.playlist}
        onSelect={onSelectFolder}
        className="pl-8 relative justify-between group/item"
      >
        <Checked />

        <div className="flex items-center gap-2">
          <Folder />
          <p>
            {folder.title} - <span className="font-black">{folder.totalSongs}</span>{' '}
            <span>{isDefaultPlaylist && '(Por defecto)'}</span>
          </p>
        </div>

        <PlaylistOptions {...folder} />
      </CommandItem>
    )
  })
}
