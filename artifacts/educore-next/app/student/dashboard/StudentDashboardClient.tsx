'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

function Icon({ name, className }: { name: string, className?: string }) {
  return <i className={cn("bi", `bi-${name}`, className)}></i>
}

const PerformanceChart = dynamic(
  () => import('recharts').then((m) => {
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = m
    return function Chart() {
      const data = [
        { day: 'Mon', score: 62 }, { day: 'Tue', score: 70 }, { day: 'Wed', score: 65 },
        { day: 'Thu', score: 78 }, { day: 'Fri', score: 74 }, { day: 'Sat', score: 85 }, { day: 'Sun', score: 82 },
      ]
      return (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[50, 100]} />
            <Tooltip
              contentStyle={{ background: '#fff', border: 'none', borderRadius: 16, fontSize: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              cursor={{ stroke: '#2563EB', strokeWidth: 1 }}
            />
            <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} fill="url(#scoreGrad)" dot={{ fill: '#2563EB', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-52 animate-pulse bg-slate-100 rounded-2xl" /> }
)

const SubjectAnimation = ({ type }: { type: 'physics' | 'chemistry' | 'math' }) => {
  if (type === 'physics') return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M0 50 Q 25 20, 50 50 T 100 50" 
            stroke="#2563EB" 
            strokeWidth="0.5" 
            fill="none"
            animate={{ d: ["M0 50 Q 25 20, 50 50 T 100 50", "M0 50 Q 25 80, 50 50 T 100 50", "M0 50 Q 25 20, 50 50 T 100 50"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <motion.circle r="1" fill="#2563EB" animate={{ cx: [0, 100], cy: [50, 50] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
       </svg>
    </div>
  )
  if (type === 'chemistry') return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
       <motion.div 
         className="w-full h-full border-[0.5px] border-emerald-500 rounded-full chem-orbit mx-auto scale-75"
         animate={{ rotate: 360 }}
         transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
       >
          <div className="w-2 h-2 bg-emerald-500 rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
       </motion.div>
       <div className="w-4 h-4 bg-emerald-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 blur-sm" />
    </div>
  )
  if (type === 'math') return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M10 90 L 30 40 L 50 70 L 70 20 L 90 50" 
            stroke="#8B5CF6" 
            strokeWidth="0.5" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", repeatType: "reverse" }}
          />
       </svg>
    </div>
  )
  return null
}

const stats = [
  { label: 'Study Time Today', value: '4.2h', icon: 'bi-clock-fill', bg: 'bg-blue-50', iconColor: 'text-blue-600', trend: '+0.8h vs yesterday' },
  { label: 'Academic Rank', value: '#12', icon: 'bi-award-fill', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', trend: '↑ Top 5% Globally' },
  { label: 'Tests Mastery', value: '28', icon: 'bi-patch-check-fill', bg: 'bg-indigo-50', iconColor: 'text-indigo-600', trend: '3 solved this week' },
  { label: 'Current Streak', value: '14', icon: 'bi-fire', bg: 'bg-orange-50', iconColor: 'text-orange-600', trend: 'Daily Habit: Active' },
]

export default function StudentDashboardClient() {
  const [activeTab, setActiveTab] = useState('insights')

  return (
    <DashboardLayout role="student" title="Student Learning OS">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Student Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-full bg-primary-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
                 <i className="bi bi-person-circle text-3xl text-primary-400"></i>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <p className="text-primary-400 text-[10px] font-extrabold uppercase tracking-widest border border-primary-500/30 px-2 py-0.5 rounded-md">Learner Node v2.0</p>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Arjun Mehta</h1>
                <p className="text-slate-400 text-sm font-bold mt-1">JEE Mains Pathway · Batch 2025-A</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link href="/student/video">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] btn-glow"
                >
                  <i className="bi bi-play-fill text-xl"></i>
                  Continue: Kinematics L3
                </motion.button>
              </Link>
              <Link href="/student/doubts">
                <button className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all hover:bg-white/10">
                  <i className="bi bi-chat-left-text-fill"></i>
                  Ask Agent Sir
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Learning Insight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6", s.bg)}>
                  <i className={cn("bi text-xl", s.icon, s.iconColor)}></i>
                </div>
                <Link href="/student/analytics" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary-600 transition-colors">
                  <i className="bi bi-arrow-up-right text-xs"></i>
                </Link>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <i className="bi bi-graph-up-arrow text-emerald-500"></i>
                {s.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🚀 Core OS Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Study Mate', icon: 'robot', color: 'bg-indigo-600', href: '/student/study-mate' },
             { label: 'Mock Tests', icon: 'clipboard-check', color: 'bg-slate-900', href: '/student/tests' },
             { label: 'Doubts Hub', icon: 'chat-dots', color: 'bg-emerald-600', href: '/student/doubts' },
             { label: 'Pulse Analytics', icon: 'bar-chart', color: 'bg-primary-600', href: '/student/analytics' },
           ].map((a) => (
             <Link key={a.label} href={a.href}>
               <motion.button 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 transition-all hover:shadow-xl hover:border-primary-100 group"
               >
                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform", a.color)}>
                   <Icon name={a.icon} />
                 </div>
                 <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">{a.label}</span>
               </motion.button>
             </Link>
           ))}
        </div>

        {/* Main Learning Hub */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Smart Learning Suggestions Panel */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all hover:border-primary-100 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <i className="bi bi-cpu-fill text-primary-500"></i>
                    Learning Engine Suggestions
                  </h3>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1">Autonomous study optimization OS</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="p-5 bg-blue-50/50 border border-blue-100 rounded-3xl group/card relative overflow-hidden"
                >
                  <SubjectAnimation type="physics" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-50">
                      <i className="bi bi-lightning-charge-fill text-xl"></i>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 mb-1 tracking-tight">Revise: Motion in 1D</p>
                    <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">System predicts 15% drop in memory retention for this chapter.</p>
                    <button className="mt-auto w-full py-3 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-2xl btn-glow shadow-lg shadow-blue-200">Start Revision Now</button>
                  </div>
                </motion.div>

                <motion.div 
                   whileHover={{ y: -5 }}
                   className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-3xl group/card relative overflow-hidden"
                >
                  <SubjectAnimation type="chemistry" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm border border-emerald-50">
                      <i className="bi bi-droplet-fill text-xl"></i>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 mb-1 tracking-tight">Solve: Bonding Level-II</p>
                    <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">You missed the DPP submission for this topic yesterday.</p>
                    <button className="mt-auto w-full py-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-2xl btn-glow shadow-lg shadow-emerald-200">Open Assignment</button>
                  </div>
                </motion.div>
                
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="p-5 bg-violet-50/50 border border-violet-100 rounded-3xl group/card relative overflow-hidden"
                >
                  <SubjectAnimation type="math" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-violet-600 mb-4 shadow-sm border border-violet-50">
                      <i className="bi bi-graph-up text-xl"></i>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 mb-1 tracking-tight">Watch: Integration Basics</p>
                    <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">You haven't accessed any Math lectures in the last 48 hours.</p>
                    <button className="mt-auto w-full py-3 bg-violet-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-2xl btn-glow shadow-lg shadow-violet-200">Resume Video</button>
                  </div>
                </motion.div>

                <motion.div 
                   whileHover={{ y: -5 }}
                   className="p-5 bg-slate-100 border border-slate-200 rounded-3xl group/card relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 mb-4 shadow-sm border border-slate-100">
                      <i className="bi bi-calendar-event-fill text-xl"></i>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 mb-1 tracking-tight">Upcoming: Mock Test #4</p>
                    <p className="text-xs font-bold text-slate-500 mb-6 leading-relaxed">Full Syllabus test scheduled for this Sunday morning 10 AM.</p>
                    <button className="mt-auto w-full py-3 bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-2xl btn-glow shadow-lg">View Syllabus</button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Mastery Visualization */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden group">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Learning Curve Mastery</h3>
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1">Cross-subject performance node status</p>
                  </div>
                  <div className="flex bg-slate-50 rounded-xl p-1 gap-1">
                     <button className="px-3 py-1.5 text-[10px] font-extrabold uppercase bg-white border border-slate-100 text-primary-600 rounded-lg shadow-sm tracking-widest">Efficiency</button>
                     <button className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-500 hover:text-primary-600 rounded-lg tracking-widest transition-all">Accuracy</button>
                  </div>
               </div>
               <PerformanceChart />
            </div>

          </div>

          <div className="space-y-6">
            
            {/* Real-time System Alert Node */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="bi bi-reception-4 text-6xl text-blue-500"></i>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-5">System Alerts OS</h3>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 notify-slide">
                   <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                     <i className="bi bi-exclamation-triangle-fill"></i>
                   </div>
                   <div>
                     <p className="text-xs font-extrabold text-slate-900">Test Deadline Approaching</p>
                     <p className="text-[10px] font-bold text-slate-500 leading-snug">NEET Prep Unit-1 test expires in 4 hours 30 mins.</p>
                   </div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 notify-slide" style={{ animationDelay: '0.1s' }}>
                   <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
                     <i className="bi bi-lightning-fill"></i>
                   </div>
                   <div>
                     <p className="text-xs font-extrabold text-slate-900">Memory Node Warning</p>
                     <p className="text-[10px] font-bold text-slate-500 leading-snug">You are forgetting 'Quantum Mechanics' sub-topics.</p>
                   </div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 notify-slide" style={{ animationDelay: '0.2s' }}>
                   <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                     <i className="bi bi-clock-history"></i>
                   </div>
                   <div>
                     <p className="text-xs font-extrabold text-slate-900">Consistency Badge Logic</p>
                     <p className="text-[10px] font-bold text-slate-500 leading-snug">Complete 1 Physics chapter today to hit 15-day streak.</p>
                   </div>
                </motion.div>
              </div>
            </section>

            {/* Quick Automation Access */}
            <div className="bg-slate-950 rounded-3xl p-6 text-white border border-slate-900">
               <h3 className="text-[10px] font-extrabold text-primary-400 uppercase tracking-[0.2em] mb-4">Automation Terminal</h3>
               <div className="space-y-1 relative z-10">
                  <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <div className="flex items-center gap-3">
                        <i className="bi bi-journal-text text-lg text-slate-500 group-hover:text-primary-400 icon-bounce"></i>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-white">Request Study Leave</span>
                     </div>
                     <i className="bi bi-chevron-right text-[10px] text-slate-600"></i>
                  </button>
                  <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <div className="flex items-center gap-3">
                        <i className="bi bi-headset text-lg text-slate-500 group-hover:text-emerald-400 icon-bounce"></i>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-white">Technical Support OS</span>
                     </div>
                     <i className="bi bi-chevron-right text-[10px] text-slate-600"></i>
                  </button>
                  <button className="w-full flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                     <div className="flex items-center gap-3">
                        <i className="bi bi-trash3 text-lg text-slate-500 group-hover:text-red-400 icon-bounce"></i>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-white">Wipe Learning Cache</span>
                     </div>
                     <i className="bi bi-chevron-right text-[10px] text-slate-600"></i>
                  </button>
               </div>
            </div>

            {/* Ad Injection Node */}
            <div className="rounded-3xl border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 group bg-white">
               <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[8px] font-extrabold uppercase text-slate-400 tracking-widest border border-slate-200 px-2 py-0.5 rounded-full">Educational System Ad</span>
                  <i className="bi bi-info-circle text-[10px] text-slate-300"></i>
               </div>
               <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                     <i className="bi bi-laptop-fill text-2xl text-blue-600"></i>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 mb-1 uppercase tracking-tight">Prime Coding Node</p>
                  <p className="text-xs font-bold text-slate-500 mb-6 px-4 leading-relaxed">System-verified course for MERN Stack. 1-click upgrade to full access.</p>
                  <button className="w-full py-3 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 btn-glow">Upgrade Node</button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
