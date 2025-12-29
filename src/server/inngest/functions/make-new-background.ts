import { setNewBackground } from '@/db'
import { generateImage } from '@/server/ai/generate-image'
import { inngest } from '@/server/inngest/client'

export const makeNewBackground = inngest.createFunction(
  {
    id: 'makeNewBackground',
    throttle: {
      limit: 1,
      period: '5s',
      burst: 2,
    },
  },
  { event: 'rater/theme-updated' },
  async ({ event, step }) => {
    const { backgroundId, theme } = event.data

    const newBackground = await step.run('generate-image', async () => {
      const background = await generateImage(theme)
      await setNewBackground(+backgroundId, background)
      return background
    })

    return {
      backgroundId,
      newBackground,
    }
  },
)
