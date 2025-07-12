import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { toast } from 'sonner'
import { useBufferSong } from '@renderer/hooks/use-buffer-song'
import { SongProps } from '@shared/models'

export function usePlaySong() {
  const { bufferSong } = useBufferSong()
  const setSelectSong = useSelectedSongStore((state) => state.setSelectSong)
  const setAudioSrc = usePlayerStore((state) => state.setAudioSrc)

  const onPlaySong = async (song: SongProps | null) => {
    if (!song) {
      toast.error('No hay canción seleccionada.')
      return
    }

    try {
      const findAudio = await bufferSong(song)
      setSelectSong(song)
      setAudioSrc(findAudio)
    } catch {
      toast.error('Ha ocurrido un error al cargar la canción.')
    }
  }

  return { onPlaySong }
}
