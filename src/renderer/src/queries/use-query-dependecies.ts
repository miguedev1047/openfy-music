import { queryOptions, useQuery } from '@tanstack/react-query'

export const getDependencies = async () => {
  const data = await window.api.checkBinaries()
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data
}

export const dependeciesQueryOpts = queryOptions({
  queryKey: ['dependencies'],
  queryFn: getDependencies,
  refetchInterval: 5000
})

export const useDependencies = () => useQuery(dependeciesQueryOpts)
