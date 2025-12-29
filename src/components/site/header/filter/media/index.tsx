'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useQueryParams } from '@/hooks/use-query-params'

export const MediaFilter = () => {
  const query = useQueryParams()
  const hasImages = query.get('hasImages') === 'true'

  const handleImagesChange = (checked: boolean) => {
    if (checked) query.set({ hasImages: 'true' })
    else query.remove('hasImages')
  }

  return (
    <Card className="border-grid rounded-none border-x-0 border-y bg-transparent shadow-none">
      <CardHeader className="px-4 pb-1 pt-2">
        <CardTitle className="text-xs opacity-90">Media</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0">
        <div className="flex items-center space-x-2">
          <Switch
            id="has-images"
            checked={hasImages}
            onCheckedChange={handleImagesChange}
          />
          <Label htmlFor="has-images" className="text-xs font-normal">
            Show only launches with images
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
