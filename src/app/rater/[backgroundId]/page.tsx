import Link from 'next/link'
import BackgroundMonitor from '@/components/background-monitor'
import { Button } from '@/components/ui/button'
import { getBackground } from '@/db'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Camera({
  params: { backgroundId },
}: {
  params: { backgroundId: string }
}) {
  const background = await getBackground(+backgroundId)

  if (!background) {
    return <div>Background not found</div>
  }

  return (
    <main>
      <div className="mb-5">
        <Button>
          <Link href="/">Try Another Background</Link>
        </Button>
      </div>
      <BackgroundMonitor backgroundId={backgroundId} background={background} />
    </main>
  )
}
