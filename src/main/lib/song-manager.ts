import { readFile } from 'fs/promises'

export async function readSong(filename: string): Promise<Buffer<ArrayBufferLike>> {
  return await readFile(filename)
}
