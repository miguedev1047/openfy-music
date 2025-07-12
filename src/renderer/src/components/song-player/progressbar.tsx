import { Slider } from '@renderer/components/ui/slider'
import { formatDurationPlayer } from '@renderer/helpers/format-duration'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import {
  useAudioOptsStore,
  usePlayerStore,
  useSelectedSongStore
} from '@renderer/store/use-player-store'

export function useProgressbar() {
  const { audioRef } = useAudioRef()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const currentTime = usePlayerStore((state) => state.currentTime || 0)
  const duration = usePlayerStore((state) => state.duration || 0)
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime)

  const isMuted = useAudioOptsStore((state) => state.isMuted)

  const onChangeSeek = (value: number[]): void => {
    const [v] = value

    if (audioRef.current) {
      audioRef.current.currentTime = v
      audioRef.current.muted = true
      setCurrentTime(v)
    }
  }

  const onSeekEnd = (value: number[]): void => {
    const [v] = value

    if (audioRef.current) {
      audioRef.current.currentTime = v

      setCurrentTime(v)

      if (isMuted) {
        audioRef.current.muted = true
        return
      }
      audioRef.current.muted = false
    }
  }

  return { currentTime, duration, onChangeSeek, onSeekEnd, selectedSong }
}

export function Progressbar() {
  const { currentTime, duration, onChangeSeek, onSeekEnd, selectedSong } = useProgressbar()

  return (
    <div className="w-full flex items-center gap-2 text-xs text-muted font-bold">
      <p>{formatDurationPlayer(currentTime)}</p>
      <Slider
        disabled={!selectedSong}
        value={[currentTime]}
        onValueChange={onChangeSeek}
        onValueCommit={onSeekEnd}
        max={duration}
        min={0}
        step={1}
      />
      <p>{formatDurationPlayer(duration)}</p>
    </div>
  )
}
