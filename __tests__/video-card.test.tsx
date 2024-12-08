import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { VideoCard } from '@/components/video-card'

const mockVideo = {
  id: '1',
  title: 'Test Video',
  description: 'This is a test video',
  category: 'Test',
  views: 1000,
  likes: 100,
  thumbnail: '/test-thumbnail.jpg',
}

describe('VideoCard', () => {
  it('renders video information correctly', () => {
    const mockOnClick = jest.fn()
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />)

    expect(screen.getByText('Test Video')).toBeInTheDocument()
    expect(screen.getByText('This is a test video')).toBeInTheDocument()
    expect(screen.getByText('1,000 views')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn()
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    const mockOnClick = jest.fn()
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />)

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})

