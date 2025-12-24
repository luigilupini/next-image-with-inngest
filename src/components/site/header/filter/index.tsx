import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MediaFilter } from './media'
import { ResetFilter } from './reset'
import { StatusFilter } from './status'
import { FilterTitle } from './title'
import { FilterTrigger } from './trigger'

export const FilterSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <FilterTrigger />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="px-4 pt-6">
          <div className="flex flex-col items-start justify-center gap-1">
            <SheetTitle className="flex items-center gap-2">
              Settings
              <FilterTitle />
            </SheetTitle>
            <SheetDescription className="opacity-90">
              You can filter your search results here
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col py-2">
          <div className="flex-1 overflow-y-auto">
            <MediaFilter />
            <StatusFilter />
          </div>
        </div>

        <SheetFooter className="flex gap-2 px-4 pb-6">
          <ResetFilter />
          <SheetClose asChild>
            <Button variant="outline" className="gap-2">
              Close
              <X size={18} />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
