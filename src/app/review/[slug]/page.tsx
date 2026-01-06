import BackgroundMonitor from '@/components/background-monitor'
import { Badge } from '@/components/ui/badge'
import { getBackground } from '@/db'
import type { AsyncPageProps } from '@/types/general.types'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function ReviewPage(props: AsyncPageProps) {
  const { slug } = await props.params

  const background = await getBackground(+slug)

  if (!background)
    return (
      <div className="center size-full">
        <Badge>Background not found</Badge>
      </div>
    )

  return (
    <main className="flex items-center justify-center">
      <BackgroundMonitor backgroundId={slug} background={background} />
    </main>
  )
}
