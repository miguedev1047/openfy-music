import { Box } from '@renderer/components/ui/box'
import { MotionGrid } from '@renderer/components/ui/motion-grid'
import { searchingFrames } from '@renderer/components/ui-states/_frames'

export function LoadingState({ message = 'Cargando...' }: { message?: string }) {
  return (
    <Box className="size-full p-4 grid place-items-center">
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={searchingFrames} cellClassName="size-[8px]" />
        <p>{message}</p>
      </div>
    </Box>
  )
}
