import Image from 'next/image'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { Video } from "@/lib/api"

interface VideoCardProps {
  video: Video
  onClick: () => void
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="group relative bg-card rounded-xl overflow-hidden transition-all hover:scale-105 cursor-pointer focus-within:ring-2 focus-within:ring-primary"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${video.title}`}
    >
      <div className="aspect-video relative">
        <Image
          src={video.thumbnail || '/placeholder-image.jpg'}
          alt={video.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{video.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {video.description || 'No description available'}
        </p>
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" aria-hidden="true" />
              <span aria-label={`${video.likes ?? 'No'} likes`}>
                {video.likes != null ? video.likes.toLocaleString() : '-'}
              </span>
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" />
              <span aria-label={`${video.comments ?? 'No'} comments`}>
                {video.comments != null ? video.comments.toLocaleString() : '-'}
              </span>
            </span>
            <span className="flex items-center">
              <Share2 className="w-4 h-4 mr-1" aria-hidden="true" />
              <span aria-label={`${video.shares ?? 'No'} shares`}>
                {video.shares != null ? video.shares.toLocaleString() : '-'}
              </span>
            </span>
          </div>
          <span aria-label={`${video.views ?? 'No'} views`}>
            {video.views != null ? `${video.views.toLocaleString()} views` : 'No views'}
          </span>
        </div>
      </div>
    </div>
  )
}

