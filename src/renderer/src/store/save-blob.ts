import { create } from 'zustand'

interface SaveBlobStoreProps {
  blob: Blob | null
  saveBlob: (blob: Blob) => void
  onClearBlob: () => void
}

export const useSaveBlobStore = create<SaveBlobStoreProps>((set) => ({
  blob: null,
  saveBlob: (blob) => set(() => ({ blob })),
  onClearBlob: () => set({ blob: null }),
}))
