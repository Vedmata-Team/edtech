'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  Clock, Award, ClipboardList, Flame, Play, BookOpen,
  MessageCircle, Bell, ChevronRight, TrendingUp, Lock
} from 'lucide-react'

const AreaChart = dynamic(
  () => import('recharts').then((m) => {
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = m
    return function Chart() {
      const data = [
        { day: 'Mon', score: 62 }, { day: 'Tue', score: 70 }, { day: 'Wed', score: 65 },
        { day: 'Thu', score: 78 }, { day: 'Fri', score: 74 }, { day: 'Sat', score: 85 }, { day: 'Sun', score: 82 },
      ]
      return (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[50, 100]} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12 }}
              formatter={(v: number) => [`${v}%`, 'Score']}
            />
            <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: '#2563EB', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-44 animate-pulse bg-slate-100 rounded-xl" /> }
)

const stats = [
  { label: 'Study Time Today', value: '4.2h', icon: Clock, color: 'bg-blue-50 text-blue-600', change: '+0.8h' },
  { label: 'Current Rank', value: '#12', icon: Award, color: 'bg-amber-50 text-amber-600', change: '↑ 33 places' },
  { label: 'Tests Done', value: '28', icon: ClipboardList, color: 'bg-violet-50 text-violet-600', change: '3 this week' },
  { label: 'Day Streak', value: '14', icon: Flame, color: 'bg-orange-50 text-orange-600', change: 'Keep it up!' },
]

const courses = [
  { subject: 'Physics', chapter: 'Kinematics', progress: 72, color: 'bg-blue-500', duration: '1h 20m left' },
  { subject: 'Mathematics', chapter: 'Integration', progress: 48, color: 'bg-violet-500', duration: '2h 10m left' },
  { subject: 'Chemistry', chapter: 'Chemical Bonding', progress: 85, color: 'bg-emerald-500', duration: '35m left' },
]

const tests = [
  { name: 'Physics Full Mock Test', date: 'Tomorrow, 10:00 AM', type: 'Full Test', questions: 45, duration: '90 min' },
  { name: 'Mathematics Chapter Test', date: 'Fri, 4:00 PM', type: 'Chapter Test', questions: 20, duration: '40 min' },
  { name: 'Chemistry Weekly Quiz', date: 'Sat, 11:00 AM', type: 'Quiz', questions: 15, duration: '20 min' },
]

const subjects = [
  { name: 'Physics', progress: 72, teachers: 'Rahul Sir' },
  { name: 'Mathematics', progress: 48, teachers: 'Priya Ma\'am' },
  { name: 'Chemistry', progress: 85, teachers: 'Vikram Sir' },
  { name: 'Biology', progress: 61, teachers: 'Sneha Ma\'am' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function StudentDashboardClient() {
  return (
    <DashboardLayout role="student" title="Student Dashboard">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-5 text-white flex items-center justify-between"
      >
        <div>
          <p className="text-blue-200 text-sm mb-1">Good morning! 👋</p>
          <h2 className="text-xl font-bold">Arjun Mehta</h2>
          <p className="text-blue-200 text-sm mt-1">JEE Mains Batch 2025 · 14-day streak 🔥</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <Bell className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium">3 new alerts</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">{s.change}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Continue Learning</h3>
              <button className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {courses.map((c, i) => (
                <motion.div
                  key={c.subject}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{c.subject}</p>
                        <p className="text-xs text-slate-500">{c.chapter}</p>
                      </div>
                      <span className="text-xs text-primary-600 font-medium">{c.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full ${c.color} rounded-full`}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{c.duration}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary-50 group-hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                    <Play className="w-3.5 h-3.5 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground">Performance This Week</h3>
                <p className="text-xs text-slate-500">Daily test scores</p>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">+12% from last week</span>
              </div>
            </div>
            <AreaChart />
          </motion.div>
        </div>

        {/* Right — sidebar content */}
        <div className="space-y-5">
          {/* Upcoming Tests */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Upcoming Tests</h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">3 tests</span>
            </div>
            <div className="space-y-3">
              {tests.map((t, i) => (
                <div key={t.name} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-start justify-between mb-1.5">
                    <p className="text-sm font-semibold text-foreground leading-tight">{t.name}</p>
                    {i === 0 && (
                      <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                        Soon!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{t.date}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{t.questions}Q</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Subject Progress */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Subject Progress</h3>
            <div className="space-y-3.5">
              {subjects.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <div>
                      <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      <span className="text-xs text-slate-400 ml-2">{s.teachers}</span>
                    </div>
                    <span className="text-xs font-bold text-primary-600">{s.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary-600 to-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick action */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.a
              href="/student/doubts"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl text-white shadow-lg cursor-pointer"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Have a doubt?</p>
                <p className="text-xs text-blue-200">Ask a teacher instantly</p>
              </div>
              <ChevronRight className="w-5 h-5 ml-auto" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
