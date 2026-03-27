'use client'

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import { Bell, Search } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'student' | 'teacher' | 'management'
  title?: string
}

const roleConfig = {
  student: { avatar: 'AM', color: 'bg-blue-500' },
  teacher: { avatar: 'RS', color: 'bg-indigo-500' },
  management: { avatar: 'AD', color: 'bg-slate-600' },
}

export default function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const { isLoggedIn, mounted } = useAuth()
  const router = useRouter()
  const config = roleConfig[role]

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login')
    }
  }, [mounted, isLoggedIn, router])

  // Show spinner until client-side auth is resolved
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex pt-[104px]">
      <Sidebar role={role} className="mt-[104px] h-[calc(100vh-104px)]" />

      <div className="flex-1 lg:ml-64 min-h-[calc(100vh-104px)] pb-20 lg:pb-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center px-4 sm:px-6 gap-3 shadow-sm">
          <div className="flex-1 min-w-0">
            {title && <h1 className="text-sm font-bold text-foreground truncate">{title}</h1>}
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-8 h-8 items-center justify-center text-slate-400 hover:text-foreground hover:bg-slate-100 rounded-xl transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="relative w-8 h-8 flex items-center justify-center text-slate-400 hover:text-foreground hover:bg-slate-100 rounded-xl transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer`}>
              {config.avatar}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>

      <BottomNav role={role} />
    </div>
  )
}
