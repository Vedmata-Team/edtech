import type { Metadata } from 'next'
import StudentDashboardClient from './StudentDashboardClient'

export const metadata: Metadata = {
  title: 'Student Dashboard — EduCore ERP',
  robots: { index: false, follow: false },
}

export default function StudentDashboardPage() {
  return <StudentDashboardClient />
}
