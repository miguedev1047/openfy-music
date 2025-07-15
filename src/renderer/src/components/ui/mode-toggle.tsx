import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { useTheme } from '@renderer/components/ui/theme-provider'
import { Palette } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Oscuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('orange-pastel')}>Orange Pastel</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          Sincronizar con el ordenador
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
