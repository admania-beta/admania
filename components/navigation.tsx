import Link from "next/link"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          admania
        </Link>
        <div className="flex-1 max-w-sm mx-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search ads, creators, or tags"
              className="pl-9 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/explore">
            <Button variant="ghost">Explore</Button>
          </Link>
          <Link href="/upload">
            <Button variant="ghost">Upload</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

