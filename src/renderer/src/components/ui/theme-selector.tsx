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

export function ThemeSelector({ className }: React.ComponentProps<'div'>) {
  const { activeTheme, setActiveTheme } = useThemeConfig()
  const [isPending, startTransition] = useTransition()

  const handleChangeActiveTheme = (activeTheme: string) => {
    startTransition(async () => {
      try {
        setActiveTheme(activeTheme)
        await window.api.updateConfigData({ activeTheme })
      } catch {
        toast.error('Error al cambiar el tema')
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
          <SelectValue placeholder="Selecciona un tema" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem
                key={theme.name}
                value={theme.value}
                className="data-[state=checked]:opacity-50"
              >
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Colores</SelectLabel>
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
                <p>{theme.name}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
