import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PlaylistSelectedStoreProps {
  playlist: string
  setPlaylist: (playlist: string) => void
}

export const usePlaylistSelectedStore = create<PlaylistSelectedStoreProps>()(
  persist(
    (set) => ({
      playlist: '',
      setPlaylist: (playlist) => set(() => ({ playlist }))
    }),
    { name: 'playlist-selected-store' }
  )
)
