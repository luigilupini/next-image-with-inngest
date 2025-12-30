'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export const useFilterAmount = () => {
  const searchParams = useSearchParams()

  return useMemo(() => {
    return Array.from(searchParams.keys()).length
  }, [searchParams])
}
