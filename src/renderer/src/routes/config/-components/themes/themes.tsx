import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { ThemeSelector } from '@renderer/components/ui/theme-selector'
import { ModeToggle } from '@renderer/components/ui/mode-toggle'

export function Themes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temas</CardTitle>
        <CardDescription>Selecciona el tema de tu preferencia.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center gap-1">
            <ThemeSelector />
            <ModeToggle />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
