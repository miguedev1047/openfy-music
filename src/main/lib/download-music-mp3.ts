import { join } from 'path'
import { BrowserWindow } from 'electron'
import { DownloadMusicProps } from '../../shared/models'
import { playListsDir } from '../constants'
import { YTDlpWrapInstance } from '../helpers/yt-dlp'
import { ffmpegPath } from '../helpers/utils'

export function DownloadMusicMP3({ folder, url }: DownloadMusicProps) {
  return new Promise((resolve, reject) => {
    const downloadPath = join(playListsDir, folder)

    if (!ffmpegPath) {
      throw new Error(`No se encontrarón las dependencias necesarias.`)
    }

    const downloadArgs = [
      '--extract-audio',
      '--audio-format',
      'mp3',
      '--embed-thumbnail',
      '--add-metadata',
      '--ffmpeg-location',
      ffmpegPath,
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
        console.log(`❌ Error al descargar: ${err}`)
        reject(err)
      })
      .on('close', () => {
        console.log('✅ Descarga completa')
        resolve('✅ Descarga completa')
      })
  })
}
