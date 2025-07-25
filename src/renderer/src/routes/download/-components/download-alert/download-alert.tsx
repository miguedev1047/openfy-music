import { Alert, AlertTitle } from '@renderer/components/ui/alert'
import { useDownloadManager } from '@renderer/store/use-download-manager'
import { MessageCircleWarningIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function DownloadAlert() {
  const { t } = useTranslation()
  
  const isDownloading = useDownloadManager((state) => state.isDownloading)
  if (isDownloading) return null

  return (
    <Alert>
      <MessageCircleWarningIcon />
      <AlertTitle>{t('download.form.downloadWarning.description')}</AlertTitle>
    </Alert>
  )
}
