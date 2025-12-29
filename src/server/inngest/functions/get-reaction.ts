import { setTheme } from '@/db'
import { addReview } from '@/server/ai/review'
import { getTheme } from '@/server/ai/theme'
import { inngest } from '@/server/inngest/client'

export const getReaction = inngest.createFunction(
  { id: 'getReaction' },
  { event: 'rater/image-uploaded' },
  async ({ event, step }) => {
    const { url, backgroundId } = event.data

    const reviewPromise = step.run('add-review', async () => {
      return await addReview(backgroundId, url)
    })

    const themePromise = step.run('get-theme', async () => {
      const theme = await getTheme(url)
      await setTheme(+backgroundId, theme)

      await inngest.send({
        name: 'rater/theme-updated',
        data: {
          backgroundId,
          theme,
        },
      })

      return theme
    })

    const [review, theme] = await Promise.all([reviewPromise, themePromise])

    return {
      backgroundId,
      review,
      theme,
    }
  },
)
