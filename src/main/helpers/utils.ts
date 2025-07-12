import { EXTENSIONS } from '../constants'
import { homedir } from 'os'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export const musicDir = join(homedir(), 'openfy-music/Music')

export function getMusicDir() {
  if (!existsSync(musicDir)) {
    mkdirSync(musicDir, { recursive: true })
  }

  return musicDir
}

export function filterByExtension(song: string) {
  return EXTENSIONS.some((extension) => song.endsWith(extension))
}
