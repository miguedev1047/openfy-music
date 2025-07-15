export interface UserConfig {
  defaultFolder: string
  theme: 'light' | 'dark' | 'system'
  autoplay: boolean
  loop: boolean
  shuffle: boolean
  volume: number
  developerMode?: boolean
}

export interface SongProps {
  title: string
  src: string
  artist: string
  duration: number
  pic: string | null
  id: string
  birthtime: Date
}

export interface SongItemProps extends SongProps {
  index: number
}

export interface PlaylistFolderProps {
  title: string
  playlist: string
  totalSongs: number
}

export interface RenamePlaylistFolderProps {
  oldName: string
  newName: string
}