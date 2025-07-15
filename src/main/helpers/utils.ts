import { EXTENSIONS } from '../constants'

export function filterByExtension(song: string) {
  return EXTENSIONS.some((extension) => song.endsWith(extension))
}

export function jsonConverter(data: unknown): string {
  return JSON.stringify(data, null, 2)
}
