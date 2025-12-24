'use client'

import { AmountBadge } from '@/components/site/header/amount'
import { useFilterAmount } from '@/hooks/use-filter-amount'

export const FilterTitle = () => {
  const amount = useFilterAmount()
  return (
    <div className="center relative size-5 overflow-hidden rounded-md">
      <AmountBadge className="right-0 top-0 size-full rounded-none text-xs" amount={amount} />
    </div>
  )
}
