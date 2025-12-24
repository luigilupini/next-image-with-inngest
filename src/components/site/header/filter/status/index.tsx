'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQueryParams } from '@/hooks/use-query-params'

type LaunchStatus = 'success' | 'failure' | 'upcoming'

const statusOptions: { value: LaunchStatus; label: string; color: string }[] = [
  { value: 'success', label: 'Success', color: 'bg-success' },
  { value: 'failure', label: 'Failure', color: 'bg-destructive' },
  { value: 'upcoming', label: 'Upcoming', color: 'bg-warning' },
]

export const StatusFilter = () => {
  const query = useQueryParams()
  const currentStatus = query.get('status')

  const handleStatusChange = (value: string) => {
    if (value === 'all') query.remove('status')
    else query.set({ status: value })
  }

  return (
    <Card className="border-grid rounded-none border-x-0 border-b border-t-0 bg-transparent shadow-none">
      <CardHeader className="px-4 pb-1 pt-2">
        <CardTitle className="text-xs opacity-90">Status</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        <Select value={currentStatus || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">No status filter selected</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${option.color}`} />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
