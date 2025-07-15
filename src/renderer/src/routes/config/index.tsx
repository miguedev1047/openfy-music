import { createFileRoute } from '@tanstack/react-router'
import { Configuration } from '@renderer/routes/config/-components/configuration'
import { Themes } from '@renderer/routes/config/-components/themes'
import { Box } from '@renderer/components/ui/box'

export const Route = createFileRoute('/config/')({
  component: RouteComponent
})

export function RouteComponent() {
  return (
    <Box className="flex flex-col flex-1 gap-4">
      <Configuration />
      <Themes />
    </Box>
  )
}

