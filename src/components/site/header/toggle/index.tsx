'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useIsMounted } from 'usehooks-ts'
import { Button } from '@/components/ui/button'

const audioFiles = ['/sounds/switch-on.mp3', '/sounds/switch-off.mp3']

export const ThemeToggle = () => {
  const mounted = useIsMounted()
  const { theme, setTheme } = useTheme()
  const [audioIndex, setAudioIndex] = useState(0)

  const handleClick = (theme: string) => {
    setTheme(theme)
    const audio = new Audio(audioFiles[audioIndex])
    audio.play()
    setAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length)
  }
  const Icon = theme === 'light' ? Sun : Moon
  if (!mounted) return <Button variant="outline" size="icon" disabled />
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleClick(theme === 'light' ? 'dark' : 'light')}
    >
      <Icon
        className="animate-spin animate-normal animate-fill-both animate-once animate-ease-out"
        size={16}
      />
    </Button>
  )
}
