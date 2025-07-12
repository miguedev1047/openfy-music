import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@renderer/components/ui/tooltip'
import { AudioLines } from '@renderer/components/animate-ui/icons/audio-lines'
import { AnimateIcon } from '@renderer/components/animate-ui/icons/icon'
import { SongImage } from '@renderer/components/song-image'
import { Button } from '@renderer/components/ui/button'
import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useEffect } from 'react'

export function SongView() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedSong) {
      navigate({ to: '/', viewTransition: { types: ['fade'] } })
    }
  }, [])

  return (
    <article>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              asChild
              className='absolute top-4 left-4'
            >
              <Link
                to='/'
                viewTransition={{ types: ['fade'] }}
              >
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Volver</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className='absolute flex items-center w-[80%] h-auto top-0 -translate-y-[50%] inset-x-0 mx-auto opacity-50'>
        <AnimateIcon
          loop
          animate={isPlaying}
        >
          <AudioLines className='size-full' />
        </AnimateIcon>
        <AnimateIcon
          loop
          animate={isPlaying}
        >
          <AudioLines className='size-full' />
        </AnimateIcon>
      </div>

      <figure className='size-[350px] lg:size-[400px] mx-auto z-20'>
        <SongImage
          className='size-full aspect-square mx-auto shadow-xl'
          src={selectedSong?.pic}
          alt={selectedSong?.title || 'Song thumbnail'}
          isBlurred
        />
      </figure>

      <div className='absolute inset-x-0 bottom-8 px-6'>
        <h3 className='font-bold text-center'>{selectedSong?.title}</h3>
      </div>
    </article>
  )
}
