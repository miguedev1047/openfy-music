import { Alert, AlertTitle } from '@renderer/components/ui/alert'
import { useDownloadManager } from '@renderer/store/use-download-manager'
import { MessageCircleWarningIcon } from 'lucide-react'

export function DownloadAlert() {
  const isDownloading = useDownloadManager((state) => state.isDownloading)
  if (isDownloading) return null

  return (
    <Alert>
      <MessageCircleWarningIcon />
      <AlertTitle>
        Algunas canciones podrían no descargarse si los videos son privados, eliminados o no están
        disponibles.
      </AlertTitle>
    </Alert>
  )
}
