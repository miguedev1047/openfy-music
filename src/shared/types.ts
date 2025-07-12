import { RemoveSongProps, SongProps } from "./models";

export type GetSongs = () => Promise<SongProps[]>
export type ReadSong = (filename: string) => Promise<Buffer<ArrayBufferLike>>
export type RemoveSong = (props: RemoveSongProps) => Promise<void>

