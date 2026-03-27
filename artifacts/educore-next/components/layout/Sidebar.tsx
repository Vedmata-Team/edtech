'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import {
  GraduationCap, LayoutDashboard, Video, ClipboardList, MessageCircle,
  BookOpen, BarChart3, Users, DollarSign, Calendar, LogOut, Settings, Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studentNav = [
  { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/student/video/1', icon: Video, label: 'Video Lectures' },
  { href: '/student/doubts', icon: MessageCircle, label: 'Doubts' },
  { href: '#', icon: ClipboardList, label: 'Mock Tests' },
  { href: '#', icon: BarChart3, label: 'Analytics' },
  { href: '#', icon: BookOpen, label: 'Study Material' },
]

const teacherNav = [
  { href: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Video, label: 'Live Classes' },
  { href: '#', icon: ClipboardList, label: 'Create Tests' },
  { href: '#', icon: MessageCircle, label: 'Doubts Inbox' },
  { href: '#', icon: BarChart3, label: 'Analytics' },
  { href: '#', icon: Users, label: 'My Students' },
]

const managementNav = [
  { href: '/management/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'Students' },
  { href: '#', icon: DollarSign, label: 'Fee Management' },
  { href: '#', icon: Calendar, label: 'Attendance' },
  { href: '#', icon: BarChart3, label: 'Reports' },
  { href: '#', icon: Bell, label: 'Notifications' },
]

const navMap = { student: studentNav, teacher: teacherNav, management: managementNav }

interface SidebarProps {
  role: 'student' | 'teacher' | 'management'
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()
  const nav = navMap[role]

  const roleLabels = { student: 'Student Portal', teacher: 'Teacher Portal', management: 'Admin Portal' }
  const roleNames = { student: 'Arjun Mehta', teacher: 'Rahul Sir', management: 'Admin' }
  const roleAvatars = { student: 'AM', teacher: 'RS', management: 'AD' }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-foreground text-white z-40">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Edu<span className="text-accent">Core</span>
          </span>
        </Link>
      </div>

      {/* User profile */}
      <div className="p-4 border-b border-slate-800 mx-3 my-3 bg-slate-800/50 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {roleAvatars[role]}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{roleNames[role]}</p>
            <p className="text-xs text-slate-400">{roleLabels[role]}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
