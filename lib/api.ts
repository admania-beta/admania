export interface Video {
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

export async function fetchVideos(category: string, sortBy: string, page: number): Promise<Video[]> {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Array.from({ length: 20 }, (_, i) => ({
    id: `video-${page}-${i}`,
    title: `Amazing Ad ${page}-${i + 1}`,
    description: "Experience innovation like never before",
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 500),
    thumbnail: `/placeholder.svg?height=400&width=600`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    creator: {
      username: `user_${i}`,
      avatarUrl: `/placeholder.svg?height=100&width=100`
    }
  }))
}

export async function updateVideoInteraction(videoId: string, interactionType: string): Promise<void> {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log(`Updated ${interactionType} for video ${videoId}`)
}

export async function uploadVideo(formData: FormData): Promise<{ success: boolean, message: string }> {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 3000))
  console.log('Uploading video:', formData)
  return { success: true, message: 'Video uploaded successfully' }
}

