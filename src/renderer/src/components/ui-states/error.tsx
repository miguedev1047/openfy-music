import { Box } from '@renderer/components/ui/box'
import { MotionGrid } from '@renderer/components/ui/motion-grid'
import { errorFrames } from './_frames'

export function ErrorLoadSongs() {
  return (
    <Box className="size-full p-4 grid place-items-center">
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={errorFrames} cellClassName="size-[8px]" />
        <h2>Error al cargar las canciones</h2>
      </div>
    </Box>
  )
}
