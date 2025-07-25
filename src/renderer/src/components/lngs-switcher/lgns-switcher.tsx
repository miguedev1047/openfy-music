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
import { Label } from '@renderer/components/ui/label'
import { useTranslation } from 'react-i18next'
import { LNGS } from '@shared/constants'

export function LgnsSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <div className="w-full">
      <div className="w-full grid gap-2">
        <Label>{t('settings.form.lngs.title')}</Label>
        <Select defaultValue={i18n.language} onValueChange={(v) => i18n.changeLanguage(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('settings.form.lngs.selector.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('settings.form.lngs.selector.label')}</SelectLabel>
              <SelectSeparator />
              {Object.keys(LNGS).map((item) => (
                <SelectItem key={item} value={item} className="data-[state=checked]:opacity-50">
                  {LNGS[item].nativeName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-sm">{t('settings.form.lngs.description')}</p>
      </div>
    </div>
  )
}
