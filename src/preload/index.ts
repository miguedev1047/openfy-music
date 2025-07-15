import {
  ReadSong,
  GetSongsPlayList,
  OpenFolder,
  NewPlaylist,
  RemovePlaylist,
  RenamePlaylist,
  UpdateConfigData
} from '../shared/types'
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  getPlayLists: () => ipcRenderer.invoke('play-list'),
  getSongsPlaylist: (...args: Parameters<GetSongsPlayList>) =>
    ipcRenderer.invoke('songs-playlist', ...args),
  removePlaylist: (...args: Parameters<RemovePlaylist>) =>
    ipcRenderer.invoke('remove-playlist', ...args),
  renamePlaylist: (...args: Parameters<RenamePlaylist>) =>
    ipcRenderer.invoke('rename-playlist', ...args),

  getConfigData: () => ipcRenderer.invoke('get-config-data'),
  updateConfigData: (...args: Parameters<UpdateConfigData>) =>
    ipcRenderer.invoke('update-config-data', ...args),

  newPlaylist: (...args: Parameters<NewPlaylist>) => ipcRenderer.invoke('new-playlist', ...args),
  readSong: (...args: Parameters<ReadSong>) => ipcRenderer.invoke('read-song', ...args),

  windowClose: () => ipcRenderer.send('window-close'),
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-maximize'),
  openSongFolder: (...args: Parameters<OpenFolder>) => ipcRenderer.send('open-song-folder', ...args)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
