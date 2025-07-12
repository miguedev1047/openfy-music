import { memo, useRef } from 'react'
import { SongItem } from '@renderer/routes/(index)/-components/song-item'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { songsQueryOptions } from '@renderer/queries/use-query-songs'
import { useFilterSongs } from '@renderer/store/use-filter-songs'
import { filterItems } from '@renderer/helpers/filter-items'
import { EmptySongsState } from '@renderer/components/empty-songs-state'

const MemoizedSongItem = memo(SongItem)

export function SongList() {
  const songsQuery = useSuspenseQuery(songsQueryOptions)
  const songs = songsQuery.data
  const parentRef = useRef<HTMLDivElement>(null)

  const search = useFilterSongs((state) => state.search)
  const filteredItems = filterItems(songs, search)

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100
  })

  const items = rowVirtualizer.getVirtualItems()

  if (!filteredItems.length) {
    return <EmptySongsState message="No se encontraron canciones que coincidan con tu búsqueda" />
  }

  return (
    <div
      ref={parentRef}
      className="pb-12 pr-4 px-4 pt-4 glass-item w-1/2 h-full overflow-auto scrollbar-thin scrollbar-thumb-[#00000000]"
    >
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
    </div>
  )
}
