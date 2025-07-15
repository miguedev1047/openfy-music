import { queryOptions, useQuery } from '@tanstack/react-query'

export const getSongByPlaylist = async (playlistName: string) => {
  const data = await window.api.getSongsPlaylist(playlistName)
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data
}

export const songsPlaylistsQueryOptions = (playlistName: string) =>
  queryOptions({
    queryKey: ['songs', playlistName],
    queryFn: () => getSongByPlaylist(playlistName)
  })

export const useSongsPlaylist = (playlistName: string) => {
  return useQuery(songsPlaylistsQueryOptions(playlistName))
}
