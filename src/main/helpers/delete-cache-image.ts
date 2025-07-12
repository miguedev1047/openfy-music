import { rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

interface DeleteCacheImageProps {
  songHashId: string
}

export async function deleteCacheImage({ songHashId }: DeleteCacheImageProps) {
  const cacheDir = join(tmpdir(), 'openfy-cache')
  const filename = `cover-${songHashId}.png`
  const imagePath = join(cacheDir, filename)

  try {
    await rm(imagePath)
  } catch (error) {
    console.log('Error deleting image:', error)
    throw new Error('Error deleting image')
  }
}
