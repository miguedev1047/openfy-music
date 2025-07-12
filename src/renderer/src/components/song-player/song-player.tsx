import { PlayButton } from '@renderer/components/song-player/play-button'
import { NextButton } from '@renderer/components/song-player/next-button'
import { PrevButton } from '@renderer/components/song-player/prev-button'
import { Progressbar } from '@renderer/components/song-player/progressbar'
import { VolumenButton } from '@renderer/components/song-player/volumen-button'
import { AudioPlayer } from '@renderer/components/song-player/audio-player'
import { LoopButton } from '@renderer/components/song-player/loop-button'
import { ShuffleButton } from '@renderer/components/song-player/shuffle-button'
import { TooltipProvider } from '@renderer/components/ui/tooltip'

export function SongPlayer() {
  return (
    <div className="w-full glass-item p-4">
      <AudioPlayer />

      <TooltipProvider>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-1">
            <PrevButton />
            <PlayButton />
            <NextButton />
            <ShuffleButton />
            <LoopButton />
          </div>

          <Progressbar />

          <div className="flex w-[400px] items-center gap-1">
            <VolumenButton />
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}
