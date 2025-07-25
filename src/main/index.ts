import icon from '../../resources/icon.png?asset'

import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'

import {
  GetSongsPlayList,
  NewPlaylist,
  OpenFolder,
  ReadSong,
  RemovePlaylist,
  RenamePlaylist,
  UpdateConfigData,
  DownloadMusic,
  RemoveSong
} from '../shared/types'

import {
  handleCloseWindow,
  handleMinimizeWindow,
  toggleMaximizeWindow
} from './lib/window-controls'
import {
  getPlayLists,
  getSongsPlaylist,
  newPlaylist,
  removePlaylist,
  renamePlaylist
} from './lib/playlist-manager'
import { openBinFolder, openPlaylistFolder } from './lib/open-song-folder'
import { readSong, removeSong } from './lib/song-manager'
import { DownloadMusicMP3 } from './lib/download-music-mp3'
import { checkBinaries } from './lib/check-binaries'

import { localResource } from './helpers/local-resource'
import { ensureBinFolder, ensureDefaultPlaylistsFolders } from './utils/default-folder'
import { ensureJsonConfig, getConfigData, updateConfigData } from './utils/config-data'


const gotTheLock = app.requestSingleInstanceLock()

const SIZES = {
  width: 1200,
  height: 840,
  minWidth: 880,
  minHeight: 760
}

const PRIVILEGES = {
  secure: true,
  supportFetchAPI: true,
  standard: true,
  bypassCSP: true,
  stream: true
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon,
    ...SIZES,
    title: 'Openfy Music',
    frame: false,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    roundedCorners: true,
    show: false,
    autoHideMenuBar: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 15 },
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('before-input-event', (event, input) => {
    const isReload = (input.key === 'r' && input.control) || input.key === 'F5'

    if (process.env.NODE_ENV !== 'development') {
      if (isReload) {
        event.preventDefault()
      }
    }
  })

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        if (mainWindow.isFocused()) mainWindow.focus()
      }
    })
  }

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

protocol.registerSchemesAsPrivileged([{ scheme: 'local-resource', privileges: PRIVILEGES }])

// ipcMain Functions //

app.whenReady().then(() => {
  protocol.handle('local-resource', (request) => localResource(request))

  ipcMain.handle('play-list', () => getPlayLists())
  ipcMain.handle('songs-playlist', (_event, ...args: Parameters<GetSongsPlayList>) =>
    getSongsPlaylist(...args)
  )

  ipcMain.handle('get-config-data', () => getConfigData())
  ipcMain.handle('update-config-data', (_event, ...args: Parameters<UpdateConfigData>) =>
    updateConfigData(...args)
  )

  ipcMain.handle('read-song', (_event, ...args: Parameters<ReadSong>) => readSong(...args))
  ipcMain.handle('new-playlist', (_event, ...args: Parameters<NewPlaylist>) => newPlaylist(...args))
  ipcMain.handle('remove-playlist', (_event, ...args: Parameters<RemovePlaylist>) =>
    removePlaylist(...args)
  )
  ipcMain.handle('remove-song', (_event, ...args: Parameters<RemoveSong>) => removeSong(...args))
  ipcMain.handle('rename-playlist', (_event, ...args: Parameters<RenamePlaylist>) =>
    renamePlaylist(...args)
  )

  ipcMain.on('window-close', () => handleCloseWindow())
  ipcMain.on('window-minimize', () => handleMinimizeWindow())
  ipcMain.on('window-maximize', () => toggleMaximizeWindow())
  ipcMain.on('open-playlist-folder', (_event, ...args: Parameters<OpenFolder>) =>
    openPlaylistFolder(...args)
  )
  ipcMain.on('open-bin-folder', () => openBinFolder())

  ipcMain.handle('download-music-mp3', (_event, ...args: Parameters<DownloadMusic>) =>
    DownloadMusicMP3(...args)
  )

  ipcMain.handle('check-binaries', () => checkBinaries())
})

// Create Window //

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  try {
    await ensureBinFolder()
    await ensureDefaultPlaylistsFolders()
    await ensureJsonConfig()

    console.log('✅ Configuración inicializada')
  } catch (err) {
    console.error('❌ Error al inicializar la configuración:', err)
  }

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
