import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
// import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
// import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { useAudioOptsStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { Slider } from '@renderer/components/ui/slider'
import { useAudioRef } from '@renderer/providers/audio-ref-provider'
import { useEffect } from 'react'

export function useVolumenButton() {
  const { audioRef } = useAudioRef()
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  const volume = useAudioOptsStore((state) => state.volume)
  const setVolume = useAudioOptsStore((state) => state.setVolume)

  const isMuted = useAudioOptsStore((state) => state.isMuted)
  const setIsMuted = useAudioOptsStore((state) => state.setIsMuted)

  const prevVolume = useAudioOptsStore((state) => state.prevVolume)
  const setPrevVolume = useAudioOptsStore((state) => state.setPrevVolume)

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = isMuted ? 0 : volume
    audioRef.current.muted = isMuted
  }, [audioRef.current])

  useEffect(() => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = 0
      audioRef.current.muted = true
      return
    }

    audioRef.current.volume = volume
    audioRef.current.muted = false
  }, [isMuted, volume])

  const onMuteVolumen = (): void => {
    if (!audioRef.current) return

    if (isMuted) {
      setVolume(prevVolume)
      setIsMuted(false)
    } else {
      setPrevVolume(volume)
      setIsMuted(true)
    }
  }

  const onChangeVolumen = (value: number[]): void => {
    const [newVolume] = value

    if (!audioRef.current) return

    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }

    setVolume(newVolume)
  }

  return { isMuted, onMuteVolumen, onChangeVolumen, volume, selectedSong }
}

export function VolumenButton() {
  const { volume, selectedSong, isMuted, onChangeVolumen, onMuteVolumen } = useVolumenButton()

  return (
    <div className="w-full flex gap-2 grow basis-0 items-center justify-end">
      <Slider
        value={[isMuted ? 0 : volume]}
        onValueChange={onChangeVolumen}
        max={1}
        min={0}
        step={0.01}
      />

      <Button size="icon" disabled={!selectedSong} onClick={onMuteVolumen}>
        <VolumenIcon />
      </Button>
    </div>
  )
}

export function VolumenIcon() {
  const { volume, isMuted } = useVolumenButton()

  if (isMuted || volume <= 0) return <VolumeX />

  if (volume < 0.11) return <Volume />

  if (volume < 0.61) return <Volume1 />

  return <Volume2 />
}
