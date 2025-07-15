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
import { useDataConfig } from '@renderer/queries/use-query-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { toast } from 'sonner'

export function Configuration() {
  const configDataQuery = useDataConfig()
  const configData = configDataQuery.data

  const playlistFoldersQuery = usePlaylistFolders()
  const playlistFolders = playlistFoldersQuery.data ?? []

  const form = useForm<DefaultPlaylistFolder>({
    defaultValues: { defaulFolder: configData.defaultFolder },
    values: { defaulFolder: configData.defaultFolder },
    resolver: zodResolver(defaultPlaylistFolder)
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await window.api.updateConfigData({ defaultFolder: values.defaulFolder })
      toast.success(`Playlst por defecto cambiada a: ${values.defaulFolder}`)
    } catch {
      toast.error('Ha ocurrido un error al cambiar la playlist por defecto')
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>Configura tus preferencias de Openfy Music.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            id="update-folder-form"
            onSubmit={onSubmit}
            className="w-full grid grid-cols-2 gap-4"
          >
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
