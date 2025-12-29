import { useMemo } from 'react'

import { useQueryParams } from './use-query-params'

export const useFilterAmount = () => {
  const query = useQueryParams()

  const filterCounter = useMemo(() => {
    const params = query.getAll()
    const filterKeys = ['year', 'hasImages', 'status', 'search']

    const amountActive = Object.entries(params).filter(
      ([key, value]) => filterKeys.includes(key) && value !== '' && value !== 'false',
    ).length

    return amountActive
  }, [query])

  return filterCounter
}
