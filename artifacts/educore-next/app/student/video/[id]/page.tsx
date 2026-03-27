import type { Metadata } from 'next'
import VideoClient from './VideoClient'

export const metadata: Metadata = {
  title: 'Video Lecture — EduCore ERP',
  robots: { index: false, follow: false },
}

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <VideoClient videoId={id} />
}
