'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Video, ClipboardList, MessageCircle, User
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studentItems = [
  { href: '/student/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/student/video/1', icon: Video, label: 'Lectures' },
  { href: '#', icon: ClipboardList, label: 'Tests' },
  { href: '/student/doubts', icon: MessageCircle, label: 'Doubts' },
  { href: '#', icon: User, label: 'Profile' },
]

const teacherItems = [
  { href: '/teacher/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '#', icon: Video, label: 'Classes' },
  { href: '#', icon: ClipboardList, label: 'Tests' },
  { href: '#', icon: MessageCircle, label: 'Doubts' },
  { href: '#', icon: User, label: 'Profile' },
]

const managementItems = [
  { href: '/management/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '#', icon: User, label: 'Students' },
  { href: '#', icon: ClipboardList, label: 'Reports' },
  { href: '#', icon: MessageCircle, label: 'Alerts' },
  { href: '#', icon: User, label: 'Profile' },
]

const itemsMap = { student: studentItems, teacher: teacherItems, management: managementItems }

export default function BottomNav({ role }: { role: 'student' | 'teacher' | 'management' }) {
  const pathname = usePathname()
  const items = itemsMap[role]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-all',
                  active ? 'text-primary-600 scale-110' : 'text-slate-400'
                )}
              />
              <span className={cn('text-[10px] font-medium', active ? 'text-primary-600' : 'text-slate-400')}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-1 h-1 bg-primary-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
