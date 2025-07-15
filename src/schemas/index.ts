import * as z from 'zod'

export const playlistName = z.object({
  playlistName: z
    .string({
      message: 'El nombre de la playlist es requerido'
    })
    .min(1, {
      message: 'El nombre de la playlist es requerido'
    })
})
export type PlaylistName = z.infer<typeof playlistName>
