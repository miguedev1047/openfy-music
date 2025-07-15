import { create } from 'zustand'

export type PlaylistManagerOptions = 'remove' | 'rename' | 'none'

interface PlaylistManagerStoreProps {
  isOpen: boolean
  selectedPlaylist: string
  selectedOption: PlaylistManagerOptions
  setIsOpen: (isOpen: boolean) => void
  setSelectOption: (selectedOption: PlaylistManagerOptions) => void
  setSelectedPlaylist: (selectedPlaylist: string) => void
}

export const usePlaylistManagerStore = create<PlaylistManagerStoreProps>((set) => ({
  isOpen: false,
  selectedOption: 'none',
  selectedPlaylist: '',
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setSelectOption: (selectedOption) => set(() => ({ selectedOption })),
  setSelectedPlaylist: (selectedPlaylist) => set(() => ({ selectedPlaylist }))
}))
