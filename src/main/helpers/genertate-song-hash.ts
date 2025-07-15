import { createHash } from 'crypto'
import { IAudioMetadata } from 'music-metadata'

export function generateSongIdFromMetadata(metadata: IAudioMetadata): string {
  const title = metadata.common.title || 'unknown'
  const artist = metadata.common.artist || 'unknown'
  const duration = metadata.format.duration || 0

  const base = `${title}|${artist}|${duration}`
  return createHash('sha1').update(base).digest('hex')
}
