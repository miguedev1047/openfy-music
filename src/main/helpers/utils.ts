import { EXTENSIONS } from '../constants'

export function filterByExtension(song: string) {
  return EXTENSIONS.some((extension) => song.endsWith(extension))
}

export function jsonConverter(data: unknown): string {
  return JSON.stringify(data, null, 2)
}

export function removeExtension(song: string) {
  return song.split('.')[0] || song
}
