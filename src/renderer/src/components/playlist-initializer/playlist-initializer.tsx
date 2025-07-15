import { useDataConfig } from '@renderer/queries/use-query-data'
import { useSongsPlaylist } from '@renderer/queries/use-query-songs'
import { usePlaylistSelectedStore } from '@renderer/store/use-playlist-selected'
import { useEffect } from 'react'

export function PlaylistInitializer({ ...props }: React.ComponentProps<'div'>) {
  const configDataQuery = useDataConfig()
  const configData = configDataQuery.data

  const playlist = usePlaylistSelectedStore((state) => state.playlist)
  const setPlaylist = usePlaylistSelectedStore((state) => state.setPlaylist)

  useSongsPlaylist(playlist)

  useEffect(() => {
    if (playlist) return
    setPlaylist(configData.defaultFolder)
  }, [])

  return <div {...props} />
}
