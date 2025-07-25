import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@renderer/components/ui/hover-card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@renderer/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectValue
} from '@renderer/components/ui/select'
import { usePlaylistFolders } from '@renderer/queries/use-query-playlist'
import { useForm } from 'react-hook-form'
import { defaultPlaylistFolder, DefaultPlaylistFolder } from '@schemas/index'
import { configQueryOpts, useConfig } from '@renderer/queries/use-query-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderIcon, InfoIcon, MessageCircleWarningIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { toast } from 'sonner'
import { Switch } from '@renderer/components/ui/switch'
import { useQueryClient } from '@tanstack/react-query'
import { AlertDependency } from '../alert-dependency'
import { Alert, AlertDescription, AlertTitle } from '@renderer/components/ui/alert'
import { useTranslation } from 'react-i18next'
import { LgnsSwitcher } from '@renderer/components/lngs-switcher'

export function ConfigurationForm() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const configQuery = useConfig()
  const config = configQuery.data

  const playlistFoldersQuery = usePlaylistFolders()
  const playlistFolders = playlistFoldersQuery.data ?? []

  const form = useForm<DefaultPlaylistFolder>({
    defaultValues: {
      defaulFolder: config.defaultFolder,
      allowTyDLPDownloads: config.allowTyDLPDownloads
    },
    values: {
      defaulFolder: config.defaultFolder,
      allowTyDLPDownloads: config.allowTyDLPDownloads
    },
    resolver: zodResolver(defaultPlaylistFolder)
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await window.api.updateConfigData({
        defaultFolder: values.defaulFolder,
        allowTyDLPDownloads: values.allowTyDLPDownloads
      })

      queryClient.invalidateQueries(configQueryOpts)
      toast.success(t('settings.form.preferences.fields.allowYTDLP.toasts.success.message'))
    } catch {
      toast.error(t('settings.form.preferences.fields.allowYTDLP.toasts.errors.message'))
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.form.preferences.title')}</CardTitle>
        <CardDescription> {t('settings.form.preferences.description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <Form {...form}>
          <form id="update-folder-form" onSubmit={onSubmit} className="w-full grid gap-6">
            <FormField
              control={form.control}
              name="defaulFolder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t('settings.form.preferences.fields.defaultPlaylist.title')}
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            'settings.form.preferences.fields.defaultPlaylist.description'
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t('settings.form.preferences.fields.defaultPlaylist.label')}
                        </SelectLabel>
                        <SelectSeparator />
                        <SelectContent>
                          {playlistFolders.map((folder) => (
                            <SelectItem value={folder.playlist} key={folder.playlist}>
                              <FolderIcon />
                              <p>{folder.title}</p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    {t('settings.form.preferences.fields.defaultPlaylist.description')}
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="allowTyDLPDownloads"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <InfoIcon />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent side="left" className="w-[480px] text-pretty p-0">
                            <Alert variant="destructive" className="border-0">
                              <MessageCircleWarningIcon />
                              <AlertTitle>
                                {t('settings.form.preferences.fields.allowYTDLP.disclaimer.title')}
                              </AlertTitle>
                              <AlertDescription>
                                <p>
                                  {t(
                                    'settings.form.preferences.fields.allowYTDLP.disclaimer.note1'
                                  )}
                                </p>
                                <p>
                                  {t(
                                    'settings.form.preferences.fields.allowYTDLP.disclaimer.note2'
                                  )}
                                </p>
                                <p>
                                  {t(
                                    'settings.form.preferences.fields.allowYTDLP.disclaimer.note3'
                                  )}
                                </p>
                              </AlertDescription>
                            </Alert>
                          </HoverCardContent>
                        </HoverCard>
                        <FormLabel>
                          {t('settings.form.preferences.fields.allowYTDLP.label')}
                        </FormLabel>
                      </div>
                      <FormDescription>
                        {t('settings.form.preferences.fields.allowYTDLP.description')}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <AlertDependency />
            </div>
          </form>
        </Form>
        <LgnsSwitcher />
      </CardContent>

      <CardFooter>
        <CardAction>
          <Button disabled={isPending} form="update-folder-form">
            {t('settings.form.preferences.saveButton')}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
