import { Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/site-logo.webp" alt="Logo" className="h-6 w-6" />
          <span className="font-semibold">Site name</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
            <a href="https://www.buymeacoffee.com/example" target="_blank" rel="noopener noreferrer">
              <Coffee className="mr-2 h-4 w-4" />
              Buy me a coffee
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

