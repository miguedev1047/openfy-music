import { Alert, AlertDescription, AlertTitle } from '@renderer/components/ui/alert'
import { Badge } from '@renderer/components/ui/badge'
import { handleOpenDependencyFolder } from '@renderer/helpers/open-folder'
import { useConfig } from '@renderer/queries/use-query-data'
import { useDependencies } from '@renderer/queries/use-query-dependecies'
import { CheckIcon, MessageCircleWarningIcon } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'

export function AlertDependency() {
  const { t } = useTranslation()

  const configQuery = useConfig()
  const config = configQuery.data

  const dependencyQuery = useDependencies()
  const dependency = dependencyQuery.data

  const hasDependencies = !dependency?.ffmpeg || !dependency.ytdlp

  if (!config.allowTyDLPDownloads) return null

  return (
    <Alert>
      {!hasDependencies ? <CheckIcon /> : <MessageCircleWarningIcon />}
      <AlertTitle>
        {!hasDependencies
          ? t('settings.form.preferences.fields.allowYTDLP.disclaimer.dependencyStatus.found.title')
          : t(
              'settings.form.preferences.fields.allowYTDLP.disclaimer.dependencyStatus.missing.title'
            )}
      </AlertTitle>
      <AlertDescription>
        {!hasDependencies && (
          <span>
            <Trans i18nKey="settings.form.preferences.fields.allowYTDLP.disclaimer.dependencyStatus.found.description">
              Las dependencias necesarias han sido <Badge variant="secondary">detectadas</Badge>. No
              es necesario realizar ninguna acción.
            </Trans>
          </span>
        )}

        {hasDependencies && (
          <span>
            <Trans i18nKey='settings.form.preferences.fields.allowYTDLP.disclaimer.dependencyStatus.missing.description'>
              No se detectaron algunas dependencias <Badge variant="destructive">faltantes</Badge>.{' '}
              <br />
              Puedes descargarlas desde esta carpeta:{' '}
              <span
                className="text-primary hover:underline"
                onClick={handleOpenDependencyFolder}
                role="button"
              >
                Abrir carpeta
              </span>
            </Trans>
          </span>
        )}
      </AlertDescription>
    </Alert>
  )
}
