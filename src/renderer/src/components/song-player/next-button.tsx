import { useSelectedSongStore, useAudioOptsStore } from '@renderer/store/use-player-store'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { toast } from 'sonner'
import { usePlaySong } from '@renderer/hooks/use-play-song'
import { SkipForward } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { songsQueryOptions } from '@renderer/queries/use-query-songs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'

export function useNextButton() {
  const songsQuery = useSuspenseQuery(songsQueryOptions)
  const songs = songsQuery.data

  const { onPlaySong } = usePlaySong()

  const navigate = useNavigate()
  const location = useLocation()

  const isInHome = location.pathname === '/'

  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const isShuffleActive = useAudioOptsStore((state) => state.isShuffle)

  const getNextSong = () => {
    if (!songs || songs.length === 0) return null

    if (isShuffleActive) {
      const randomIndex = Math.floor(Math.random() * songs.length)
      return songs[randomIndex]
    }

    const currentIndex = songs.findIndex((song) => song.src === selectedSong?.src)
    const nextIndex = currentIndex + 1

    return nextIndex < songs.length ? songs[nextIndex] : songs[0]
  }

  const onNextSong = async () => {
    const nextSong = getNextSong()

    if (!nextSong) {
      toast.error('No hay canciones disponibles')
      return
    }

    onPlaySong(nextSong)

    if (!isInHome) {
      navigate({
        to: '/song/$src',
        params: { src: nextSong.src },
        viewTransition: { types: ['fade'] }
      })
    }
  }

  return { onNextSong, selectedSong }
}

export function NextButton() {
  const { onNextSong, selectedSong } = useNextButton()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" onClick={onNextSong} disabled={!selectedSong}>
          <SkipForward />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Siguiente</TooltipContent>
    </Tooltip>
  )
}
