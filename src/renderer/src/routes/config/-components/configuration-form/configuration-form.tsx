import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
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
import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { toast } from 'sonner'
import { Switch } from '@renderer/components/ui/switch'
import { useQueryClient } from '@tanstack/react-query'
import { AlertDependency } from '../alert-dependency'

export function ConfigurationForm() {
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
      toast.success('Configuracion actualizada con exito')
    } catch {
      toast.error('Ha ocurrido un error al actualizar la configuracion')
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>Configura tus preferencias de Openfy Music.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <Form {...form}>
          <form id="update-folder-form" onSubmit={onSubmit} className="w-full grid gap-6">
            <FormField
              control={form.control}
              name="defaulFolder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Playlist por defecto</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una playlist por defecto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Playlists</SelectLabel>
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
                    La carpeta que escojas sera tu playlist principal.
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
                      <FormLabel>Permitir descargas por YT-DLP</FormLabel>

                      <div className="space-y-2">
                        <FormDescription>
                          Esto habilita el poder descargar canciones a mp3 desde Youtube.
                        </FormDescription>
                      </div>
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
      </CardContent>

      <CardFooter>
        <CardAction>
          <Button disabled={isPending} form="update-folder-form">
            Guardar
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
