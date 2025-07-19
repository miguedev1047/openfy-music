import { SelectItem } from '@renderer/components/ui/select'
import { usePlaylistFolders } from '@renderer/queries/use-query-playlist'
import { FolderIcon } from 'lucide-react'

export function PlaylistFolderItems() {
  const playlistFoldersQuery = usePlaylistFolders()
  const playlistFolders = playlistFoldersQuery.data ?? []

  return playlistFolders.map((folder) => (
    <SelectItem value={folder.playlist} key={folder.playlist}>
      <FolderIcon />
      <p>{folder.title}</p>
    </SelectItem>
  ))
}
