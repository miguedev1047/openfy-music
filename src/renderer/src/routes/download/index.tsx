import { createFileRoute } from '@tanstack/react-router'
import { DownloadAlert } from '@renderer/routes/download/-components/download-alert'
import { DownloadForm } from '@renderer/routes/download/-components/download-form/download-form'
import { Box } from '@renderer/components/ui/box'

export const Route = createFileRoute('/download/')({
  component: RouteComponent
})

export function RouteComponent() {
  return (
    <Box className="w-full flex flex-col flex-1 p-4 space-y-4">
      <DownloadForm />
      <DownloadAlert />
    </Box>
  )
}
