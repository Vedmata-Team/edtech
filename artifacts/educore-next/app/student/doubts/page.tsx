import type { Metadata } from 'next'
import DoubtsClient from './DoubtsClient'

export const metadata: Metadata = {
  title: 'Doubts — EduCore ERP',
  robots: { index: false, follow: false },
}

export default function DoubtsPage() {
  return <DoubtsClient />
}
