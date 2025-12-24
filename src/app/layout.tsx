import './globals.css'

import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { Background } from '@/components/utils/skins'
import { ProviderTree } from '@/context/provider-tree'
import { fonts } from '@/lib/fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fonts.rubik.variable} ${fonts.jetbrains.variable} font-sans antialiased`}
    >
      <body className="antialiased h-screen w-screen flex flex-col">
        <ProviderTree>
          <Header />
          <section className="container-wrapper flex-1 overflow-hidden px-4 py-2">
            {children}
          </section>
          <Background />
          <Footer />
        </ProviderTree>
      </body>
    </html>
  )
}
