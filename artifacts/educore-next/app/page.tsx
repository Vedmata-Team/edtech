import type { Metadata } from 'next'
import LandingPage from '@/components/landing/LandingPage'

export const metadata: Metadata = {
  title: 'EduCore ERP — All-in-One Coaching & School Management Platform',
  description:
    'EduCore is the #1 coaching ERP software in India. Manage students, teachers, fees, live classes, mock tests, and doubts from one platform. Trusted by 500+ institutes.',
  alternates: {
    canonical: 'https://educore.app',
  },
}

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  )
}
