import { zodResolver } from '@hookform/resolvers/zod'
import { finalYoutubeURL } from '@renderer/helpers/final-url'
import { showNotification } from '@renderer/helpers/show-notification'
import { useDependencies } from '@renderer/queries/use-query-dependecies'
import { useDownloadManager } from '@renderer/store/use-download-manager'
import { usePlaylistActiveStore } from '@renderer/store/use-playlist-manager-store'
import { downloadMusicMP3, DownloadMusicMP3 } from '@schemas/index'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export function useDownloadForm() {
  const { t } = useTranslation()
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
        title: t('download.notification.title'),
        body: t('download.notification.body')
      })

      toast.success(t('download.toasts.success.message'))
    } catch (error) {
      if (error instanceof Error) {
        const message = error.message.toLowerCase()

        if (message.includes('invalid url')) {
          toast.error(t('download.toasts.errors.invalidUrl'))
          return
        }

        if (message.includes('youtube said')) {
          toast.warning(t('download.toasts.warning.message'))
          return
        }

        if (message.includes('drm')) {
          toast.error(t('download.toasts.errors.drmProtected'))
          return
        }

        toast.error(t('download.toasts.errors.general'))
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
