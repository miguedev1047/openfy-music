import { DownloadTypes } from "@renderer/store/use-download-manager"

interface FinalYoutubeURLProps {
  url: string
  downloadType: DownloadTypes
}

export function finalYoutubeURL({ url, downloadType }: FinalYoutubeURLProps): string {
  const parts = url.split('&')

  switch (downloadType) {
    case 'normal':
      return parts[0]
    case 'playlist':
      return parts.slice(0, 2).join('&')
    default:
      return url
  }
}