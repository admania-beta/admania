"use client"

import { useState, useEffect } from 'react'
import { Search, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoGrid } from "@/components/video-grid"
import { fetchVideos, Video } from "@/lib/api"

const categories = [
  "Trending", "Tech", "Fashion", "Food", "Entertainment", "Automotive", 
  "Beauty", "Sports", "Education", "Travel"
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)
      try {
        const newVideos = await fetchVideos(selectedCategory || 'all', sortBy, page)
        setVideos(prev => page === 1 ? newVideos : [...prev, ...newVideos])
      } catch (error) {
        console.error("Error loading videos:", error)
      } finally {
        setLoading(false)
      }
    }
    loadVideos()
  }, [selectedCategory, sortBy, page])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search ads, creators, or tags"
                  className="pl-9 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="rounded-full px-4 py-2 bg-background border border-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="trending">Trending</option>
              </select>
            </div>
            
            <div className="flex overflow-x-auto space-x-2 pb-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {loading && videos.length === 0 ? (
            <div className="flex justify-center mt-8">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : videos.length > 0 ? (
            <>
              <VideoGrid videos={videos} />
              {!loading && (
                <div className="flex justify-center mt-8">
                  <Button onClick={handleLoadMore}>Load More</Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Link href="/upload">
                <Button>Upload Video</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

