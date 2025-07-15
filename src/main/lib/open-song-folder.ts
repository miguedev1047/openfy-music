import { shell } from 'electron'
import { join } from 'path'
import { playListsDir } from '../constants'

export async function openSongFolder(playlistName: string) {
  try {
    const playlistPath = join(playListsDir, playlistName)
    await shell.openPath(playlistPath)

    return { success: true }
  } catch {
    return { success: false }
  }
}
