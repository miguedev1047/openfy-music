import { createFileRoute, redirect } from '@tanstack/react-router'
import { DownloadAlert } from '@renderer/routes/download/-components/download-alert'
import { DownloadForm } from '@renderer/routes/download/-components/download-form/download-form'
import { Box } from '@renderer/components/ui/box'
import { useCheckDependencies } from '@renderer/routes/download/-components/download-form/_hooks'
import { LoadingState } from '@renderer/components/ui-states/loading'
import { ErrorState } from '@renderer/components/ui-states/error'
import { Button } from '@renderer/components/ui/button'
import { FolderIcon } from 'lucide-react'
import { configQueryOpts } from '@renderer/queries/use-query-data'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/download/')({
  loader: async ({ context }) => {
    const config = await context.queryClient.ensureQueryData(configQueryOpts)
    if (!config.allowTyDLPDownloads) redirect({ to: '/' })
  },
  component: RouteComponent
})

export function RouteComponent() {
  const { t } = useTranslation()
  const { dependenciesQuery, hasDependencies, handleOpenDependecyFolder } = useCheckDependencies()

  if (dependenciesQuery.isLoading) {
    return <LoadingState message={t('download.uiStates.loading')} />
  }

  if (dependenciesQuery.isError) {
    return <ErrorState message={t('download.uiStates.error')} />
  }

  if (hasDependencies) {
    return (
      <Box className="size-full flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <ErrorState message={t('download.uiStates.missingDependencies.title')} />
          <Button onClick={handleOpenDependecyFolder}>
            <FolderIcon />
            <span>{t('download.uiStates.missingDependencies.button')}</span>
          </Button>
        </div>
      </Box>
    )
  }

  return (
    <Box className="w-full flex flex-col flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-(--radius)">
      <DownloadForm />
      <DownloadAlert />
    </Box>
  )
}
