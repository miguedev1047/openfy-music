import { homedir } from 'os'
import { join } from 'path'
import { UserConfig } from '../../shared/models'

export const configData: UserConfig = {
  defaultFolder: 'Mis canciones',
  theme: 'dark',
  activeTheme: 'default',
  allowTyDLPDownloads: false
}

export const LOCAL_RESOURCE_PREFIX = 'local-resource://'
export const EXTENSIONS = ['mp3', 'mp4']

export const openfyMusicDir = join(homedir(), 'openfy-music')

export const cacheDir = join(openfyMusicDir, 'Cache')
export const playListsDir = join(openfyMusicDir, 'Playlists')
export const configDir = join(openfyMusicDir, 'Config')
