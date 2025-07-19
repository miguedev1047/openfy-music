import { useConfig } from '@renderer/queries/use-query-data'
import { Button } from '@renderer/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useDownloadManager } from '@renderer/store/use-download-manager'
import { Box } from '@renderer/components/ui/box'
import { LoadingState2 } from '@renderer/components/ui-states/loading'
import { AnimateIcon } from '../animate-ui/icons/icon'
import { Download } from '../animate-ui/icons/download-icon'

export function DownloadMusicButton() {
  const configQuery = useConfig()
  const config = configQuery.data

  const isDownloading = useDownloadManager((state) => state.isDownloading)

  if (!config.allowTyDLPDownloads) return null

  return (
    <AnimateIcon animateOnHover animateOnTap>
      <Button
        size="icon"
        variant="ghost"
        data-download={isDownloading}
        asChild
        className="data-[download=true]:animate-pulse data-[download=true]:text-green-500"
      >
        <Link to="/download" viewTransition>
          <Download />
        </Link>
      </Button>
    </AnimateIcon>
  )
}

export function DownloadMusicPreview() {
  const isDownloading = useDownloadManager((state) => state.isDownloading)

  if (!isDownloading) return null

  return (
    <Box className="p-4">
      <LoadingState2
        className="p-0 justify-start"
        message="Estamos descargando tus canciones, por favor espera..."
      />
    </Box>
  )
}
