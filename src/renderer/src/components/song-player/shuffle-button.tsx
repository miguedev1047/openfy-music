import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@renderer/components/ui/tooltip'
import { useSelectedSongStore, useAudioOptsStore } from '@renderer/store/use-player-store'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { Shuffle } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'

export function useShuffleButton() {
  const { audioRef } = useAudioRef()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const isShuffle = useAudioOptsStore((state) => state.isShuffle)
  const setIsShuffle = useAudioOptsStore((state) => state.setIsShuffle)

  const setIsLoop = useAudioOptsStore((state) => state.setIsLoop)

  const onToggleShuffle = () => {
    if (audioRef.current) {
      audioRef.current.loop = false
      setIsShuffle(!isShuffle)
      setIsLoop(false)
    }
  }

  return { onToggleShuffle, isShuffle, selectedSong }
}

export function ShuffleButton() {
  const { onToggleShuffle, isShuffle, selectedSong } = useShuffleButton()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size='icon'
          onClick={onToggleShuffle}
          disabled={!selectedSong}
        >
          <Shuffle
            className={cn(
              isShuffle &&
                'transition-all duration-200 ease-in-out text-green-400'
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isShuffle ? 'Desactivar modo aleatorio' : 'Activar modo aleatorio'}
      </TooltipContent>
    </Tooltip>
  )
}
