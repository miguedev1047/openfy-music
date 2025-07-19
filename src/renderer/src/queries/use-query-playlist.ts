import { queryOptions, useQuery } from '@tanstack/react-query'

export const getPlaylists = async () => {
  const data = await window.api.getPlayLists()
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data
}

export const playlistsFoldersQueryOptions = queryOptions({
  queryKey: ['playlists'],
  queryFn: getPlaylists,
})

export const usePlaylistFolders = () => useQuery(playlistsFoldersQueryOptions)
