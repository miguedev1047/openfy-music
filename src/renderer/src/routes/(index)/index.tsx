import { ErrorComponentProps, createFileRoute } from '@tanstack/react-router'
import { songsQueryOptions } from '@renderer/queries/use-query-songs'
import { Suspense } from 'react'
import { SongList } from '@renderer/routes/(index)/-components/song-list'
import { Loader } from 'lucide-react'
import { SongPreview } from '@renderer/components/song-preview'

export const Route = createFileRoute('/(index)/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(songsQueryOptions)
  },
  errorComponent: ({ reset }: ErrorComponentProps) => {
    return (
      <div className='p-4 m-4 text-red-800 bg-red-100 border-l-4 border-red-500 dark:bg-red-900 dark:text-red-200 dark:border-red-700'>
        <h4 className='font-bold'>¡Oh, no! Algo salió mal.</h4>
        <p className='mt-1'>
          Hubo un problema al cargar tus canciones. Por favor, inténtalo de
          nuevo.
        </p>
        <button
          onClick={reset}
          className='mt-4 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
        >
          Reintentar
        </button>
      </div>
    )
  },
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className='flex flex-1 items-center gap-2 overflow-y-auto [view-transition-name:main-content]'>
      <SongPreview />

      <Suspense fallback={<Loader />}>
        <SongList />
      </Suspense>
    </div>
  )
}
