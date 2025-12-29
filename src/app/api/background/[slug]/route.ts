import { NextResponse } from 'next/server'

import { getBackground } from '@/db'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

type Props = { params: Promise<{ slug: string }> }

export async function GET(_req: Request, props: Props) {
  const { slug } = await props.params

  const background = await getBackground(+slug)

  if (!background) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(background)
}
