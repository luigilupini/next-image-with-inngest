import Link from 'next/link'
import BackgroundMonitor from '@/components/background-monitor'
import { Button } from '@/components/ui/button'
import { getBackground } from '@/db'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Camera({ params }: { params: { backgroundId: string } }) {
  const { backgroundId } = await params

  const id = Number(backgroundId)
  if (!Number.isInteger(id)) {
    return <div>Invalid background id</div>
  }

  const background = await getBackground(id)

  if (!background) return <div>Background not found</div>

  return (
    <main>
      <div className="mb-5">
        <Button asChild>
          <Link href="/">Try Another Background {backgroundId}</Link>
        </Button>
      </div>

      <BackgroundMonitor backgroundId={backgroundId} background={background} />
    </main>
  )
}
