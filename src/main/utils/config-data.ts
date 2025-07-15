import { existsSync } from 'fs'
import { join } from 'path'
import { configData, configDir } from '../constants'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { UserConfig } from '../../shared/models'
import { jsonConverter } from '../helpers/utils'

const configFilePath = join(configDir, 'config.json')

export async function ensureJsonConfig() {
  if (!existsSync(configDir)) mkdir(configDir, { recursive: true })

  if (!existsSync(configFilePath)) {
    await writeFile(configFilePath, jsonConverter(configData), 'utf-8')
  }
}

export async function getConfigData() {
  try {
    await ensureJsonConfig()

    const raw = await readFile(configFilePath, 'utf-8')
    const parsed: UserConfig = await JSON.parse(raw)

    return { ...configData, ...parsed }
  } catch {
    throw new Error('Error al leer el archivo de configuración')
  }
}

export async function updateConfigData(data: Partial<UserConfig>) {
  try {
    const current = await getConfigData()
    const updated = { ...current, ...data }
    await writeFile(configFilePath, jsonConverter(updated), 'utf-8')
  } catch {
    throw new Error('Error al actualizar el archivo de configuración')
  }
}
