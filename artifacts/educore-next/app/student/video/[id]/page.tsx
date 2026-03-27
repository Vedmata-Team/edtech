import type { Metadata } from 'next'
import VideoClient from './VideoClient'

export const metadata: Metadata = {
  title: 'Video Lecture — EduCore ERP',
  robots: { index: false, follow: false },
}

export default async function VideoPage() {
  return <VideoClient />
}
