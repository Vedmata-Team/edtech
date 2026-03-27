'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const studentNav = [
  { href: '/student/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard Hub' },
  { href: '/student/video', icon: 'bi-play-circle-fill', label: 'Video Lectures' },
  { href: '/student/doubts', icon: 'bi-chat-dots-fill', label: 'Doubt Solver' },
  { href: '/student/tests', icon: 'bi-clipboard-check-fill', label: 'Mock Arena' },
  { href: '/student/analytics', icon: 'bi-bar-chart-fill', label: 'Pulse Analytics' },
  { href: '/student/study-mate', icon: 'bi-robot', label: 'Study Mate AI' },
]

const teacherNav = [
  { href: '/teacher/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard Hub' },
  { href: '/teacher/live', icon: 'bi-broadcast', label: 'Live Classes' },
  { href: '/teacher/tests', icon: 'bi-file-earmark-plus-fill', label: 'Create Tests' },
  { href: '/teacher/doubts', icon: 'bi-inboxes-fill', label: 'Doubts Inbox' },
  { href: '/teacher/analytics', icon: 'bi-bar-chart-fill', label: 'Analytics' },
  { href: '/teacher/students', icon: 'bi-people-fill', label: 'My Students' },
]

const managementNav = [
  { href: '/management/dashboard', icon: 'bi-speedometer2', label: 'Dashboard Hub' },
  { href: '/management/students', icon: 'bi-mortarboard-fill', label: 'Students' },
  { href: '/management/fees', icon: 'bi-cash-coin', label: 'Fee Management' },
  { href: '/management/attendance', icon: 'bi-calendar-check-fill', label: 'Attendance' },
  { href: '/management/reports', icon: 'bi-file-earmark-bar-graph-fill', label: 'Reports' },
  { href: '/management/notifications', icon: 'bi-bell-fill', label: 'Notifications' },
]

const navMap = { student: studentNav, teacher: teacherNav, management: managementNav }

const roleConfig = {
  student: { label: 'Student Portal', name: 'Arjun Mehta', avatar: 'AM', accent: 'bg-blue-600' },
  teacher: { label: 'Teacher Portal', name: 'Rahul Sir', avatar: 'RS', accent: 'bg-indigo-600' },
  management: { label: 'Admin Portal', name: 'Admin', avatar: 'AD', accent: 'bg-slate-700' },
}

interface SidebarProps {
  role: 'student' | 'teacher' | 'management'
  className?: string
}

export default function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const router = useRouter()
  const nav = navMap[role]
  const config = roleConfig[role]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className={cn("hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-slate-950 text-white z-[90] border-r border-slate-900 transition-all duration-500", className)}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-900">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:bg-primary-500 transition-all cursor-pointer"
          >
            <i className="bi bi-mortarboard-fill text-xl text-white"></i>
          </motion.div>
          <span className="font-extrabold text-xl tracking-tight">
            Edu<span className="text-primary-400">Core</span>
          </span>
        </Link>
      </div>

      {/* User profile */}
      <div className="px-3 py-4">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-inner", config.accent)}>
            {config.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{config.name}</p>
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest truncate">{config.label}</p>
          </div>
          <div className="ml-auto">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.2em] px-3 mb-4">Core Operating System</p>
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden',
                    active
                      ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                  )}
                >
                  <i className={cn('bi text-lg transition-transform duration-300 group-hover:scale-110 icon-bounce', item.icon, active ? 'text-primary-400' : 'text-slate-500Group-hover:text-white')}></i>
                  {item.label}
                  {active && (
                    <motion.div 
                      layoutId="active-pill"
                      className="ml-auto w-1 h-4 bg-primary-500 rounded-full" 
                    />
                  )}
                  <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-slate-900 space-y-1">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white/5 hover:text-white transition-all group"
        >
          <i className="bi bi-gear-wide-connected text-lg group-hover:rotate-45 transition-transform duration-500"></i>
          System Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <i className="bi bi-power text-lg"></i>
          Terminate Session
        </button>
      </div>
    </aside>
  )
}
