import type { Metadata } from 'next'
import TeacherDashboardClient from './TeacherDashboardClient'

export const metadata: Metadata = {
  title: 'Teacher Dashboard — EduCore ERP',
  robots: { index: false, follow: false },
}

export default function TeacherDashboardPage() {
  return <TeacherDashboardClient />
}
