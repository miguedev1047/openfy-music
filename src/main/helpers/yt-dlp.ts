import { createRequire } from 'module'
import type YTDlpWrapProps from 'yt-dlp-wrap'

const require = createRequire(import.meta.url)
const YTDlpWrap = require('yt-dlp-wrap').default

export const YTDlpWrapInstance = new YTDlpWrap() as YTDlpWrapProps
