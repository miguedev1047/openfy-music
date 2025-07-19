import { join } from 'path'
import { binDir, EXTENSIONS } from '../constants'
import { existsSync } from 'fs'

export const ffmpegPath = getBinaryPath(process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg')

export function filterByExtension(song: string) {
  return EXTENSIONS.some((extension) => song.endsWith(extension))
}

export function jsonConverter(data: unknown): string {
  return JSON.stringify(data, null, 2)
}

export function removeExtension(song: string) {
  return song.split('.')[0] || song
}

export function getBinaryPath(name: string) {
  const binPath = join(binDir, name)

  if (!existsSync(binPath)) {
    throw new Error(`❌ No se encontró el binario requerido: ${name} en la carpeta bin.`)
  }

  return binPath
}
