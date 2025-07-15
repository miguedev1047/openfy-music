import { SongImage } from '@renderer/components/song-image'
import { formatDurationPlayer } from '@renderer/helpers/format-duration'
import { usePlaySong } from '@renderer/hooks/use-play-song'
import { cn } from '@renderer/lib/utils'
import { useSelectedSongStore, usePlayerStore } from '@renderer/store/use-player-store'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { SongItemProps } from '@shared/models'
import { Play } from 'lucide-react'
import { AnimateIcon } from '@renderer/components/animate-ui/icons/icon'
import { AudioLines } from '@renderer/components/animate-ui/icons/audio-lines'
import { Box } from '@renderer/components/ui/box'

export function useSongItem(props: SongItemProps) {
  const { artist, duration, src, title, pic, index } = props
  const { onPlaySong } = usePlaySong()

  const navigate = useNavigate()
  const location = useLocation()

  const itemIndex = index + 1

  const isInHome = location.pathname === '/'
  const selectedSong = useSelectedSongStore((state) => state.selectedSong?.src === src)
  const isPlaying = usePlayerStore((state) => state.isPlaying && selectedSong)

  const onSelectSong = () => {
    if (selectedSong && isInHome) {
      navigate({
        to: '/song/$src',
        params: { src },
        viewTransition: { types: ['fade'] }
      })
      return
    }

    onPlaySong(props)
  }

  return {
    artist,
    duration,
    src,
    title,
    pic,
    itemIndex,
    isInHome,
    selectedSong,
    isPlaying,
    onSelectSong
  }
}

export function SongItem(props: SongItemProps) {
  const { artist, duration, src, pic, title, itemIndex, selectedSong, isPlaying, onSelectSong } =
    useSongItem(props)

  return (
    <Box
      onClick={onSelectSong}
      key={src}
      data-selected={selectedSong}
      className={cn(
        'relative cursor-pointer hover:bg-secondary p-3 gap-4 flex flex-row items-center group/song-card',
        'data-[selected=true]:bg-secondary data-[selected=false]:border data-[selected=false]:border-transparent bg-transparent'
      )}
    >
      <div className="w-5 h-4 relative">
        <div className="absolute inset-0 justify-end items-center flex">
          {!isPlaying ? (
            <>
              <p className="group-hover/song-card:hidden font-bold text-xl">{itemIndex}</p>
              <Play className="size-4 hidden group-hover/song-card:block" />
            </>
          ) : (
            <AnimateIcon loop animate>
              <AudioLines />
            </AnimateIcon>
          )}
        </div>
      </div>

      <SongImage src={pic} alt={title} className="size-16 !rounded-[4px]" isBlurred />

      <div className="flex flex-1 items-center justify-between gap-8">
        <div>
          <h3
            data-selected={selectedSong}
            className={cn('text-base font-bold line-clamp-1', 'data-[selected=true]:text-primary')}
          >
            {title}
          </h3>
          <p className="text-[12px]">{artist}</p>
        </div>

        <p className="font-bold text-sm">{formatDurationPlayer(duration)}</p>
      </div>
    </Box>
  )
}
