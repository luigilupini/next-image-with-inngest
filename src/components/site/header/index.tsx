import Link from 'next/link'
import { FilterSheet } from './filter'
import { ThemePalette } from './palette'
import { SearchLaunch } from './search'
import { ThemeToggle } from './toggle'

export const Header = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container-wrapper between h-12 px-6">
        <div className="flex items-center">
          <Link href="/" className="center text-lg font-bold">
            Workspace AI
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <SearchLaunch />
          <div className="center gap-2">
            <FilterSheet />
            <ThemeToggle />
            <ThemePalette />
          </div>
        </div>
      </div>
    </header>
  )
}
