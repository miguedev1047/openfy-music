import { Alert, AlertDescription, AlertTitle } from '@renderer/components/ui/alert'
import { Badge } from '@renderer/components/ui/badge'
import { handleOpenDependencyFolder } from '@renderer/helpers/open-folder'
import { useConfig } from '@renderer/queries/use-query-data'
import { useDependencies } from '@renderer/queries/use-query-dependecies'
import { CheckIcon, MessageCircleWarningIcon } from 'lucide-react'

export function AlertDependency() {
  const configQuery = useConfig()
  const config = configQuery.data

  const dependencyQuery = useDependencies()
  const dependency = dependencyQuery.data

  const hasDependencies = dependency && Object.keys(dependency).length > 0

  if (!config.allowTyDLPDownloads) return null

  return (
    <Alert>
      {hasDependencies ? <CheckIcon /> : <MessageCircleWarningIcon />}
      <AlertTitle>{hasDependencies ? 'Todo listo' : 'Faltan dependencias'}</AlertTitle>
      <AlertDescription>
        {hasDependencies && (
          <span>
            Las dependencias necesarias han sido <Badge variant="secondary">detectadas</Badge>. No
            es necesario realizar ninguna acción.
          </span>
        )}

        {!hasDependencies && (
          <span>
            No se detectaron algunas dependencias <Badge variant="destructive">faltantes</Badge>.
            Puedes descargarlas desde esta carpeta:{' '}
            <span
              className="text-primary hover:underline"
              onClick={handleOpenDependencyFolder}
              role="button"
            >
              Abrir carpeta
            </span>
          </span>
        )}
      </AlertDescription>
    </Alert>
  )
}
