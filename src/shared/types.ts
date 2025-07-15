import { PlaylistFolderProps, RenamePlaylistFolderProps, SongProps, UserConfig } from './models'

export type GetPlayLists = () => Promise<PlaylistFolderProps[]>
export type GetSongsPlayList = (playlistName: string) => Promise<SongProps[]>
export type GetConfigData = () => Promise<UserConfig>
export type UpdateConfigData = (data: UserConfig) => Promise<void>
export type RemovePlaylist = (playlistName: string) => Promise<void>
export type RenamePlaylist = (data: RenamePlaylistFolderProps) => Promise<void>
export type NewPlaylist = (playlistName: string) => Promise<void>
export type ReadSong = (filename: string) => Promise<Buffer<ArrayBufferLike>>
export type OpenFolder = (playlistName: string) => Promise<void>
