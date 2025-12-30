'use client'

import { SearchIcon } from 'lucide-react'
import { debounce, useQueryState } from 'nuqs'
import { Input } from '@/components/ui/input'
import { searchParams } from '@/lib/params'
import { cn } from '@/lib/utils'

export const SearchLaunch = ({ className }: { className?: string }) => {
  const [search, setSearch] = useQueryState(
    'search',
    searchParams.search.withOptions({
      limitUrlUpdates: debounce(1000),
    }),
  )

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
        onChange={(e) => setSearch(e.target.value)}
        defaultValue={search}
        className="peer pl-9 shadow-none placeholder:font-light focus-visible:border-primary/80 focus-visible:ring-1 focus-visible:ring-primary/80"
      />
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60 peer-focus:text-primary" />
    </div>
  )
}
