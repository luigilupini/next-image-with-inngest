'use client'

import { Brush, Github, Triangle, Zap } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const themes = ['github', 'supabase', 'vercel']

export const ThemePalette = () => {
  const [currentTheme, setCurrentTheme] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  }, [currentTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon'}>
          {currentTheme ? <ThemeIcon theme={currentTheme} /> : <Brush size={16} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme}
              onClick={() => setCurrentTheme(theme)}
              className="cursor-pointer text-xs"
            >
              <div className="center size-4">
                <ThemeIcon theme={theme} />
              </div>
              <span className="capitalize">{theme.split('_').join(' ')}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeIcon({ theme }: { theme: string }) {
  switch (theme) {
    case 'github':
      return <Github size={16} />
    case 'supabase':
      return <Zap size={16} />
    case 'vercel':
      return <Triangle size={16} />
    default:
      return null
  }
}
