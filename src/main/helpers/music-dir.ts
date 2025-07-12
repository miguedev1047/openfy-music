import { existsSync, mkdirSync, rmSync } from 'fs'
import { cacheDir, musicDir } from '../constants'

export function getMusicDir() {
  if (!existsSync(musicDir)) {
    mkdirSync(musicDir, { recursive: true })
  }
  return musicDir
}

export function clearCacheMusicDir() {
  if (existsSync(cacheDir)) {
    rmSync(cacheDir, { recursive: true })
  }
  mkdirSync(cacheDir, { recursive: true })
}
