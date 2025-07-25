import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { cn } from '@renderer/lib/utils'
import { useThemeConfig } from '@renderer/components/ui/active-theme'
import { Label } from '@renderer/components/ui/label'
import { COLOR_THEMES, DEFAULT_THEMES } from '@shared/constants'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { useTranslation } from 'react-i18next'

export function ThemeSelector({ className }: React.ComponentProps<'div'>) {
  const { t } = useTranslation()
  const { activeTheme, setActiveTheme } = useThemeConfig()
  const [isPending, startTransition] = useTransition()

  const handleChangeActiveTheme = (activeTheme: string) => {
    startTransition(async () => {
      try {
        setActiveTheme(activeTheme)
        await window.api.updateConfigData({ activeTheme })
      } catch {
        toast.error(t('settings.form.themes.toasts.errors.message'))
      }
    })
  }

  return (
    <div className={cn('w-full flex items-center gap-2', className)}>
      <Label htmlFor="theme-selector" className="sr-only">
        Tema
      </Label>
      <Select value={activeTheme} onValueChange={handleChangeActiveTheme} disabled={isPending}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="w-full bg-secondary text-secondary-foreground border-secondary"
        >
          <SelectValue placeholder={t('settings.form.themes.selector.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem
                key={theme.name}
                value={theme.value}
                className="data-[state=checked]:opacity-50"
              >
                {t(theme.name)}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>{t('settings.form.themes.selector.label')}</SelectLabel>
            {COLOR_THEMES.map((theme) => (
              <SelectItem
                key={theme.name}
                value={theme.value}
                className="data-[state=checked]:opacity-50"
              >
                <div
                  className="size-5 rounded-full border border-foreground"
                  style={{ backgroundColor: theme.color }}
                />
                <p>{t(theme.name)}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
