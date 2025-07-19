import { ElectronAPI } from '@electron-toolkit/preload'
import {
  DownloadMusicProps,
  PlaylistFolderProps,
  RemoveSongProps,
  RenamePlaylistFolderProps,
  SongProps,
  UserConfig
} from '@shared/models'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getSongs: () => Promise<SongProps[]>
      getSongsPlaylist: (playlistName: string | undefined) => Promise<SongProps[]>
      getConfigData: () => Promise<UserConfig>
      getPlayLists: () => Promise<PlaylistFolderProps[]>
      updateConfigData: (data: Partial<UserConfig>) => Promise<void>
      newPlaylist: (playlistName: string) => Promise<void>
      removePlaylist: (playlistName: string) => Promise<void>
      removeSong: (data: RemoveSongProps) => Promise<void>
      renamePlaylist: (data: RenamePlaylistFolderProps) => Promise<void>
      readSong: (filename: string) => Promise<string>
      openSongFolder: (playlistName: string) => Promise<void>
      windowClose: () => Promise<void>
      windowMinimize: () => Promise<void>
      toggleMaximize: () => Promise<void>
      downloadMusicMP3: (data: DownloadMusicProps) => Promise<void>
      onDownloadProgress: (callback: (percent: number) => void) => void
    }
  }
}
