'use client'

import { Filter } from 'lucide-react'
import React from 'react'

import { AmountBadge } from '@/components/site/header/amount'
import { useFilterAmount } from '@/hooks/use-filter-amount'

export const FilterTrigger = () => {
  const amount = useFilterAmount()
  return (
    <React.Fragment>
      <Filter size={16} />
      <AmountBadge amount={amount} />
    </React.Fragment>
  )
}
