import { readFile, rm } from 'fs/promises'
import { join } from 'path'
import { cacheDir, playListsDir } from '../constants'
import { RemoveSongProps } from '../../shared/models'

export async function readSong(filename: string): Promise<Buffer<ArrayBufferLike>> {
  return await readFile(filename)
}

export async function removeSong(props: RemoveSongProps) {
  const { filename, playlist, id } = props

  const fileSource = join(playListsDir, playlist, filename)
  const cacheSource = join(cacheDir, `cover-${id}.png`)

  await rm(fileSource)
  await rm(cacheSource)
}
