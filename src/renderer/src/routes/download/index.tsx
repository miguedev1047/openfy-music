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

export const Route = createFileRoute('/download/')({
  loader: async ({ context }) => {
    const config = await context.queryClient.ensureQueryData(configQueryOpts)
    if (!config.allowTyDLPDownloads) redirect({ to: '/' })
  },
  component: RouteComponent
})

export function RouteComponent() {
  const { dependenciesQuery, hasDependencies, handleOpenDependecyFolder } = useCheckDependencies()

  if (dependenciesQuery.isLoading) {
    return <LoadingState message="Leyendo dependencias..." />
  }

  if (dependenciesQuery.isError) {
    return <ErrorState message="Error al leer las dependencias." />
  }

  if (hasDependencies) {
    return (
      <Box className="size-full flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <ErrorState message="No se encontraron las dependencias necesarias." />
          <Button onClick={handleOpenDependecyFolder}>
            <FolderIcon />
            <span>Abrir carpeta de dependencias</span>
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
