import icon from '../../resources/icon.png?asset'

import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import { handleCloseWindow, handleMinimizeWindow } from './lib/window-controls'
import { openSongFolder } from './lib/open-song-folder'
import { getSongList, readSong, removeSong } from './lib/song-manager'
import { ReadSong, RemoveSong } from '../shared/types'
import { localResource } from './helpers/local-resource'
import { clearCacheMusicDir } from './helpers/music-dir'

const gotTheLock = app.requestSingleInstanceLock()

const SIZES = {
  width: 1200,
  height: 840,
  maxWidth: 1280,
  maxHeight: 900,
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
    title: 'Openfy Music',
    frame: false,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    roundedCorners: true,
    show: false,
    autoHideMenuBar: true,
    ...SIZES,
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

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  protocol.handle('local-resource', (request) => localResource(request))
  ipcMain.on('window-close', () => handleCloseWindow())
  ipcMain.on('window-minimize', () => handleMinimizeWindow())
  ipcMain.on('open-song-folder', () => openSongFolder())
  ipcMain.handle('song-list', () => getSongList())
  ipcMain.handle('read-song', (_event, ...args: Parameters<ReadSong>) => readSong(...args))
  ipcMain.handle('remove-song', (_event, ...args: Parameters<RemoveSong>) => removeSong(...args))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  clearCacheMusicDir()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
