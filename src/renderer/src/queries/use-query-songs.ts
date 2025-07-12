import { SongProps } from '@shared/models'
import { queryOptions } from '@tanstack/react-query'

const getSongs = async () => {
  const data = await window.api.getSongs()
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data as SongProps[]
}

export const getSongBySrc = async (src: string) => {
  const data = await getSongs()
  if (!data) throw new Error('An ocurred error on fetching data!')
  const song = data.find((s) => s.src === src)
  return song
}

export const songsQueryOptions = queryOptions({
  queryKey: ['songs'],
  queryFn: getSongs
})

export const songQueryBySrcOptions = (src: string) =>
  queryOptions({
    queryKey: ['song', src],
    queryFn: () => getSongBySrc(src)
  })
