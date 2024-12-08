import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryCard } from "@/components/category-card"

const categories = [
  {
    title: "Trending Ads",
    count: 0,
    views: 0,
    color: "bg-pink-100 dark:bg-pink-900",
    href: "/explore?category=trending"
  },
  {
    title: "Tech Products",
    count: 0,
    views: 0,
    color: "bg-black text-white",
    href: "/explore?category=tech"
  },
  {
    title: "Fashion & Style",
    count: 0,
    views: 0,
    color: "bg-yellow-100 dark:bg-yellow-900",
    href: "/explore?category=fashion"
  },
  {
    title: "Food & Beverage",
    count: 0,
    views: 0,
    color: "bg-teal-100 dark:bg-teal-900",
    href: "/explore?category=food"
  },
  {
    title: "Entertainment",
    count: 0,
    views: 0,
    color: "bg-purple-100 dark:bg-purple-900",
    href: "/explore?category=entertainment"
  },
  {
    title: "Automotive",
    count: 0,
    views: 0,
    color: "bg-blue-100 dark:bg-blue-900",
    href: "/explore?category=automotive"
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Connect with the best ads
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover and share the most engaging video advertisements in one place
              </p>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Input
                      className="pl-9 rounded-full"
                      placeholder="Search for ads"
                      type="search"
                    />
                  </div>
                  <Button type="submit" className="rounded-full">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

