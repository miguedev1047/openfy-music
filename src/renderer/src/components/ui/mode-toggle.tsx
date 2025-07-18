import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { useTheme } from 'next-themes'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const handleChangeTheme = (theme: 'light' | 'dark' | 'system') => {
    startTransition(async () => {
      try {
        setTheme(theme)
        await window.api.updateConfigData({ theme })
      } catch {
        toast.error('Error al cambiar el tema')
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <ThemeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeTheme('light')}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('dark')}>Oscuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('system')}>Sistema</DropdownMenuItem>
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
