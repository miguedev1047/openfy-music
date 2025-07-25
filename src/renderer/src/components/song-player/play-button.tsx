import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { Button } from '@renderer/components/ui/button'
import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { Pause, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function usePlayButton() {
  const { audioRef } = useAudioRef()

  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    const isPaused = audio.paused

    if (isPaused) {
      audio.play()
      setIsPlaying(false)
    } else {
      audio.pause()
      setIsPlaying(true)
    }
  }

  return { handlePlayPause, selectedSong, isPlaying }
}

export function PlayButton() {
  const { t } = useTranslation()
  const { handlePlayPause, selectedSong, isPlaying } = usePlayButton()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={handlePlayPause} disabled={!selectedSong}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isPlaying ? t('tooltips.paused') : t('tooltips.play')}</TooltipContent>
    </Tooltip>
  )
}
