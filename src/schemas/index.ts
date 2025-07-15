import * as z from 'zod'

export const playlistName = z.object({
  playlistName: z
    .string({ error: 'El nombre de la playlist es requerido' })
    .min(1, { error: 'El nombre de la playlist es requerido' })
})
export type PlaylistName = z.infer<typeof playlistName>

export const defaultPlaylistFolder = z.object({
  defaulFolder: z
    .string({ error: 'Selecciona una playlist por defecto' })
    .min(1, { error: 'Selecciona una playlist por defecto' })
})
export type DefaultPlaylistFolder = z.infer<typeof defaultPlaylistFolder>
