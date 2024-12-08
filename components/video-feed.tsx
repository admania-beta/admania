"use client"
import { useState, useEffect } from 'react'
import { VideoGrid } from "@/components/video-grid"
import { fetchVideos, Video } from "@/lib/api"
import { Button } from "@/components/ui/button"

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)
      try {
        const newVideos = await fetchVideos('all', 'recent', page)
        setVideos(prev => [...prev, ...newVideos])
      } catch (error) {
        console.error("Error loading videos:", error)
      } finally {
        setLoading(false)
      }
    }
    loadVideos()
  }, [page])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div>
      <VideoGrid videos={videos} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && videos.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  )
}

