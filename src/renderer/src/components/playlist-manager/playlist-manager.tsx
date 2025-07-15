import { ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { usePlaylistFolders } from '@renderer/queries/use-query-playlist'
import { usePlaylistSelectedStore } from '@renderer/store/use-playlist-selected'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { usePlaylistManagerStore } from '@renderer/store/use-playlist-manager-store'
import { PlaylistFolders } from '@renderer/components/playlist-manager/playlist-folders'

export function PlaylistManager() {
  const { data: playlistFolders, isLoading, isError } = usePlaylistFolders()

  const isOpen = usePlaylistManagerStore((state) => state.isOpen)
  const setIsOpen = usePlaylistManagerStore((state) => state.setIsOpen)

  const playlist = usePlaylistSelectedStore((state) => state.playlist)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError || !playlistFolders) {
    return <div>Error</div>
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="bg-background hover:bg-background border-input flex-1 justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn('truncate', !playlist && 'text-muted-foreground')}>
            {playlist
              ? playlistFolders.find((folder) => folder.playlist === playlist)?.playlist
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