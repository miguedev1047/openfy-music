import { Button } from '@renderer/components/ui/button'
import { ChevronLeft, Maximize, Minus, Music, Settings, X } from 'lucide-react'
import { DevAudioInfo } from '@renderer/components/dev-audio-info'
import { SearchInput } from '@renderer/components/search-input'
import { Box } from '@renderer/components/ui/box'
import { Link, useLocation } from '@tanstack/react-router'
import { DownloadMusicButton } from '../download-music'

export function MainHeader() {
  const onClose = () => window.api.windowClose()
  const onMinimize = () => window.api.windowMinimize()
  const toggleMaximize = () => window.api.toggleMaximize()

  const location = useLocation()
  const isInHome = location.pathname !== '/'

  return (
    <Box className="app-region p-4">
      <header data-area="save-area" className="flex items-center justify-between w-full gap-8">
        <nav className="flex flex-1  grow basis-0 justify-start items-center gap-1 [&>*]:app-region-none">
          <Button size="icon" variant="outline" asChild>
            <Link to="/" viewTransition={{ types: ['fade'] }}>
              {isInHome ? <ChevronLeft /> : <Music />}
            </Link>
          </Button>

          <DevAudioInfo />
        </nav>

        <SearchInput />

        <nav className="flex flex-1 grow basis-0 items-center justify-end gap-1 [&>*]:app-region-none">
          <DownloadMusicButton />

          <Button size="icon" variant="outline" asChild>
            <Link to="/config" viewTransition={{ types: ['fade'] }}>
              <Settings />
            </Link>
          </Button>

          <Button size="icon" variant="outline" onClick={onMinimize}>
            <Minus />
          </Button>

          <Button size="icon" variant="outline" onClick={toggleMaximize}>
            <Maximize />
          </Button>

          <Button size="icon" variant="outline" onClick={onClose}>
            <X />
          </Button>
        </nav>
      </header>
    </Box>
  )
}
