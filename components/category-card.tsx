import Link from "next/link"
import { ArrowUpRight } from 'lucide-react'

interface CategoryCardProps {
  title: string
  count: number
  views: number
  color: string
  href: string
}

export function CategoryCard({
  title,
  count,
  views,
  color,
  href
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className={`relative p-6 rounded-3xl transition-transform hover:scale-105 ${color}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm font-medium">{views.toLocaleString()} Views</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm">
            ({count} Ads)
          </p>
        </div>
        <ArrowUpRight className="absolute bottom-6 right-6 h-6 w-6" />
      </div>
    </Link>
  )
}

