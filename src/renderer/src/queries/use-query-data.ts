import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getConfig = async () => {
  const data = await window.api.getConfigData()
  if (!data) throw new Error('An ocurred error on fetching data!')
  return data
}

export const configQueryOpts = queryOptions({
  queryKey: ['config'],
  queryFn: getConfig,
})

export const useConfig = () => useSuspenseQuery(configQueryOpts)
