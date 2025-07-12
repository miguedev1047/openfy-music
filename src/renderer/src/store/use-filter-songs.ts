import { create } from 'zustand'

interface FilterSongsState {
  search: string
  onSearch: (search: string) => void
}

export const useFilterSongs = create<FilterSongsState>((set) => ({
  search: '',
  onSearch: (search) => set({ search })
}))
