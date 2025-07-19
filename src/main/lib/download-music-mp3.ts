import ffmpegPath from 'ffmpeg-static'

import { DownloadMusicProps } from '../../shared/models'
import { join } from 'path'
import { playListsDir } from '../constants'
import { BrowserWindow } from 'electron'
import { YTDlpWrapInstance } from '../helpers/yt-dlp'

export function DownloadMusicMP3({ folder, url }: DownloadMusicProps) {
  return new Promise((resolve, reject) => {
    const downloadPath = join(playListsDir, folder)

    const downloadArgs = [
      '--extract-audio',
      '--audio-format',
      'mp3',
      '--embed-thumbnail',
      '--add-metadata',
      '--ffmpeg-location',
      ffmpegPath || 'ffmpeg.exe',
      '--add-header',
      'referer:youtube.com',
      '--add-header',
      'user-agent:googlebot',
      '--output',
      `${downloadPath}/%(title)s.%(ext)s`,
      url
    ]

    const downloadProcess = YTDlpWrapInstance.exec(downloadArgs)

    downloadProcess
      .on('progress', (progress) => {
        const win = BrowserWindow.getFocusedWindow()
        win?.webContents.send('download-progress', progress.percent || 0)
      })
      .on('error', (err) => {
        reject(err)
      })
      .on('close', () => {
        resolve('✅ Descarga completa')
      })
  })
}
