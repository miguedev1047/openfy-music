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
import { useTranslation } from 'react-i18next'

export function ModeToggle() {
  const { t } = useTranslation()
  const { setTheme } = useTheme()
  const [isPending, startTransition] = useTransition()

  const handleChangeTheme = (theme: 'light' | 'dark' | 'system') => {
    startTransition(async () => {
      try {
        setTheme(theme)
        await window.api.updateConfigData({ theme })
      } catch {
        console.error('An error occurred while changing the theme.')
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
        <DropdownMenuItem onClick={() => handleChangeTheme('light')}>
          {t('settings.form.themes.modes.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('dark')}>
          {t('settings.form.themes.modes.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme('system')}>
          {t('settings.form.themes.modes.system')}
        </DropdownMenuItem>
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
