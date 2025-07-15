import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ThemeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Oscuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>Sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ThemeIcon() {
  const { theme } = useTheme()

  switch (theme) {
    case 'light':
      return <SunIcon />
    case 'dark':
      return <MoonIcon />
    case 'system':
      return <LaptopIcon />
    default:
      return <LaptopIcon />
  }
}
