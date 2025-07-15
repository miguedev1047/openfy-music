import { usePlayerStore, useSelectedSongStore } from '@renderer/store/use-player-store'
import { SongImage } from '@renderer/components/song-image'
import { AnimateIcon } from '@renderer/components/animate-ui/icons/icon'
import { AudioLines } from '@renderer/components/animate-ui/icons/audio-lines'
import { Link } from '@tanstack/react-router'
import { Box } from '@renderer/components/ui/box'

export function SongPreview() {
  return (
    <Box className="relative w-1/2 h-full p-0 overflow-hidden">
      <SongDetails />
    </Box>
  )
}

export function SongDetails() {
  const selectedSong = useSelectedSongStore((state) => state.selectedSong)

  if (!selectedSong)
    return (
      <div className="size-full flex flex-col items-center justify-center">
        <div>
          <h3 className="text-2xl font-bold text-center">Hola, :D</h3>
          <p>Selecciona una canción para escucharla.</p>
        </div>
      </div>
    )

  return (
    <div className="relative size-full grid place-items-center p-4">
      <div className="w-[50%] h-auto -translate-y-10">
        <Link
          to="/song/$src"
          params={{ src: selectedSong.src }}
          viewTransition={{ types: ['fade'] }}
          className="w-full h-auto space-y-4 rounded-2xl z-10 transition-all duration-300 ease-in-out hover:scale-[110%]"
        >
          <SongImage
            src={selectedSong.pic}
            alt={selectedSong.title}
            className="size-full"
            isBlurred
          />
        </Link>

        <div className="mt-6">
          <h2 className="text-xl font-black text-center line-clamp-1">{selectedSong.title}</h2>
        </div>
      </div>

      <SongAudioLines />
    </div>
  )
}

export function SongAudioLines() {
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  return (
    <div className="w-full h-auto opacity-50 absolute bottom-4 translate-y-[50%] text-primary flex items-center">
      <AnimateIcon loop animate={isPlaying}>
        <AudioLines className="size-full" />
      </AnimateIcon>
      <AnimateIcon loop animate={isPlaying}>
        <AudioLines className="size-full" />
      </AnimateIcon>
    </div>
  )
}
