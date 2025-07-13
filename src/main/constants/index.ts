import { homedir } from 'os'
import { join } from 'path'

export const LOCAL_RESOURCE_PREFIX = 'local-resource://'
export const EXTENSIONS = ['mp3', 'mp4']

export const openfyMusicDir = join(homedir(), 'openfy-music')

export const musicDir = join(openfyMusicDir, 'Music')
export const cacheDir = join(openfyMusicDir, 'Cache')
export const playListsDir = join(openfyMusicDir, 'Playlists')
