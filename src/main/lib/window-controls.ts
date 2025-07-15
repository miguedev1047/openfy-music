import { BrowserWindow } from 'electron'

export function handleCloseWindow() {
  const win = BrowserWindow.getFocusedWindow()
  if (win) return win.close()
}

export function handleMinimizeWindow() {
  const win = BrowserWindow.getFocusedWindow()
  if (win) return win.minimize()
}

export function toggleMaximizeWindow() {
  const win = BrowserWindow.getFocusedWindow() 
  if (!win) return

  const isMaximized = win.isMaximized()
  if (isMaximized) return win.unmaximize()
  return win.maximize()
}