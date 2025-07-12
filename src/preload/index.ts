import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { RemoveSong, ReadSong } from '../shared/types'

const api = {
  getSongs: () => ipcRenderer.invoke('song-list'),
  readSong: (...args: Parameters<ReadSong>) => ipcRenderer.invoke('read-song', ...args),
  removeSong: (...args: Parameters<RemoveSong>) => ipcRenderer.invoke('remove-song', ...args),
  openSongFolder: () => ipcRenderer.send('open-song-folder'),
  windowClose: () => ipcRenderer.send('window-close'),
  windowMinimize: () => ipcRenderer.send('window-minimize')
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
