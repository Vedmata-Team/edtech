import type { Metadata } from 'next'
import ManagementDashboardClient from './ManagementDashboardClient'

export const metadata: Metadata = {
  title: 'Management Dashboard — EduCore ERP',
  robots: { index: false, follow: false },
}

export default function ManagementDashboardPage() {
  return <ManagementDashboardClient />
}
