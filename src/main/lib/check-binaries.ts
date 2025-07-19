import { join } from "path"
import { existsSync } from "fs"
import { binDir } from "../constants"
import { CheckBinariesProps } from "../../shared/models"

export function checkBinaries(): CheckBinariesProps {
  const ffmpegPath = join(binDir, process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg')
  const ytDlpPath = join(binDir, process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp')

  return { ffmpeg: existsSync(ffmpegPath), ytdlp: existsSync(ytDlpPath) }
}