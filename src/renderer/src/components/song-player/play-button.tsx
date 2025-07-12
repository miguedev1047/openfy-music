import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@renderer/components/ui/tooltip'
import { Button } from '@renderer/components/ui/button'
import { usePlayerStore } from '@renderer/store/use-player-store'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { Pause, Play } from 'lucide-react'

export function usePlayButton() {
  const { audioRef } = useAudioRef()

  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying)

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(false)
    } else {
      audioRef.current.pause()
      setIsPlaying(true)
    }
  }

  return { handlePlayPause, isPlaying }
}

export function PlayButton() {
  const { handlePlayPause, isPlaying } = usePlayButton()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size='icon'
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isPlaying ? 'Pausar' : 'Reproducir'}
      </TooltipContent>
    </Tooltip>
  )
}
