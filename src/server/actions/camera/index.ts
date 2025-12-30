'use server'

import { put } from '@vercel/blob'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { addBackground } from '@/db'
import { inngestClient } from '@/server/inngest'
import { Events } from '@/server/inngest/constants'
import { actionClient } from '@/server/safe-action'

const uploadSchema = zfd.formData({
  deviceId: zfd.text(z.string({ error: 'Device ID is required' }).min(1)),
  image: zfd.file(z.instanceof(File, { error: 'Image file is required' })),
})

export const uploadCameraImageAction = actionClient
  .inputSchema(uploadSchema)
  .action(async ({ parsedInput }) => {
    const buffer = await parsedInput.image.arrayBuffer()
    const data = Buffer.from(buffer)

    const randomFileName = Math.random().toString(36).substring(2)

    const { url } = await put(`images/${randomFileName}.jpg`, data, {
      access: 'public',
    })

    const backgroundId = await addBackground(url)

    await inngestClient.send({
      name: Events.UploadCameraImage,
      data: { backgroundId, url },
    })

    return { backgroundId }
  })
