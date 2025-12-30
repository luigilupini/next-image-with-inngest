'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryProvider } from './leaf/query'
import { ThemeProvider } from './leaf/theme'

export function ProviderTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ReactQueryProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
