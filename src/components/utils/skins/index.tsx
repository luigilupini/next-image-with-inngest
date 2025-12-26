import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  shape?: 'grid' | 'dot'
  mask?: boolean
}

export function Background({ className, shape = 'dot', mask = true }: Props) {
  return (
    <React.Fragment data-testid="background">
      {shape === 'dot' && <DotBackground className={className} />}
      {shape === 'grid' && <GridBackground className={className} />}
      {mask && <GradientMask />}
    </React.Fragment>
  )
}

const GradientMask = () => (
  <div className="pointer-events-none absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))] -z-10" />
)

const DotBackground = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute inset-0 -z-20',
      '[background-size:20px_20px]',
      '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
      'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
      className,
    )}
  />
)

const GridBackground = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute inset-0 -z-20',
      '[background-size:20px_20px]',
      '[background-image:linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)]',
      'dark:[background-image:linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)]',
      className,
    )}
  />
)
