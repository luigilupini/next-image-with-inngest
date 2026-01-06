import type { SearchParams } from 'nuqs/server'
import { Camera } from '@/components/camera'
import { loadSearchParams, serializeSearchParams } from '@/lib/params'
import { edenApi } from '@/server/api'

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function HomePage(props: Props) {
  const params = await loadSearchParams(props.searchParams)
  const serializedParams = serializeSearchParams(params)
  console.log('loadSearchParams: ', params)
  console.log('serializeSearchParams: ', serializedParams)

  const response = await edenApi.user.post({ id: '1942', name: 'John Doe' })
  console.log('API Result: ', response.data)
  return (
    <main className="flex items-center justify-center size-full">
      <Camera />
    </main>
  )
}
