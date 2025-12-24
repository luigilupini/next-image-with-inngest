'use client'

import type { PropsWithChildren } from 'react'

import ThemeProvider from '@/context/leaf/theme'
import { ReactQueryProvider } from './leaf/query'

export function ProviderTree({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}
