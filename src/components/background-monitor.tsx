'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

import { Skeleton } from '@/components/ui/skeleton'

import type { Background } from '@/db'

export default function BackgroundMonitor({
  backgroundId,
  background,
}: {
  backgroundId: string
  background: Background
}) {
  const [enabled, setEnabled] = useState(true)
  const { data } = useQuery<Background>({
    queryKey: ['background', backgroundId],
    queryFn: async () => {
      const response = await fetch(`/api/background/${backgroundId}`)
      return response.json()
    },
    initialData: background,
    refetchInterval: 200, // Poll every 200ms
    enabled,
  })

  useEffect(() => {
    setEnabled(!data?.review_completed || !data?.theme || !data?.new_background)
  }, [data?.review_completed, data?.theme, data?.new_background])

  return (
    <div className="flex gap-4 p-4 max-w-7xl w-full">
      <div className="flex-1">
        <h2 className="font-medium">Current Review</h2>
        <div className="relative aspect-video overflow-hidden rounded">
          <Image
            src={data?.image}
            alt="background-to-review"
            width={1920}
            height={1080}
            className="object-contain"
            priority
          />
        </div>
        <Markdown className="mt-4 text-xs leading-5">{data?.review}</Markdown>
      </div>
      <div className="flex-1">
        <h2 className="font-medium">New AI Theme</h2>
        <div className="relative aspect-video overflow-hidden rounded">
          {data?.new_background ? (
            <Image
              src={data?.new_background}
              alt="ai-background-theme-generated"
              width={1920}
              height={1080}
              className="object-contain"
              priority
            />
          ) : (
            <Skeleton className="w-full aspect-video rounded" />
          )}
        </div>
        <Markdown className="mt-4 text-xs leading-5">{data?.theme}</Markdown>
      </div>
    </div>
  )
}
