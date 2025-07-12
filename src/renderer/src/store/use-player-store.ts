import { SongProps } from '@shared/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedSongStoreProps {
  selectedSong: SongProps | null
  setSelectSong: (song: SongProps) => void
}

interface PlayerStoreProps {
  audioSrc: string
  isPlaying: boolean
  duration: number
  currentTime: number
  progress: number

  setAudioSrc: (src: string) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setProgress: (progress: number) => void

  updateState: (state: Partial<Omit<PlayerStoreProps, 'updateState'>>) => void
}

interface AudioOptionsProps {
  volume: number
  prevVolume: number
  isMuted: boolean
  isShuffle: boolean
  isLoop: boolean

  setVolume: (volume: number) => void
  setPrevVolume: (prevVolume: number) => void
  setIsMuted: (muted: boolean) => void
  setIsShuffle: (shuffle: boolean) => void
  setIsLoop: (loop: boolean) => void
}

export const useSelectedSongStore = create<SelectedSongStoreProps>()(
  persist(
    (set) => ({
      selectedSong: null,
      setSelectSong: (song) => set(() => ({ selectedSong: { ...song } }))
    }),
    {
      name: 'selected-song-store'
    }
  )
)

export const usePlayerStore = create<PlayerStoreProps>((set) => ({
  audioSrc: '',
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  progress: 0,

  setAudioSrc: (audioSrc) => set(() => ({ audioSrc })),
  setCurrentTime: (currentTime) => set(() => ({ currentTime })),
  setDuration: (duration) => set(() => ({ duration })),
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  setProgress: (progress) => set(() => ({ progress })),

  updateState: (state) => set(() => ({ ...state }))
}))

export const useAudioOptsStore = create<AudioOptionsProps>()(
  persist(
    (set, get) => ({
      isLoop: false,
      isMuted: false,
      isShuffle: false,
      volume: 0.7,
      prevVolume: 0.7,

      setIsLoop: (isLoop) => set(() => ({ isLoop })),
      setIsShuffle: (isShuffle) => set(() => ({ isShuffle })),
      setIsMuted: (isMuted) => set(() => ({ isMuted })),
      setVolume: (volume) => {
        const currentState = get()
        if (!currentState.isMuted) {
          set(() => ({ volume, prevVolume: volume }))
        } else {
          set(() => ({ prevVolume: currentState.volume }))
        }
      },
      setPrevVolume: (prevVolume) => set(() => ({ prevVolume }))
    }),
    { name: 'audio-options-store' }
  )
)
