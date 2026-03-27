import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Login — EduCore ERP',
  description: 'Sign in to your EduCore ERP account to manage your coaching institute.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginClient />
}
