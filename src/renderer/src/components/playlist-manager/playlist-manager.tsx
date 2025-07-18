import {
  usePlaylistActionsStore,
  usePlaylistActiveStore
} from '@renderer/store/use-playlist-manager-store'
import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { usePlaylistFolders } from '@renderer/queries/use-query-playlist'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { PlaylistFolders } from '@renderer/components/playlist-manager/playlist-folders'
import { Skeleton } from '../ui/skeleton'

export function PlaylistManager() {
  const playlistFoldersQuery = usePlaylistFolders()
  const playlistFolders = playlistFoldersQuery.data

  const isOpen = usePlaylistActionsStore((state) => state.isOpen)
  const setIsOpen = usePlaylistActionsStore((state) => state.setIsOpen)

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)

  if (playlistFoldersQuery.isLoading) {
    return <Skeleton className="w-full h-8" />
  }

  if (playlistFoldersQuery.isError || !playlistFolders) {
    return <Skeleton className="w-full h-8" />
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="bg-background hover:bg-background border-input flex-1 justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn('truncate', !activePlaylist && 'text-muted-foreground')}>
            {activePlaylist
              ? playlistFolders.find((folder) => folder.playlist === activePlaylist)?.playlist
              : 'Selecciona una playlist'}
          </span>
          <ChevronDown size={16} className="text-muted-foreground/80 shrink-0" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <PlaylistFolders />
      </PopoverContent>
    </Popover>
  )
}
