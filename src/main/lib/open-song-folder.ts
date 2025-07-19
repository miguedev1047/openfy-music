import { shell } from 'electron'
import { join } from 'path'
import { binDir, playListsDir } from '../constants'

export async function openPlaylistFolder(playlistName: string) {
  try {
    const playlistPath = join(playListsDir, playlistName)
    await shell.openPath(playlistPath)
    return { success: true }
  } catch {
    return { success: false }
  }
}

export async function openBinFolder() {
  try {
    await shell.openPath(binDir)
    return { success: true }
  } catch {
    return { success: false }
  }
}
