import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center text-2xl font-bold">
              admania
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/explore" className="text-sm font-medium text-foreground hover:text-foreground/80">
              Explore
            </Link>
            <Link href="/upload" className="text-sm font-medium text-foreground hover:text-foreground/80">
              Upload
            </Link>
            <Link href="/profile" className="text-sm font-medium text-foreground hover:text-foreground/80">
              Profile
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

