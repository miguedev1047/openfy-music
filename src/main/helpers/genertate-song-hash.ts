import { createHash } from 'crypto'

export function generateSongHash(base: string): string {
  const hash = createHash('sha256').update(base).digest('hex')
  return hash
}
