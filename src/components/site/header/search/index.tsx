'use client'

import { SearchIcon } from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'

import { Input } from '@/components/ui/input'
import { useQueryParams } from '@/hooks/use-query-params'
import { cn } from '@/lib/utils'

export const SearchLaunch = ({ className }: { className?: string }) => {
  const query = useQueryParams()
  const handleChange = useDebounceCallback((value: string) => {
    query.set({ search: value })
  }, 400)
  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center gap-2 sm:w-60',
        className,
      )}
    >
      <Input
        type="search"
        placeholder="Search launches"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={query.get('search') || ''}
        className="peer pl-9 shadow-none placeholder:font-light focus-visible:border-primary/80 focus-visible:ring-1 focus-visible:ring-primary/80"
      />
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60 peer-focus:text-primary" />
    </div>
  )
}
