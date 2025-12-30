import { serve } from 'inngest/next'

import { inngestClient } from '@/server/inngest'

import {
  newBackgroundImageInngest,
  uploadCameraImageInngest,
} from '@/server/inngest/functions'

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [uploadCameraImageInngest, newBackgroundImageInngest],
})
