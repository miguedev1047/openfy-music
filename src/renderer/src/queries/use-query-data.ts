import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getConfigData = async () => {
  const data = await window.api.getConfigData()
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data
}

export const dataConfigOpts = queryOptions({
  queryKey: ['config'],
  queryFn: getConfigData,
  refetchInterval: 5000
})

export const useDataConfig = () => useSuspenseQuery(dataConfigOpts)
