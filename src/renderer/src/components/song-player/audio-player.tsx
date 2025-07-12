import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { usePlaySong } from '@renderer/hooks/use-play-song'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { useNextButton } from '@renderer/components/song-player/next-button'
import { useEffect, useRef } from 'react'

const DELAY_MS = 750

export function AudioPlayer() {
  const lastUpdateRef = useRef(0)

  const { audioRef } = useAudioRef()
  const { onPlaySong } = usePlaySong()
  const { onNextSong } = useNextButton()

  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const audioSrc = usePlayerStore((state) => state.audioSrc)

  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime)
  const setDuration = usePlayerStore((state) => state.setDuration)

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLAudioElement>) => {
    const now = Date.now()

    if (now - lastUpdateRef.current >= DELAY_MS) {
      setCurrentTime(e.currentTarget.currentTime)
      lastUpdateRef.current = now
    }
  }

  useEffect(() => {
    if (!selectedSong) return
    onPlaySong(selectedSong)
  }, [])

  useEffect(() => {
    return () => {
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc)
        console.log('Limpiando blob')
      }
    }
  }, [audioSrc])

  if (!selectedSong || !audioSrc) return null

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      onEnded={onNextSong}
      className='hidden sr-only'
      autoPlay
    />
  )
}
