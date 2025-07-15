import { LOCAL_RESOURCE_PREFIX, playListsDir } from '../constants'
import { ensureDir, readdir } from 'fs-extra'
import { mkdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'
import { parseFile } from 'music-metadata'

import { PlaylistFolderProps, RenamePlaylistFolderProps, SongProps } from '../../shared/models'

import { filterByExtension } from '../helpers/utils'
import { generateSongIdFromMetadata } from '../helpers/genertate-song-hash'
import { saveBase64Image } from '../helpers/save-base64-image'

// Managment playlists //

export async function getPlayLists(): Promise<PlaylistFolderProps[]> {
  await ensureDir(playListsDir)

  const playlists = await readdir(playListsDir, { encoding: 'utf-8', withFileTypes: true })

  const filterFolders = playlists
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const promisesFolders = Promise.all(filterFolders.map(getPlayListPath))

  return promisesFolders
}

export async function getPlayListPath(filename: string): Promise<PlaylistFolderProps> {
  const fileSource = `${playListsDir}/${filename}`
  await ensureDir(playListsDir)

  const songs = await readdir(fileSource, { encoding: 'utf-8', withFileTypes: true })
  const finalData = { title: filename, playlist: filename, totalSongs: songs.length }

  return finalData
}

// Managment songs in playlists //

export async function getSongsPlaylist(playlistName: string | undefined): Promise<SongProps[]> {
  if (!playlistName) return []

  const playlistPath = join(playListsDir, playlistName)
  await ensureDir(playlistPath)

  const songs = await readdir(playlistPath, { encoding: 'utf-8', withFileTypes: false })

  const filteredSongs = songs.filter((song) => filterByExtension(song))
  const promisesSongs = await Promise.all(
    filteredSongs.map((item) => getSongPlaylistByPath(item, playlistName))
  )

  return promisesSongs
}

export async function getSongPlaylistByPath(
  filename: string,
  playlistName: string
): Promise<SongProps> {
  const playlistPath = join(playListsDir, playlistName)
  const fileSource = join(playlistPath, filename)
  const metadata = await parseFile(fileSource)

  const stats = await stat(fileSource)
  const id = generateSongIdFromMetadata(metadata)

  let pic: null | string = null

  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const firstPicture = metadata.common.picture[0]
    const { data, format } = firstPicture
    const base64String = Buffer.from(data).toString('base64')
    const localPath = await saveBase64Image({ base64String, format, id })
    pic = `${LOCAL_RESOURCE_PREFIX}${localPath}`
  }

  const finalData = {
    pic,
    id,
    title: metadata.common.title || filename,
    src: fileSource,
    artist: metadata.common.artist || 'Unknown Artist',
    duration: metadata.format.duration || 0,
    birthtime: stats.birthtime
  }

  return finalData
}

// New playlist //

export async function newPlaylist(playlistName: string): Promise<void> {
  const playlistPath = join(playListsDir, playlistName)
  await ensureDir(playlistPath)
  await mkdir(playlistPath, { recursive: true })
}

// Remove playlist

export async function removePlaylist(playlistName: string) {
  const playlistPath = join(playListsDir, playlistName)
  await ensureDir(playlistPath)
  await rm(playlistPath, { recursive: true })
}

// Rename playlist

export async function renamePlaylist(props: RenamePlaylistFolderProps) {
  const { oldName, newName } = props
  const oldPlaylistPath = join(playListsDir, oldName)
  const newPlaylistPath = join(playListsDir, newName)

  await ensureDir(oldPlaylistPath)
  await rename(oldPlaylistPath, newPlaylistPath)
}
