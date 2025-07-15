import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { AlertDialog } from '@renderer/components/ui/alert-dialog'
import { Check, Folder } from 'lucide-react'
import { playlistsFoldersQueryOptions } from '@renderer/queries/use-query-playlist'
import { useQuery } from '@tanstack/react-query'
import { usePlaylistSelectedStore } from '@renderer/store/use-playlist-selected'
import { usePlaylistManagerStore } from '@renderer/store/use-playlist-manager-store'
import { DialogRemovePlaylist, DialogRenamePlaylist, PlaylistOptions } from './playlist-options'
import { useDataConfig } from '@renderer/queries/use-query-data'

export function PlaylistFolders() {
  const configDataQuery = useDataConfig()
  const configData = configDataQuery.data

  const playlistFoldersQuery = useQuery(playlistsFoldersQueryOptions)
  const playlistFolders = playlistFoldersQuery.data ?? []

  const playlist = usePlaylistSelectedStore((state) => state.playlist)
  const setPlaylist = usePlaylistSelectedStore((state) => state.setPlaylist)

  const setIsOpen = usePlaylistManagerStore((state) => state.setIsOpen)
  const selectedManagerOption = usePlaylistManagerStore((state) => state.selectedOption)

  const onChangeFolder = (value: string) => {
    const folder = playlistFolders.find((folder) => folder.playlist === value)
    if (!folder) return
    setPlaylist(value)
  }

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

  const FOLDER_ITEMS = playlistFolders.map((folder) => {
    const isChecked = playlist === folder.playlist
    const isDefaultPlaylist = folder.playlist === configData.defaultFolder

    const Checked = () => (isChecked ? <Check size={16} className="absolute left-2" /> : null)

    const onSelectFolder = (value: string) => {
      onChangeFolder(value === playlist ? '' : value)
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

  return (
    <AlertDialog>
      <Command>
        <CommandInput placeholder="Busca una playlist..." />
        <CommandList className="scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-(--radius)">
          <CommandEmpty>No hay playlists disponibles.</CommandEmpty>
          <CommandGroup>{FOLDER_ITEMS}</CommandGroup>
        </CommandList>
      </Command>
      <DialogContent />
    </AlertDialog>
  )
}
