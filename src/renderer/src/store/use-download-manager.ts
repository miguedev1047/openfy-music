import { create } from 'zustand'

export type DownloadTypes = 'playlist' | 'normal'

export interface DownloadManager {
  isDownloading: boolean
  percent: number
  setIsDownloading: (isDownloading: boolean) => void
  setPercent: (percent: number) => void
}

export const useDownloadManager = create<DownloadManager>((set) => ({
  isDownloading: false,
  percent: 0,
  setIsDownloading: (isDownloading) => set(() => ({ isDownloading })),
  setPercent: (percent) => set(() => ({ percent })),
}))
