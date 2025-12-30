import { setNewBackground, setTheme } from '@/db'
import { createReviewStream } from '@/server/actions/ai/create-review-stream'
import { createTheme } from '@/server/actions/ai/create-theme'
import { generateImage } from '@/server/actions/ai/generate-image'
import { inngestClient } from '@/server/inngest'
import { Events, Functions, Steps } from './constants'

export const uploadCameraImageInngest = inngestClient.createFunction(
  { id: Functions.UploadCameraImage },
  { event: Events.UploadCameraImage },
  async ({ event, step }) => {
    const { url, backgroundId } = event.data

    const reviewPromise = step.run(Steps.CreateReviewStream, async () => {
      return await createReviewStream(backgroundId, url)
    })

    const themePromise = step.run(Steps.CreateTheme, async () => {
      const theme = await createTheme(url)
      await setTheme(+backgroundId, theme)

      await inngestClient.send({
        name: Events.NewBackgroundRequested,
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
  { id: Functions.NewBackgroundImage, throttle: { limit: 1, period: '5s', burst: 2 } },
  { event: Events.NewBackgroundRequested },
  async ({ event, step }) => {
    const { backgroundId, theme } = event.data

    const newBackground = await step.run(Steps.GenerateImage, async () => {
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
