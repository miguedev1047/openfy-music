import { zodResolver } from '@hookform/resolvers/zod'
import { finalYoutubeURL } from '@renderer/helpers/final-url'
import { showNotification } from '@renderer/helpers/show-notification'
import { useDependencies } from '@renderer/queries/use-query-dependecies'
import { useDownloadManager } from '@renderer/store/use-download-manager'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'
import { downloadMusicMP3, DownloadMusicMP3 } from '@schemas/index'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function useDownloadForm() {
  const navigate = useNavigate()

  const isDownloading = useDownloadManager((state) => state.isDownloading)
  const setIsDownloading = useDownloadManager((state) => state.setIsDownloading)

  const setActivePlaylist = usePlaylistActiveStore((state) => state.setActivePlaylist)

  const form = useForm<DownloadMusicMP3>({
    defaultValues: { folder: '', url: '', downloadType: 'normal' },
    resolver: zodResolver(downloadMusicMP3)
  })

  const isPending = form.formState.isSubmitting
  const canSubmit = form.formState.isValid && !isPending

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setIsDownloading(true)
      const url = finalYoutubeURL({ url: values.url, downloadType: values.downloadType })

      await window.api.downloadMusicMP3({ folder: values.folder, url })

      showNotification({
        title: '¡Tus canción(es) han sido descargadas!',
        body: 'Se han descargado las canción(es) seleccionadas.'
      })

      toast.success('Descarganda completa con exito')
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.toLowerCase()

        if (message.includes('invalid url')) {
          toast.error('La URL es inválida.')
          return
        }

        if (message.includes('youtube said')) {
          toast.warning(
            'La canción se descargó parcialmente. Algunos videos eran privados o no estaban disponibles.'
          )
          return
        }

        if (message.includes('drm')) {
          toast.error('El contenido está protegido por DRM y no se puede descargar.')
          return
        }

        toast.error('Ocurrió un error al descargar la(s) canción(es). Intenta de nuevo.')
      }
    } finally {
      setIsDownloading(false)
      navigate({ to: '/' })
      setActivePlaylist(values.folder)
    }
  })

  return { form, canSubmit, isPending, isDownloading, onSubmit }
}

export function useCheckDependencies() {
  const dependenciesQuery = useDependencies()
  const dependency = dependenciesQuery.data

  const hasDependencies = !dependency?.ffmpeg || !dependency.ytdlp

  const handleOpenDependecyFolder = () => window.api.openBinFolder()

  return { dependenciesQuery, dependency, handleOpenDependecyFolder, hasDependencies }
}
