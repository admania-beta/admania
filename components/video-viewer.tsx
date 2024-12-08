"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Video {
  id: string
  title: string
  description: string
  views: number
  likes: number
  comments: number
  shares: number
  thumbnail: string
  videoUrl: string
  creator: {
    username: string
    avatarUrl: string
  }
}

interface VideoViewerProps {
  initialVideo: Video
  onClose: () => void
  getNextVideo: (currentId: string) => Video
}

export function VideoViewer({ initialVideo, onClose, getNextVideo }: VideoViewerProps) {
  const [currentVideo, setCurrentVideo] = useState(initialVideo)
  const [videos, setVideos] = useState([initialVideo])
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && !loading) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        if (scrollHeight - scrollTop <= clientHeight + 100) {
          setLoading(true)
          const nextVideo = getNextVideo(videos[videos.length - 1].id)
          setVideos(prev => [...prev, nextVideo])
          setLoading(false)
        }
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef.current?.removeEventListener('scroll', handleScroll)
  }, [videos, getNextVideo, loading])

  const handleInteraction = (type: 'view' | 'like' | 'comment' | 'share' | 'bookmark') => {
    console.log(`${type} interaction for video ${currentVideo.id}`)
    setVideos(prev => prev.map(video => 
      video.id === currentVideo.id 
        ? { ...video, [type === 'view' ? 'views' : `${type}s`]: video[type === 'view' ? 'views' : `${type}s`] + 1 }
        : video
    ))
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-hidden" aria-describedby="video-viewer-description">
        <DialogHeader>
          <DialogTitle className="sr-only">Video Viewer</DialogTitle>
          <DialogDescription id="video-viewer-description" className="sr-only">
            Detailed view of the selected video with interactions
          </DialogDescription>
        </DialogHeader>
        <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory">
          {videos.map((video) => (
            <div key={video.id} className="snap-start h-full flex items-center justify-center">
              <div className="max-w-3xl w-full p-4">
                <video
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  controls
                  className="w-full rounded-lg shadow-lg"
                  onPlay={() => handleInteraction('view')}
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={video.creator.avatarUrl} alt={video.creator.username} />
                      <AvatarFallback>{video.creator.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">{video.title}</h2>
                      <p className="text-sm text-muted-foreground">{video.creator.username}</p>
                    </div>
                  </div>
                  <Button variant="outline">Follow</Button>
                </div>
                <p className="text-muted-foreground mt-2">{video.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => handleInteraction('like')}>
                      <Heart className="mr-2 h-4 w-4" />
                      {video.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleInteraction('comment')}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {video.comments}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleInteraction('share')}>
                      <Share2 className="mr-2 h-4 w-4" />
                      {video.shares}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleInteraction('bookmark')}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bookmark
                  </Button>
                </div>
                <div className="mt-4">
                  <Input placeholder="Add a comment..." />
                </div>
              </div>
            </div>
          ))}
          {loading && <div className="text-center py-4">Loading...</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

