import Marquee from 'react-fast-marquee'

import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { SongImage } from '@renderer/components/song-image'
import { AnimateIcon } from '@renderer/components/animate-ui/icons/icon'
import { AudioLines } from '@renderer/components/animate-ui/icons/audio-lines'
import { Link } from '@tanstack/react-router'
import { SongOptions } from '@renderer/routes/(index)/-components/song-options'

export function SongPreview() {
  return (
    <div className="glass-item relative w-1/2 h-full">
      <SongDetails />
    </div>
  )
}

export function SongDetails() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  if (!selectedSong)
    return (
      <div className="size-full flex flex-col items-center justify-center">
        <div>
          <h3 className="text-2xl font-bold text-center">Hola :D</h3>
          <p>Selecciona una canción para escucharla.</p>
        </div>
      </div>
    )

  return (
    <div className="relative size-full grid place-items-center p-4">
      <Link
        to="/song/$src"
        params={{ src: selectedSong.src }}
        viewTransition={{ types: ['fade'] }}
        className="w-[55%] h-auto space-y-4 rounded-2xl z-10 transition-all duration-300 ease-in-out hover:scale-[110%] hover:shadow-xl"
      >
        <SongImage src={selectedSong.pic} alt={selectedSong.title} className="size-full" />
      </Link>

      <SongTitle />
      <SongOptions />
      <SongAudioLines />
    </div>
  )
}

export function SongTitle() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)
  if (!selectedSong) return null

  return (
    <div className="absolute top-4 inset-x-0 px-4">
      <Marquee>
        <div className="text-xl flex items-center gap-4">
          <h2>{selectedSong.title}</h2>
          <h2>{selectedSong.title}</h2>
        </div>
      </Marquee>
    </div>
  )
}

export function SongAudioLines() {
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  return (
    <div className="w-[80%] h-auto opacity-50 absolute bottom-0 translate-y-[50%]  flex items-center">
      <AnimateIcon loop animate={isPlaying}>
        <AudioLines className="size-full" />
      </AnimateIcon>
      <AnimateIcon loop animate={isPlaying}>
        <AudioLines className="size-full" />
      </AnimateIcon>
    </div>
  )
}
