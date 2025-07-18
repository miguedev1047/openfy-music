import { Box } from '@renderer/components/ui/box'

export function EmptyState({ message = 'No hay canciones disponibles' }: { message: string }) {
  return (
    <Box className="w-full h-full flex flex-col items-center justify-center py-12 text-center">
      <div className="w-1/2 mx-auto space-y-4">
        <p className="text-lg font-bold text-pretty">{message}</p>
      </div>
    </Box>
  )
}
