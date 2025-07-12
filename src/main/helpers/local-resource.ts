import { net } from 'electron'
import { convertPath } from './convert-path'

export function localResource(request) {
  const decodedUrl = decodeURIComponent(
    request.url.replace(new RegExp(`^local-resource://`, 'i'), '/')
  )
  const fullPath = process.platform === 'win32' ? convertPath(decodedUrl) : decodedUrl
  return net.fetch(`file://${fullPath}`)
}
