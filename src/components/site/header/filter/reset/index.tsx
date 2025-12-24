'use client'

import { FilterX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFilterAmount } from '@/hooks/use-filter-amount'
import { useQueryParams } from '@/hooks/use-query-params'

const SEARCH_PARAM_KEYS = ['year', 'hasImages', 'status', 'search', 'bookmarks']

export const ResetFilter = () => {
  const query = useQueryParams()
  const amount = useFilterAmount()
  const handleClearAll = () => query.remove(SEARCH_PARAM_KEYS)
  return (
    <Button
      variant="default"
      onClick={handleClearAll}
      disabled={amount === 0}
      className="gap-2"
    >
      Reset <FilterX size={16} />
    </Button>
  )
}
