'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'student' | 'teacher' | 'management'
  title?: string
}

export default function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const { isLoggedIn, role: userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — desktop only */}
      <Sidebar role={role} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen pb-20 lg:pb-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 h-14 flex items-center px-4 sm:px-6 gap-3">
          <div className="flex-1">
            {title && (
              <h1 className="text-base font-bold text-foreground">{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {role === 'student' ? 'AM' : role === 'teacher' ? 'RS' : 'AD'}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>

      {/* Bottom nav — mobile only */}
      <BottomNav role={role} />
    </div>
  )
}
