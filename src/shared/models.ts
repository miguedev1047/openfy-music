import { COLOR_THEMES } from './constants'

export type ThemeValue = (typeof COLOR_THEMES)[number]['value']

export interface UserConfig {
  defaultFolder: string
  theme: 'light' | 'dark' | 'system'
  activeTheme: ThemeValue
  allowTyDLPDownloads: boolean
}

export interface DownloadMusicProps {
  url: string
  folder: string
}

export interface SongProps {
  title: string
  src: string
  filename: string
  artist: string
  album: string
  duration: number
  pic: string | null
  id: string
  birthtime: Date
}

export interface RemoveSongProps {
  filename: string
  playlist: string
  id: string
}

export interface SongItemProps extends SongProps {
  index: number
}

export interface PlaylistFolderProps {
  title: string
  playlist: string
  birthtime: Date
  totalSongs: number
}

export interface RenamePlaylistFolderProps {
  oldName: string
  newName: string
}
