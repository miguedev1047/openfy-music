import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { cacheDir } from '../constants'

interface SaveBase64ImageProps {
  base64String: string
  format: string
  songHashId: string
}

export async function saveBase64Image(props: SaveBase64ImageProps) {
  const { base64String, format, songHashId } = props

  const extension = format.split('/')[1] || 'png'

  const filename = `cover-${songHashId}.${extension}`
  const imagePath = join(cacheDir, filename)

  try {
    if (!existsSync(cacheDir)) {
      await mkdir(cacheDir, { recursive: true })
    }

    if (!existsSync(imagePath)) {
      const buffer = Buffer.from(base64String, 'base64')
      await writeFile(imagePath, buffer)
    }

    return imagePath
  } catch (error) {
    console.error('Error saving image:', error)
    return null
  }
}
