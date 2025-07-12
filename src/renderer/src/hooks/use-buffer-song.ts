import { usePlayerStore } from '@renderer/store/use-player-store'
import { SongProps } from '@shared/models'

export function useBufferSong() {
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime)

  const bufferSong = async (song: SongProps): Promise<string> => {
    const buffer = await window.api.readSong(song.src)

    setCurrentTime(0)

    return await new Promise((resolve) => {
      setTimeout(() => {
        const blob = new Blob([buffer], { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)
        resolve(url)
      }, 0)
    })
  }

  return { bufferSong }
}
