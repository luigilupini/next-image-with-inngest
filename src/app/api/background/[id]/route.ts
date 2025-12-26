import { NextResponse } from 'next/server'

import { getBackground } from '@/db'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const intId = Number(id)
  if (!Number.isInteger(intId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const background = await getBackground(intId)

  if (!background) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(background)
}
