'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Video, ClipboardList, MessageCircle, User
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const studentItems = [
  { href: '/student/dashboard', icon: 'bi-grid-1x2-fill', label: 'Home' },
  { href: '/student/video', icon: 'bi-play-circle-fill', label: 'Lectures' },
  { href: '/student/tests', icon: 'bi-clipboard-check-fill', label: 'Tests' },
  { href: '/student/doubts', icon: 'bi-chat-dots-fill', label: 'Doubts' },
  { href: '/student/analytics', icon: 'bi-bar-chart-fill', label: 'Pulse' },
]

const teacherItems = [
  { href: '/teacher/dashboard', icon: 'bi-grid-1x2-fill', label: 'Home' },
  { href: '#', icon: 'bi-broadcast', label: 'Classes' },
  { href: '#', icon: 'bi-file-earmark-plus-fill', label: 'Tests' },
  { href: '#', icon: 'bi-chat-dots-fill', label: 'Doubts' },
  { href: '#', icon: 'bi-person-circle', label: 'Profile' },
]

const managementItems = [
  { href: '/management/dashboard', icon: 'bi-speedometer2', label: 'Home' },
  { href: '#', icon: 'bi-people-fill', label: 'Students' },
  { href: '#', icon: 'bi-file-earmark-bar-graph-fill', label: 'Reports' },
  { href: '#', icon: 'bi-bell-fill', label: 'Alerts' },
  { href: '#', icon: 'bi-person-gear', label: 'Profile' },
]

const itemsMap = { student: studentItems, teacher: teacherItems, management: managementItems }

export default function BottomNav({ role }: { role: 'student' | 'teacher' | 'management' }) {
  const pathname = usePathname()
  const items = itemsMap[role]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] safe-area-pb">
      <div className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 transition-colors group"
            >
              {active && (
                <motion.span 
                  layoutId="bottom-nav-active"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full" 
                />
              )}
              <i
                className={cn(
                  'bi w-5 h-5 flex items-center justify-center text-lg transition-all duration-200 icon-bounce',
                  item.icon,
                  active ? 'text-primary-600 scale-110' : 'text-slate-400 group-hover:text-slate-600'
                )}
              />
              <span className={cn(
                'text-[10px] font-bold transition-colors uppercase tracking-widest',
                active ? 'text-primary-600' : 'text-slate-400'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
