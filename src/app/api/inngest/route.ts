import { serve } from 'inngest/next'

import { inngest } from '@/server/inngest/client'
import { getReaction } from '@/server/inngest/functions/get-reaction'
import { makeNewBackground } from '@/server/inngest/functions/make-new-background'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [getReaction, makeNewBackground],
})
