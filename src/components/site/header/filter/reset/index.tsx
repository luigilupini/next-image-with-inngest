'use client'

import { FilterX } from 'lucide-react'
import { useQueryStates } from 'nuqs'

import { Button } from '@/components/ui/button'
import { useFilterAmount } from '@/hooks/use-filter-amount'
import { searchParams } from '@/lib/params'

export const ResetFilter = () => {
  const [, setFilters] = useQueryStates(searchParams)
  const amount = useFilterAmount()
  return (
    <Button
      variant="default"
      onClick={() => setFilters(null)}
      disabled={amount === 0}
      className="gap-2"
    >
      Reset <FilterX size={16} />
    </Button>
  )
}
