import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
  SelectItem
} from '@renderer/components/ui/select'
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { DownloadIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { LoadingState2 } from '@renderer/components/ui-states/loading'
import { useDownloadForm } from '@renderer/routes/download/-components/download-form/_hooks'
import { PlaylistFolderItems } from '@renderer/routes/download/-components/playlist-folder-items'
import { SidebarSeparator } from '@renderer/components/ui/sidebar'
import { DOWNLOAD_TYPES } from '@shared/constants'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function DownloadForm() {
  const { t } = useTranslation()
  const { canSubmit, form, isDownloading, isPending, onSubmit } = useDownloadForm()

  if (isDownloading) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <LoadingState2 message={t('download.downloadingMessage')} />
          <Button asChild>
            <Link to="/">{t('download.backButton')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('download.form.download.title')}</CardTitle>
        <CardDescription>{t('download.form.download.description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <Form {...form}>
          <form id="download-music-form" onSubmit={onSubmit} className="flex-1 grid gap-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('download.form.download.fields.url.title')}</FormLabel>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Input
                        placeholder={t('download.form.download.fields.url.placeholder')}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <FormDescription>
                    {t('download.form.download.fields.url.description')}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="downloadType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('download.form.download.fields.type.title')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('download.form.download.fields.type.title')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          <span>{t('download.form.download.fields.type.selectorLabel')}</span>
                        </SelectLabel>
                        <SidebarSeparator />
                        {DOWNLOAD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {t(type.label)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    {t('download.form.download.fields.type.description')}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t('download.form.download.fields.destinationPlaylist.title')}
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            'download.form.download.fields.destinationPlaylist.placeholder'
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t('download.form.download.fields.destinationPlaylist.selectorLabel')}
                        </SelectLabel>
                        <SelectSeparator />
                        <PlaylistFolderItems />
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    {t('download.form.download.fields.destinationPlaylist.description')}
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={!canSubmit} form="download-music-form">
          <DownloadIcon></DownloadIcon>
          <span>{t('download.form.submitButton')}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
