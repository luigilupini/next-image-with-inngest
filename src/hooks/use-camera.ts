'use client'

import { useRef, useState } from 'react'

type UseCameraOptions = {
  width?: number
}

export function useCamera({ width = 960 }: UseCameraOptions) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const captureRef = useRef<ImageCapture | null>(null)

  const [device, setDevice] = useState('')
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const [capturing, setCapturing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  const stop = () => {
    streamRef.current?.getTracks().map((track) => track.stop())
    streamRef.current = null
    captureRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCapturing(false)
  }

  const enableCameras = async () => {
    setError(null)
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      const all = await navigator.mediaDevices.enumerateDevices()
      const cams = all.filter((d) => d.kind === 'videoinput')
      setDevices(cams)
      setDevice((prev) => prev || cams[0]?.deviceId || '')
    } catch (e) {
      console.error(e)
      setError('Could not access cameras. Check browser permissions.')
    }
  }

  const start = async () => {
    if (!videoRef.current || !device) return
    setError(null)

    try {
      stop()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: device, width },
      })
      streamRef.current = stream
      captureRef.current = new ImageCapture(stream.getVideoTracks()[0])
      videoRef.current.srcObject = stream
      setCapturing(true)
    } catch (e) {
      console.error(e)
      setError('Failed to start camera.')
    }
  }

  const clearPhoto = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(null)
    setPhotoFile(null)
  }

  const takePhoto = async () => {
    const cap = captureRef.current
    if (!cap) return

    setError(null)

    try {
      const blob = await cap.takePhoto()
      const file = new File([blob], 'image.jpg', { type: blob.type || 'image/jpeg' })

      clearPhoto()
      setPhotoFile(file)
      setPhotoUrl(URL.createObjectURL(file))
    } catch (e) {
      console.error(e)
      setError('Failed to take photo.')
    }
  }

  const hasDevices = devices.length > 0
  const canStart = !!device && !capturing
  const canStop = capturing
  const canTake = capturing

  return {
    videoRef,

    devices,
    device,
    capturing,
    error,

    photoFile,
    photoUrl,

    setDevice,

    enableCameras,
    start,
    stop,
    takePhoto,
    clearPhoto,

    hasDevices,
    canStart,
    canStop,
    canTake,
  }
}
