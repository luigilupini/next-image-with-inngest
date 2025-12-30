import { setNewBackground, setTheme } from '@/db'
import { createReviewStream } from '@/server/actions/ai/create-review-stream'
import { createTheme } from '@/server/actions/ai/create-theme'
import { generateImage } from '@/server/actions/ai/generate-image'
import { inngestClient } from '@/server/inngest'

export const uploadCameraImageInngest = inngestClient.createFunction(
  { id: 'uploadCameraImageInngest' },
  { event: 'upload-camera-image-event' },
  async ({ event, step }) => {
    const { url, backgroundId } = event.data

    const reviewPromise = step.run('create-review-stream', async () => {
      return await createReviewStream(backgroundId, url)
    })

    const themePromise = step.run('create-theme', async () => {
      const theme = await createTheme(url)
      await setTheme(+backgroundId, theme)

      await inngestClient.send({
        name: 'new-background-image-event',
        data: { backgroundId, theme },
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

export const newBackgroundImageInngest = inngestClient.createFunction(
  { id: 'newBackgroundImageInngest', throttle: { limit: 1, period: '5s', burst: 2 } },
  { event: 'new-background-image-event' },
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
