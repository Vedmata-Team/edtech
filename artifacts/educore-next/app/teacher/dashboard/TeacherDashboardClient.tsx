'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  Users, Video, MessageCircle, TrendingUp, ChevronRight,
  Play, Upload, ClipboardList, Clock, CheckCircle, Bell, Star
} from 'lucide-react'

const BarChartComponent = dynamic(
  () => import('recharts').then((m) => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = m
    return function Chart() {
      const data = [
        { batch: 'JEE-A', avg: 78 }, { batch: 'JEE-B', avg: 65 }, { batch: 'NEET-A', avg: 82 },
        { batch: 'NEET-B', avg: 71 }, { batch: 'Boards', avg: 88 },
      ]
      return (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12 }}
              formatter={(v: number) => [`${v}%`, 'Avg Score']}
            />
            <Bar dataKey="avg" fill="#2563EB" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-44 animate-pulse bg-slate-100 rounded-xl" /> }
)

const stats = [
  { label: 'Total Students', value: '428', icon: Users, color: 'bg-blue-50 text-blue-600', change: '+12 this week' },
  { label: 'Classes Taken', value: '156', icon: Video, color: 'bg-violet-50 text-violet-600', change: '8 this month' },
  { label: 'Pending Doubts', value: '24', icon: MessageCircle, color: 'bg-orange-50 text-orange-600', change: 'Reply needed' },
  { label: 'Avg. Batch Score', value: '74%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600', change: '+6% vs last month' },
]

const todayClasses = [
  { name: 'JEE Mains — Kinematics', time: '10:00 AM', students: 85, status: 'live' },
  { name: 'NEET — Cell Biology', time: '12:30 PM', students: 62, status: 'upcoming' },
  { name: 'Board Prep — Algebra', time: '3:00 PM', students: 48, status: 'upcoming' },
]

const recentDoubts = [
  { student: 'Arjun M.', subject: 'Kinematics', question: 'Sir, in projectile motion why is...', time: '5m ago', priority: 'high' },
  { student: 'Priya S.', subject: 'Optics', question: 'Difference between real and virtual image?', time: '12m ago', priority: 'medium' },
  { student: 'Karan T.', subject: 'Thermodynamics', question: 'How does Carnot cycle efficiency...', time: '28m ago', priority: 'low' },
  { student: 'Ananya R.', subject: 'Waves', question: 'Standing waves formation explanation?', time: '1h ago', priority: 'low' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TeacherDashboardClient() {
  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-indigo-600 to-primary-800 rounded-2xl p-5 text-white flex items-center justify-between"
      >
        <div>
          <p className="text-indigo-200 text-sm mb-1">Good morning! 👋</p>
          <h2 className="text-xl font-bold">Rahul Sir</h2>
          <p className="text-indigo-200 text-sm mt-1">Physics Faculty · 3 classes today</p>
        </div>
        <div className="hidden sm:flex gap-3">
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            <Play className="w-4 h-4" />
            Start Live Class
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors">
            <Upload className="w-4 h-4" />
            Upload Content
          </button>
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
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Today's Classes</h3>
              <span className="text-xs text-primary-600 font-semibold bg-primary-50 px-2 py-1 rounded-full">3 scheduled</span>
            </div>
            <div className="space-y-3">
              {todayClasses.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    c.status === 'live' ? 'bg-red-100' : 'bg-blue-50'
                  }`}>
                    <Video className={`w-5 h-5 ${c.status === 'live' ? 'text-red-500' : 'text-primary-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-500">{c.time}</span>
                      <span className="text-xs text-slate-400">{c.students} students</span>
                    </div>
                  </div>
                  {c.status === 'live' ? (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      LIVE
                    </button>
                  ) : (
                    <button className="px-3 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 transition-colors">
                      Join
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Batch Performance */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Batch Performance</h3>
              <span className="text-xs text-slate-500">Average test scores</span>
            </div>
            <BarChartComponent />
          </motion.div>
        </div>

        <div className="space-y-5">
          {/* Pending Doubts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Pending Doubts</h3>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">24 pending</span>
            </div>
            <div className="space-y-3">
              {recentDoubts.map((d, i) => (
                <div key={d.student + i} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{d.student}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{d.time}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        d.priority === 'high' ? 'bg-red-100 text-red-600' :
                        d.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {d.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">{d.question}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{d.subject}</span>
                    <button className="text-xs text-primary-600 font-semibold hover:underline">Answer →</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 text-sm text-primary-600 font-semibold border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors">
              View All 24 Doubts
            </button>
          </motion.div>

          {/* Quick actions */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ClipboardList, label: 'Create Test', color: 'bg-violet-50 text-violet-600' },
                { icon: Upload, label: 'Upload Video', color: 'bg-blue-50 text-blue-600' },
                { icon: Bell, label: 'Send Alert', color: 'bg-amber-50 text-amber-600' },
                { icon: Star, label: 'Grade Tests', color: 'bg-emerald-50 text-emerald-600' },
              ].map((a) => (
                <button key={a.label} className={`flex flex-col items-center gap-2 p-3 ${a.color} rounded-xl hover:opacity-80 transition-opacity`}>
                  <a.icon className="w-5 h-5" />
                  <span className="text-xs font-semibold">{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
