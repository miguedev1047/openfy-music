export function convertPath(originalPath: string) {
  const match = originalPath.match(/^\/([a-zA-Z])\/(.*)$/)
  if (match) {
    return `${match[1]}:/${match[2]}`
  } else {
    return originalPath
  }
}
