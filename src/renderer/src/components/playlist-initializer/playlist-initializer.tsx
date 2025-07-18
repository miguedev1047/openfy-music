import { useConfig } from '@renderer/queries/use-query-data'
import { useSongsPlaylist } from '@renderer/queries/use-query-songs'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'
import { useEffect } from 'react'

export function PlaylistInitializer({ ...props }: React.ComponentProps<'div'>) {
  const configDataQuery = useConfig()
  const configData = configDataQuery.data

  const activePlaylist = usePlaylistActiveStore((state) => state.activePlaylist)
  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  useSongsPlaylist(activePlaylist)

  useEffect(() => {
    if (activePlaylist) return
    setActivePlaylist(configData.defaultFolder)
  }, [])

  return <div {...props} />
}
