import { existsSync } from 'fs'
import { playListsDir } from '../constants'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import { getConfigData } from './config-data'

export async function ensureDefaultPlaylistsFolders() {
  try {
    const config = await getConfigData()

    if (!existsSync(playListsDir)) {
      await mkdir(join(playListsDir, config.defaultFolder), { recursive: true })
    }
  } catch {
    throw new Error('Error al crear las carpetas por defecto')
  }
}
