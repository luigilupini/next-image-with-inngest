'use client'

import { useRef, useState } from 'react'

type UseCameraOptions = {
  onUpload: (formData: FormData) => Promise<void>
  width?: number
}

export function useCamera({ onUpload, width = 960 }: UseCameraOptions) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const captureRef = useRef<ImageCapture | null>(null)

  const [device, setDevice] = useState('')
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const [capturing, setCapturing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stop = () => {
    streamRef.current?.getTracks().map((track) => track.stop())
    streamRef.current = null
    captureRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setCapturing(false)
    setUploading(false)
  }

  const enableCameras = async () => {
    setError(null)
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      const all = await navigator.mediaDevices.enumerateDevices()
      const cams = all.filter((d) => d.kind === 'videoinput')
      setDevices(cams)
      setDevice((prev) => prev || cams[0]?.deviceId || '')
    } catch (error) {
      console.error(error)
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
    } catch (error) {
      console.error(error)
      setError('Failed to start camera.')
    }
  }

  const takePhoto = async () => {
    const video = videoRef.current
    const cap = captureRef.current
    if (!video || !cap) return

    setError(null)
    setUploading(true)

    try {
      video.pause()
      const blob = await cap.takePhoto()
      const formData = new FormData()
      formData.append('image', blob, 'image.jpg')
      await onUpload(formData)
      await video.play().catch(() => {})
    } catch (error) {
      console.error(error)
      setError('Failed to take/upload photo.')
    } finally {
      setUploading(false)
    }
  }

  const hasDevices = devices.length > 0
  const canStart = !!device && !capturing && !uploading
  const canStop = capturing || uploading
  const canTake = capturing && !uploading

  return {
    // refs
    videoRef,

    // state
    devices,
    device,
    capturing,
    uploading,
    error,

    // setters
    setDevice,

    // actions
    enableCameras,
    start,
    stop,
    takePhoto,

    // derived
    hasDevices,
    canStart,
    canStop,
    canTake,
  }
}
