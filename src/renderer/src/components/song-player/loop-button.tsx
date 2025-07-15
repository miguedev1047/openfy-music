import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { useAudioOptsStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { Button } from '@renderer/components/ui/button'
import { Repeat } from 'lucide-react'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { useEffect } from 'react'

export function useLoopButton() {
  const { audioRef } = useAudioRef()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const isLoop = useAudioOptsStore((state) => state.isLoop)
  const setIsLoop = useAudioOptsStore((state) => state.setIsLoop)

  const setIsShuffle = useAudioOptsStore((state) => state.setIsShuffle)

  const onToggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop
      setIsLoop(!isLoop)
      setIsShuffle(false)
    }
  }

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.loop = isLoop
  }, [isLoop, audioRef.current])

  return { onToggleLoop, isLoop, selectedSong }
}

export function LoopButton() {
  const { onToggleLoop, isLoop, selectedSong } = useLoopButton()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onClick={onToggleLoop}
          disabled={!selectedSong}
          variant={isLoop ? 'outline' : 'default'}
        >
          <Repeat />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isLoop ? 'Desactivar modo repetición' : 'Activar modo repetición'}
      </TooltipContent>
    </Tooltip>
  )
}
