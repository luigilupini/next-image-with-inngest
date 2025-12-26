import { siteConfig } from '@/lib/site'

export const Footer = () => {
  return (
    <footer className="border-grid z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:py-0">
      <div className="container-wrapper">
        <div className="container mx-auto flex flex-col items-center justify-between py-2 md:flex-row">
          <div className="text-balance text-center text-xs font-light leading-loose opacity-70 md:text-left">
            Built by <Url href={siteConfig.links.www}>luigi lupini</Url>.
          </div>
        </div>
      </div>
    </footer>
  )
}

type UrlProps = {
  children: React.ReactNode
  href: string
}

const Url = ({ children, href }: UrlProps) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-medium">
      {children}
    </a>
  )
}
