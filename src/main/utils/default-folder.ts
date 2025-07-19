import { existsSync } from 'fs'
import { binDir, playListsDir } from '../constants'
import { join } from 'path'
import { mkdir } from 'fs/promises'
import { getConfigData } from './config-data'

export async function ensureDefaultPlaylistsFolders() {
  try {
    const { defaultFolder } = await getConfigData()

    if (!existsSync(join(playListsDir, defaultFolder))) {
      await mkdir(join(playListsDir, defaultFolder), { recursive: true })
    }
  } catch {
    throw new Error('Error al crear las carpetas por defecto')
  }
}

export async function ensureBinFolder() {
  try {
    if (!existsSync(binDir)) {
      await mkdir(binDir, { recursive: true })
    }
  } catch {
    throw new Error('Error al crear la carpeta bin')
  }
}
