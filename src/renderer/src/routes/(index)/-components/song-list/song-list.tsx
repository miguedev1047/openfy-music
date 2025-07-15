import { memo, useRef } from 'react'
import { SongItem } from '@renderer/routes/(index)/-components/song-item'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useSongsPlaylist } from '@renderer/queries/use-query-songs'
import { useFilterSongs } from '@renderer/store/use-filter-songs'
import { filterItems } from '@renderer/helpers/filter-items'
import { usePlaylistSelectedStore } from '@renderer/store/use-playlist-selected'
import { ScrollContainer } from '@renderer/components/scroll-container'
import { LoadingSongs } from '@renderer/components/ui-states/_index'
import { ErrorLoadSongs } from '@renderer/components/ui-states/error'
import { EmptySongsState } from '@renderer/components/ui-states/empty'

const MemoizedSongItem = memo(SongItem)

export function useSongList() {
  const selectedPlaylist = usePlaylistSelectedStore((state) => state.playlist)

  const songsQuery = useSongsPlaylist(selectedPlaylist)
  const songs = songsQuery.data ?? []

  const parentRef = useRef<HTMLDivElement>(null)

  const search = useFilterSongs((state) => state.search)
  const filteredItems = filterItems(songs, search)

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100
  })

  const items = rowVirtualizer.getVirtualItems()

  return { selectedPlaylist, songsQuery, songs, parentRef, filteredItems, rowVirtualizer, items }
}

export function SongList() {
  const { selectedPlaylist, songsQuery, songs, parentRef, filteredItems, rowVirtualizer, items } =
    useSongList()

  if (songsQuery.isLoading) {
    return <LoadingSongs />
  }

  if (songsQuery.isError || !songsQuery) {
    return <ErrorLoadSongs />
  }

  if (!selectedPlaylist) {
    return <EmptySongsState message="Selecciona o crea una playlist" />
  }

  if (!songs.length) {
    return <EmptySongsState message="No hay canciones en esta playlist" />
  }

  if (!filteredItems.length) {
    return <EmptySongsState message="No se encontraron canciones que coincidan con tu búsqueda" />
  }

  return (
    <ScrollContainer ref={parentRef}>
      <div
        className="relative"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%'
        }}
      >
        <div
          className="absolute left-0 right-0 space-y-1"
          style={{
            transform: `translateY(${items[0]?.start ?? 0}px)`
          }}
        >
          {items.map(({ index, key }) => {
            const song = { ...filteredItems[index], index }

            return (
              <div key={key} data-index={index} ref={rowVirtualizer.measureElement}>
                <MemoizedSongItem {...song} />
              </div>
            )
          })}
        </div>
      </div>
    </ScrollContainer>
  )
}
