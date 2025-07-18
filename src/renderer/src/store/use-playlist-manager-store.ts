import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PlaylistActions = 'remove' | 'rename' | 'none'

export interface PlaylistActionsStore {
  isOpen: boolean
  selectedPlaylist: string
  selectedAction: PlaylistActions
  setIsOpen: (isOpen: boolean) => void
  setSelectedAction: (selectedAction: PlaylistActions) => void
  setSelectedPlaylist: (selectedPlaylist: string) => void
}

export interface PlaylistActiveStore {
  activePlaylist: string
  setActivePlaylist: (activePlaylist: string) => void
}

export const usePlaylistActionsStore = create<PlaylistActionsStore>((set) => ({
  isOpen: false,
  selectedAction: 'none',
  selectedPlaylist: '',
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setSelectedAction: (selectedAction) => set(() => ({ selectedAction })),
  setSelectedPlaylist: (selectedPlaylist) => set(() => ({ selectedPlaylist }))
}))

export const usePlaylistActiveStore = create<PlaylistActiveStore>()(
  persist(
    (set) => ({
      activePlaylist: '',
      setActivePlaylist: (activePlaylist) => set(() => ({ activePlaylist }))
    }),
    { name: 'active-playlist-store' }
  )
)
