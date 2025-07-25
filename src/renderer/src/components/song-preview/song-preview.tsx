import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { SongImage } from '@renderer/components/song-image'
import { AnimateIcon } from '@renderer/components/animate-ui/icons/icon'
import { AudioLines } from '@renderer/components/animate-ui/icons/audio-lines'
import { Link } from '@tanstack/react-router'
import { Box } from '@renderer/components/ui/box'
import { MusicIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function SongPreview() {
  return (
    <Box className="relative md:w-[340px] xl:w-[400px] h-full p-4 overflow-hidden">
      <SongDetails />
      <SongAudioLines />
    </Box>
  )
}

export function SongDetails() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  const { t } = useTranslation()

  if (!selectedSong)
    return (
      <div className="w-full h-auto flex flex-col gap-6 z-10">
        <figure className="aspect-square w-full h-full rounded-2xl bg-muted shadow-xl overflow-hidden grid place-items-center">
          <MusicIcon className="size-32" />
        </figure>

        <div>
          <h2 className="text-2xl font-black">{t('songPreview.title')}</h2>
          <p className="font-light">{t('songPreview.description')}</p>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col gap-6 w-full h-auto">
      <Link
        to="/song/$src"
        params={{ src: selectedSong.src }}
        viewTransition
        className="w-full h-auto rounded-2xl z-10"
      >
        <SongImage
          src={selectedSong.pic}
          alt={selectedSong.title}
          className="size-full"
          isBlurred
        />
      </Link>

      <div>
        <h2 className="text-2xl font-black line-clamp-1">{selectedSong.title}</h2>
        <p className="font-light line-clamp-1">{selectedSong.artist}</p>
      </div>
    </div>
  )
}

export function SongAudioLines() {
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  return (
    <div className="w-full inset-x-0 bottom-0 translate-y-[50%] h-auto mx-auto opacity-50 absolute  text-primary flex items-center">
      {[...Array(2)].map((_, index) => (
        <AnimateIcon key={index} loop animate={isPlaying}>
          <AudioLines className="size-full" />
        </AnimateIcon>
      ))}
    </div>
  )
}
