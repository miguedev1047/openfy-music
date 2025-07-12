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

export interface RemoveSongProps {
  filename: string
  songHashId: string
}
