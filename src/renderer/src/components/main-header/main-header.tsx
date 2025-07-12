import { Button } from '@renderer/components/ui/button'
import { Minus, X } from 'lucide-react'
import { DevAudioInfo } from '@renderer/components/dev-audio-info'
import { HyperText } from '@renderer/components/magicui/hyper-text'
import { SearchInput } from '@renderer/components/search-input'
import { OpenFolderButton } from '@renderer/components/open-folder-button'

export function MainHeader() {
  const onClose = () => window.api.windowClose()
  const onMinimize = () => window.api.windowMinimize()

  return (
    <div className="app-region glass-item p-4">
      <header data-area="save-area" className="flex items-center justify-between w-full gap-8">
        <nav className="flex flex-1 grow basis-0 justify-start">
          <HyperText className="text-2xl font-bold app-region-none">Openfy Music</HyperText>
        </nav>

        <SearchInput />

        <nav className="flex flex-1 grow basis-0 items-center justify-end gap-1 [&>*]:app-region-none">
          <DevAudioInfo />

          <OpenFolderButton />

          <Button size="icon" onClick={onMinimize}>
            <Minus />
          </Button>

          <Button size="icon" onClick={onClose}>
            <X />
          </Button>
        </nav>
      </header>
    </div>
  )
}
