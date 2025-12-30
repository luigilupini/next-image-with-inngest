import type { SearchParams } from 'nuqs/server'
import { Camera } from '@/components/camera'
import { loadSearchParams, serializeSearchParams } from '@/lib/params'

type Props = { searchParams: Promise<SearchParams> }

export default async function HomePage({ searchParams }: Props) {
  const params = await loadSearchParams(searchParams)
  const serializedParams = serializeSearchParams(params)
  console.log('loadSearchParams: ', params)
  console.log('serializeSearchParams: ', serializedParams)
  return (
    <main className="flex items-center justify-center size-full">
      <Camera />
    </main>
  )
}
