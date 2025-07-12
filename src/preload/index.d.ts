import { ElectronAPI } from '@electron-toolkit/preload'
import { SongProps, RemoveSongProps } from '../main/types/song.props'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSongs: () => Promise<SongProps[]>
      readSong: (filename: string) => Promise<string>
      removeSong: (data: RemoveSongProps) => Promise<void>
      openSongFolder: () => Promise<void>
      windowClose: () => Promise<void>
      windowMinimize: () => Promise<void>
    }
  }
}
