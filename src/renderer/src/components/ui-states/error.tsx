import { Box } from '@renderer/components/ui/box'
import { MotionGrid } from '@renderer/components/ui/motion-grid'
import { errorFrames } from '@renderer/components/ui-states/_frames'
import { cn } from '@renderer/lib/utils'

interface ErrorStateProps extends React.ComponentProps<typeof Box> {
  message?: string
}

export function ErrorState({
  className,
  message = 'Ha ocurrido un error.',
  ...props
}: ErrorStateProps) {
  return (
    <Box {...props} className={cn('size-full p-4 grid place-items-center', className)}>
      <div className="flex items-center gap-3">
        <MotionGrid gridSize={[5, 5]} frames={errorFrames} cellClassName="size-[8px]" />
        <p>{message}</p>
      </div>
    </Box>
  )
}
