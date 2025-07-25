import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { ThemeSelector } from '@renderer/components/ui/theme-selector'
import { ModeToggle } from '@renderer/components/ui/mode-toggle'
import { useTranslation } from 'react-i18next'

export function ThemesForm() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.form.themes.title')}</CardTitle>
        <CardDescription> {t('settings.form.themes.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1">
            <ModeToggle />
            <ThemeSelector />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
