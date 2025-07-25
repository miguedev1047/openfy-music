import { SearchIcon, X } from 'lucide-react'
import { Input } from '@renderer/components/ui/input'
import { useFilterSongs } from '@renderer/store/use-filter-songs'
import { useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const ROUTES = ['/download', '/config']

export function SearchInput() {
  const { t } = useTranslation()

  const search = useFilterSongs((state) => state.search)
  const onSearch = useFilterSongs((state) => state.onSearch)
  const onClearSearch = (): void => onSearch('')

  const location = useLocation()
  const isInRoutes = ROUTES.some((route) => location.pathname.startsWith(route))

  if (isInRoutes) return null

  return (
    <nav className="w-1/3">
      <div className="relative">
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="peer ps-9 pe-9 app-region-none"
          placeholder={t('searchBar.placeholder')}
        />
        <button
          onClick={onClearSearch}
          className="text-muted-foreground/80 hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={16} />
        </button>
      </div>
    </nav>
  )
}
