import { Box } from '@renderer/components/ui/box'
import { MotionGrid } from '@renderer/components/ui/motion-grid'
import { errorFrames } from '@renderer/components/ui-states/_frames'

export function ErrorState({ message = 'Ha ocurrido un error.' }: { message?: string }) {
  return (
    <Box className="size-full p-4 grid place-items-center">
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={errorFrames} cellClassName="size-[8px]" />
        <p>{message}</p>
      </div>
    </Box>
  )
}
