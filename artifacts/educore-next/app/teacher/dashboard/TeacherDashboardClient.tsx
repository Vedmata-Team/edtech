'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const BatchPerformanceChart = dynamic(
  () => import('recharts').then((m) => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } = m
    return function Chart() {
      const data = [
        { batch: 'JEE-A', avg: 78 }, { batch: 'JEE-B', avg: 65 }, { batch: 'NEET-A', avg: 82 },
        { batch: 'NEET-B', avg: 71 }, { batch: 'Boards', avg: 88 },
      ]
      const colors = ['#2563EB', '#60A5FA', '#1E40AF', '#38BDF8', '#2563EB']
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={28} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#fff', border: 'none', borderRadius: 16, fontSize: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
              {data.map((_, i) => <Cell key={i} fill={colors[i%colors.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-52 animate-pulse bg-slate-100 rounded-2xl" /> }
)

const stats = [
  { label: 'My Students', value: '428', icon: 'bi-people-fill', bg: 'bg-blue-50', iconColor: 'text-blue-600', trend: '+12 total' },
  { label: 'Classes Taken', value: '156', icon: 'bi-camera-reels-fill', bg: 'bg-indigo-50', iconColor: 'text-indigo-600', trend: '8 this month' },
  { label: 'Pending Doubts', value: '24', icon: 'bi-question-circle-fill', bg: 'bg-orange-50', iconColor: 'text-orange-600', trend: 'Priority: High', alert: true },
  { label: 'Avg Batch Score', value: '74%', icon: 'bi-graph-up', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', trend: '+6% growth' },
]

export default function TeacherDashboardClient() {
  const [sendingFollowUp, setSendingFollowUp] = useState(false)

  const handleFollowUp = () => {
    setSendingFollowUp(true)
    setTimeout(() => setSendingFollowUp(false), 2000)
  }

  return (
    <DashboardLayout role="teacher" title="Teaching Core System">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Teacher Welcome Automation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-indigo-950 rounded-3xl p-6 text-white border border-indigo-900 shadow-2xl"
        >
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/4" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md shadow-2xl">
                 <i className="bi bi-person-workspace text-3xl text-indigo-300"></i>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">System Terminal: Rahul Sir</h1>
                <p className="text-indigo-300/70 text-sm mt-1 font-bold">Physics Faculty · 3 sessions queued today</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-[0_10px_20px_-5px_rgba(99,102,241,0.5)] btn-glow w-full sm:w-auto"
              >
                <i className="bi bi-broadcast"></i>
                Initiate Live Stream
              </motion.button>
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-5 py-3 rounded-2xl text-sm transition-all hover:bg-white/10 w-full sm:w-auto">
                <i className="bi bi-upload"></i>
                Bulk Upload Content
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6", s.bg)}>
                  <i className={cn("bi text-xl", s.icon, s.iconColor)}></i>
                </div>
                {s.alert && (
                  <span className="bg-orange-100 text-orange-600 text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-full uppercase">Action Required</span>
                )}
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              <p className="mt-4 text-[11px] font-bold text-slate-400 flex items-center gap-2">
                <i className="bi bi-activity text-indigo-400"></i>
                {s.trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Interface Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">

            {/* Teaching Assistant Intelligence */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="bi bi-robot text-8xl text-indigo-600"></i>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <i className="bi bi-stars text-indigo-500"></i>
                  Smart Teaching Suggestions
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Autonomous instructional feedback OS</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                      <i className="bi bi-exclamation-triangle-fill text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 tracking-tight">Topic Failure Alert: Rotational Motion</p>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">65% students failed to solve sub-topic: Moment of Inertia.</p>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-indigo-700 transition-all btn-glow shadow-lg shadow-indigo-200">
                    Schedule Revision Class
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                      <i className="bi bi-send-check-fill text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 tracking-tight">Assignment Follow-Up: Batch JEE-A</p>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">14 students haven't submitted the Heat Transfer DPP.</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleFollowUp}
                    disabled={sendingFollowUp}
                    className={cn(
                      "text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 rounded-xl transition-all btn-glow shadow-lg min-w-[170px]",
                      sendingFollowUp ? "bg-slate-200 text-slate-500 shadow-none cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                    )}
                  >
                    {sendingFollowUp ? "Processing Reminders..." : "Remind All Pending"}
                  </button>
                </div>
              </div>
            </section>

            {/* Performance Visualization */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Batch Performance Analysis</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">Comparing average scores across instructional groups</p>
                </div>
                <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                   <button className="px-3 py-1.5 text-[10px] font-extrabold uppercase bg-white text-indigo-600 rounded-lg shadow-sm tracking-widest">Test Scores</button>
                   <button className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-500 hover:text-indigo-600 rounded-lg tracking-widest transition-all">Attendance</button>
                </div>
              </div>
              <BatchPerformanceChart />
            </div>

          </div>

          <div className="space-y-6">
            
            {/* Urgent Doubt Resolver Dashboard */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative group overflow-hidden">
               <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">Priority Doubts Stack</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Sorted by: Weak Students First</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold text-[10px]">24</div>
              </div>
              <div className="space-y-3">
                {[
                  { student: 'Arjun Mehta', level: 'Weak in Kinematics', text: 'Sir, horizontal velocity is constant why?', time: '2m', priority: 'critical' },
                  { student: 'Priya S.', level: 'Average Student', text: 'Real vs Virtual image diff?', time: '12m', priority: 'medium' },
                  { student: 'Karan T.', level: 'Above Average', text: 'Carnot cycle efficiency why 1-T2/T1?', time: '21m', priority: 'low' },
                ].map((doubt, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5 }}
                    className={cn(
                      "p-4 rounded-2xl border transition-all cursor-pointer group/item",
                      doubt.priority === 'critical' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100'
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <p className="text-xs font-extrabold text-slate-900">{doubt.student}</p>
                       <span className="text-[9px] font-bold text-slate-400">{doubt.time} ago</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 group-hover/item:text-slate-700 transition-colors line-clamp-2">"{doubt.text}"</p>
                    <div className="mt-4 flex items-center justify-between">
                       <span className={cn("text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-widest", doubt.priority === 'critical' ? 'bg-orange-200 text-orange-700' : 'bg-slate-200 text-slate-500')}>
                         {doubt.level}
                       </span>
                       <i className="bi bi-arrow-right-circle-fill text-indigo-600 text-lg group-hover/item:translate-x-1 transition-transform"></i>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 bg-indigo-50 text-indigo-600 text-[10px] font-extrabold uppercase tracking-[0.2em] rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-all">
                 Load Full Inbox
              </button>
            </section>

            {/* Smart Teaching Actions */}
            <div className="bg-slate-950 rounded-3xl p-6 text-white border border-slate-900 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="bi bi-lightning-charge-fill text-7xl text-indigo-400"></i>
              </div>
              <h3 className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest mb-4">Teaching Terminal v2.4</h3>
              <div className="space-y-2 relative z-10">
                <button className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
                   <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                     <i className="bi bi-calendar-plus"></i>
                   </div>
                   <span className="text-xs font-bold text-slate-300">Set Exam Schedule</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                     <i className="bi bi-file-earmark-check"></i>
                   </div>
                   <span className="text-xs font-bold text-slate-300">Grade Test Papers</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all group">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                     <i className="bi bi-chat-right-text"></i>
                   </div>
                   <span className="text-xs font-bold text-slate-300">Notify Parent Group</span>
                </button>
              </div>
            </div>

            {/* Multitouch Ad Area */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <i className="bi bi-award-fill"></i>
                </div>
                <p className="text-sm font-extrabold uppercase tracking-tight mb-2">Become a Featured Expert</p>
                <p className="text-indigo-100/70 text-[10px] font-bold leading-relaxed mb-4">Get listed in the regional coaching directory and increase your organic reach by 40%.</p>
                <button className="w-full py-2 bg-white text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-indigo-50 transition-all shadow-xl">Apply Now</button>
              </div>
              <div className="absolute top-3 right-4 text-[7px] font-extrabold bg-black/20 px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/10">Sponsored OS Ad</div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
