'use client'

import { Aperture, CloudUpload, Pause, Play, Repeat2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useCamera } from '@/hooks/use-camera'
import { cn, delay, flattenErrors } from '@/lib/utils'
import { uploadCameraImageAction } from '@/server/actions/camera'
import { Button } from '../ui/button'
import { DeviceSelector } from './devices'

export const Camera = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const camera = useCamera({ width: 960 })
  const router = useRouter()

  const { execute, isPending } = useAction(uploadCameraImageAction, {
    // onExecute: () => {
    //   console.log('Executing...')
    //   toast.info('Uploading image...')
    // },
    onSuccess: async ({ data }) => {
      console.log('Success: ', data)
      toast.success('Image uploaded successfully!')
      await delay(1000, () => router.push(`/review/${data.backgroundId}`))
    },
    onError: ({ error }) => {
      console.log('Error: ', flattenErrors(error.validationErrors)[0])
      toast.error(flattenErrors(error.validationErrors)[0])
    },
    // onSettled: () => {
    //   console.log('Done!')
    //   toast.info('Done uploading image...')
    // }
  })

  const submitWithImage = () => {
    const formEl = formRef.current
    if (!formEl || !camera.photoFile) return
    const formData = new FormData(formEl)
    formData.set('image', camera.photoFile)
    execute(formData)
  }

  return (
    <form
      ref={formRef}
      className="size-125 flex flex-col gap-2"
      action={submitWithImage}
    >
      <div className="relative flex-1">
        <div className="size-full aspect-square backdrop-blur-lg">
          <video
            ref={camera.videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover border rounded-md"
          >
            <track kind="captions" />
          </video>
          {camera.photoUrl && (
            <Image
              src={camera.photoUrl}
              width={960}
              height={960}
              alt="Captured"
              className="size-36 rounded-md object-cover absolute top-1 right-1 border animate-fill-both animate-fade-up"
              priority
            />
          )}
        </div>

        {!camera.hasDevices && (
          <Button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={camera.enableCameras}
            disabled={camera.capturing}
            variant="outline"
            type="button"
          >
            Enable cameras
          </Button>
        )}
      </div>

      <div
        className={cn(
          'flex flex-row gap-2 items-center w-full',
          !camera.hasDevices && 'opacity-50 pointer-events-none cursor-not-allowed',
        )}
      >
        <DeviceSelector
          value={camera.device}
          devices={camera.devices}
          onChange={camera.setDevice}
        />

        <input type="hidden" name="deviceId" value={camera.device} />

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={camera.start}
            disabled={!camera.canStart}
            type="button"
          >
            <Play size={18} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={camera.stop}
            disabled={!camera.canStop}
            type="button"
          >
            <Pause size={18} />
          </Button>

          {!camera.photoUrl && (
            <Button
              size="icon"
              variant="outline"
              onClick={camera.takePhoto}
              disabled={!camera.canTake}
              type="button"
              aria-label="Take photo"
            >
              <Aperture size={18} />
            </Button>
          )}

          {camera.photoUrl && (
            <Button
              size="icon"
              variant="outline"
              onClick={camera.clearPhoto}
              type="button"
              aria-label="Retake photo"
            >
              <Repeat2 size={18} />
            </Button>
          )}

          <Button
            size="icon"
            variant="outline"
            disabled={!camera.photoFile || isPending}
          >
            <CloudUpload size={18} />
          </Button>
        </div>
      </div>
    </form>
  )
}
