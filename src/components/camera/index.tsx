'use client'

import { Aperture, CloudUpload, Pause, Play } from 'lucide-react'
import { useCamera } from '@/hooks/use-camera'
import { cn } from '@/lib/utils'
import { onUploadImage } from '@/server/camera'
import { Button } from '../ui/button'
import { DeviceSelector } from './devices'

export const Camera = () => {
  const camera = useCamera({ onUpload: onUploadImage, width: 960 })

  return (
    <div className="size-125 flex flex-col gap-2">
      <div className="relative flex-1">
        <div className="border rounded overflow-hidden size-full aspect-square backdrop-blur-lg">
          <video
            ref={camera.videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            <track kind="captions" />
          </video>
        </div>

        {!camera.hasDevices && (
          <Button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={camera.enableCameras}
            disabled={camera.capturing || camera.uploading}
            variant={'outline'}
          >
            Enable cameras
          </Button>
        )}
      </div>

      {camera.error && <div className="text-sm text-red-600">{camera.error}</div>}

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

        <div className="flex gap-2">
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={camera.start}
            disabled={!camera.canStart}
          >
            <Play size={18} />
          </Button>

          <Button
            size={'icon'}
            variant={'outline'}
            onClick={camera.stop}
            disabled={!camera.canStop}
          >
            <Pause size={18} />
          </Button>

          <Button
            size={'icon'}
            variant={'outline'}
            onClick={camera.takePhoto}
            disabled={!camera.canTake}
          >
            {camera.uploading ? <CloudUpload size={18} /> : <Aperture size={18} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
