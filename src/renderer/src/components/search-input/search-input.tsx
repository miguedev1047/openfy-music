import { SearchIcon, X } from 'lucide-react'
import { Input } from '@renderer/components/ui/input'
import { useFilterSongs } from '@renderer/store/use-filter-songs'

export function SearchInput() {
  const search = useFilterSongs((state) => state.search)
  const onSearch = useFilterSongs((state) => state.onSearch)
  const onClearSearch = (): void => onSearch('')

  return (
    <nav className='w-1/3'>
      <div className='relative'>
        <div className='text-muted/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
          <SearchIcon size={16} />
        </div>
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className='!glass-item peer ps-9 pe-9 app-region-none border-0  outline-none ring-0 focus-visible:ring-0'
          placeholder='¿Qué quieres escuchar?'
        />
        <button
          onClick={onClearSearch}
          className='text-muted/80 hover:text-muted focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          <X size={16} />
        </button>
      </div>
    </nav>
  )
}
