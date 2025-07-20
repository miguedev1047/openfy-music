import { createRequire } from 'module'
import type YTDlpWrapProps from 'yt-dlp-wrap'
import { ytdlpPath } from './utils'

const require = createRequire(import.meta.url)
const YTDlpWrap = require('yt-dlp-wrap').default

export const YTDlpWrapInstance = new YTDlpWrap(ytdlpPath) as YTDlpWrapProps
