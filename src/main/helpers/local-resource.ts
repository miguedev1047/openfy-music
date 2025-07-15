import { net } from 'electron'

export function convertPath(originalPath: string) {
  const match = originalPath.match(/^\/([a-zA-Z])\/(.*)$/)
  if (match) {
    return `${match[1]}:/${match[2]}`
  } else {
    return originalPath
  }
}

export function localResource(request) {
  const decodedUrl = decodeURIComponent(
    request.url.replace(new RegExp(`^local-resource://`, 'i'), '/')
  )
  const fullPath = process.platform === 'win32' ? convertPath(decodedUrl) : decodedUrl
  return net.fetch(`file://${fullPath}`)
}
