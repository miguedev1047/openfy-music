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

export function DownloadForm() {
  const { canSubmit, form, isDownloading, isPending, onSubmit } = useDownloadForm()

  if (isDownloading) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <LoadingState2 message="Estamos descargando tu cancion(es)" />
          <Button asChild>
            <Link to="/">Volver</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Descargar canciones</CardTitle>
        <CardDescription>Ingresa la url de la canción o playlist de Youtube</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <Form {...form}>
          <form id="download-music-form" onSubmit={onSubmit} className="flex-1 grid gap-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la canción</FormLabel>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <FormDescription>Ingresa la url de la canción de Youtube</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="downloadType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de descarga</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una opcion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          <span>Descargar:</span>
                        </SelectLabel>
                        <SidebarSeparator />
                        {DOWNLOAD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Dependiendo del modo seleccionado se descargara la playlist o solo la canción.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Playlist de descarga</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una playlist de descarga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Playlists</SelectLabel>
                        <SelectSeparator />
                        <PlaylistFolderItems />
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    La playlist que escojas sera donde se descargaran las canciones.
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
          <span>Descargar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
