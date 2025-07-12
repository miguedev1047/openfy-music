import { ensureDir, readdir } from 'fs-extra'
import { parseFile } from 'music-metadata'
import { readFile, rm, stat } from 'fs/promises'

import { RemoveSongProps, SongProps } from '../../shared/models'
import { filterByExtension } from '../helpers/utils'
import { generateSongHash } from '../helpers/genertate-song-hash'
import { LOCAL_RESOURCE_PREFIX, musicDir } from '../constants'
import { saveBase64Image } from '../helpers/save-base64-image'
import { deleteCacheImage } from '../helpers/delete-cache-image'

export async function getSongList(): Promise<SongProps[]> {
  await ensureDir(musicDir)

  const songs = await readdir(musicDir, {
    encoding: 'utf-8',
    withFileTypes: false
  })

  const filteredSongs = songs.filter((song) => filterByExtension(song))
  const promisesSongs = await Promise.all(filteredSongs.map(getSongByPath))

  return promisesSongs
}

export async function getSongByPath(filename: string): Promise<SongProps> {
  const fileSource = `${musicDir}/${filename}`
  const metadata = await parseFile(fileSource)

  const stats = await stat(fileSource)

  const base = `${fileSource}|${metadata.format.duration}|${stats.birthtime}`
  const songHashId = generateSongHash(base)

  let pic: null | string = null

  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const firstPicture = metadata.common.picture[0]
    const { data, format } = firstPicture

    const base64String = Buffer.from(data).toString('base64')

    const localPath = await saveBase64Image({ base64String, format, songHashId })
    pic = `${LOCAL_RESOURCE_PREFIX}${localPath}`
  }

  const finalData = {
    pic,
    title: metadata.common.title || filename,
    src: fileSource,
    artist: metadata.common.artist || 'Unknown Artist',
    duration: metadata.format.duration || 0,
    birthtime: stats.birthtime,
    id: songHashId
  }

  return finalData
}

export async function readSong(filename: string): Promise<Buffer<ArrayBufferLike>> {
  return await readFile(filename)
}

export async function removeSong(props: RemoveSongProps): Promise<void> {
  const { filename, songHashId } = props
  await rm(filename)
  await deleteCacheImage({ songHashId })
}
