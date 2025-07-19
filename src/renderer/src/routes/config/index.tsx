import { createFileRoute } from '@tanstack/react-router'
import { ConfigurationForm } from '@renderer/routes/config/-components/configuration-form'
import { ThemesForm } from '@renderer/routes/config/-components/themes-form'
import { Box } from '@renderer/components/ui/box'

export const Route = createFileRoute('/config/')({
  component: RouteComponent
})

export function RouteComponent() {
  return (
    <Box className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-(--radius)">
      <ConfigurationForm />
      <ThemesForm />
    </Box>
  )
}

