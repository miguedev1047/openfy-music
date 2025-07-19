import {
  useAudioOptsStore,
  usePlayerStore,
  useSelectedSongStore
} from '@renderer/store/use-player-store'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { InfoIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Badge } from '@renderer/components/ui/badge'
import { formatDurationPlayer } from '@renderer/helpers/format-duration'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export function DevAudioInfo() {
  const isDEV = process.env.NODE_ENV !== 'development'

  if (isDEV) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button size="icon">
                <InfoIcon />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>

          <PopoverContent className="w-[440px]">
            <div className="space-y-4">
              <SelecetdSongData />
              <RealtimeData />
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent side="bottom">
          <p>Ver metadatos de la canción seleccionada.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SelecetdSongData() {
  const stateSelectedSong = useSelectedSongStore((state) => state.selectedSong)
  if (!stateSelectedSong) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1">{stateSelectedSong?.title}</CardTitle>
        <CardDescription>{stateSelectedSong?.artist}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span>Duración</span>
          <span>{formatDurationPlayer(stateSelectedSong?.duration || 0)}</span>
        </div>
        <div className="flex flex-col w-full overflow-auto">
          <span>Fuente</span>
          <span className="truncate font-mono text-xs ">{stateSelectedSong?.src}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function RealtimeData() {
  const stateAudio = usePlayerStore((state) => state)
  const audioOpts = useAudioOptsStore((state) => state)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Reproducción</CardTitle>
        <CardDescription>Estadísticas del reproductor en tiempo real</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Estado</span>
          <Badge variant={stateAudio.isPlaying ? 'default' : 'secondary'}>
            {stateAudio.isPlaying ? 'Reproduciendo' : 'Pausado'}
          </Badge>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatDurationPlayer(stateAudio.currentTime)}</span>
            <span>{formatDurationPlayer(stateAudio.duration)}</span>
          </div>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full"
              style={{
                width: `${(stateAudio.currentTime / stateAudio.duration) * 100}%`
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <span>Volumen</span>
          <span>{Math.round(audioOpts.volume * 100)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
