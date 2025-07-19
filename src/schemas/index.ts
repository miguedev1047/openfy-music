import * as z from 'zod'

export const playlistName = z.object({
  playlistName: z
    .string({ error: 'El nombre de la playlist es requerido' })
    .regex(/^[^\\/:*?"<>|]+$/, {
      message: 'El nombre no puede contener caracteres inválidos'
    })
    .min(1, { error: 'El nombre de la playlist es requerido' })
    .max(15, {
      error: 'El nombre debe tener como máximo 15 caracteres'
    })
})
export type PlaylistName = z.infer<typeof playlistName>

export const defaultPlaylistFolder = z.object({
  defaulFolder: z
    .string({ error: 'Selecciona una playlist por defecto' })
    .regex(/^[^\\/:*?"<>|]+$/, {
      message: 'El nombre no puede contener caracteres inválidos'
    })
    .min(1, { error: 'Selecciona una playlist por defecto' })
    .max(15, {
      error: 'El nombre debe tener como máximo 15 caracteres'
    }),
  allowTyDLPDownloads: z.boolean()
})
export type DefaultPlaylistFolder = z.infer<typeof defaultPlaylistFolder>

export const downloadMusicMP3 = z.object({
  url: z.url({ error: 'Debes ingresar una URL válida' }).min(1, { error: 'La URL es requerida' }),
  folder: z
    .string({ error: 'Selecciona una carpeta de descarga' })
    .regex(/^[^\\/:*?"<>|]+$/, {
      message: 'El nombre no puede contener caracteres inválidos'
    })
    .min(1, { error: 'Selecciona una carpeta de descarga' })
    .max(15, {
      error: 'El nombre debe tener como máximo 15 caracteres'
    }),
  downloadType: z.enum(['normal', 'playlist'])
})
export type DownloadMusicMP3 = z.infer<typeof downloadMusicMP3>
