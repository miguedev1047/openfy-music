import { Box } from '@renderer/components/ui/box'
import { MotionGrid } from '@renderer/components/ui/motion-grid'
import { downloadingFrames, searchingFrames } from '@renderer/components/ui-states/_frames'
import { cn } from '@renderer/lib/utils'

interface LoadingStateProps extends React.ComponentProps<typeof Box> {
  message?: string
}

export function LoadingState({ className, message = 'Cargando...', ...props }: LoadingStateProps) {
  return (
    <Box {...props} className={cn('size-full p-4 flex justify-center items-center', className)}>
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={searchingFrames} cellClassName="size-[8px]" />
        <p>{message}</p>
      </div>
    </Box>
  )
}

export function LoadingState2({ className, message = 'Cargando...', ...props }: LoadingStateProps) {
  return (
    <Box {...props} className={cn('size-full p-4 flex justify-center items-center', className)}>
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={downloadingFrames} cellClassName="size-[8px]" />
        <p>{message}</p>
      </div>
    </Box>
  )
}
