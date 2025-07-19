import { Box } from '@renderer/components/ui/box'
import { cn } from '@renderer/lib/utils'

interface EmptyStateProps extends React.ComponentProps<typeof Box> {
  message?: string
}

export function EmptyState({
  className,
  message = 'No hay canciones disponibles',
  ...props
}: EmptyStateProps) {
  return (
    <Box
      {...props}
      className={cn(
        'w-full h-full flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="w-1/2 mx-auto space-y-4">
        <p className="text-lg font-bold text-pretty">{message}</p>
      </div>
    </Box>
  )
}
