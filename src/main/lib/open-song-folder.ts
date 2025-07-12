import { shell } from 'electron'
import { musicDir } from '../helpers/utils'

export async function openSongFolder() {
  try {
    await shell.openPath(musicDir)

    return { success: true }
  } catch {
    return { success: false }
  }
}
