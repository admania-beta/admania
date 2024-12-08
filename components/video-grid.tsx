"use client"

import { VideoCard } from "@/components/video-card"
import { VideoViewer } from "@/components/video-viewer"
import { Video } from "@/lib/api"
import { useState } from 'react'

interface VideoGridProps {
  videos: Video[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const getNextVideo = (currentId: string): Video => {
    const currentIndex = videos.findIndex(v => v.id === currentId)
    return videos[(currentIndex + 1) % videos.length]
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
        ))}
      </div>
      {selectedVideo && (
        <VideoViewer
          initialVideo={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          getNextVideo={getNextVideo}
        />
      )}
    </>
  )
}

