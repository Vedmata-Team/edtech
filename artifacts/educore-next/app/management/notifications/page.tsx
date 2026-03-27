'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const notifications = [
  { id: 1, title: 'Fee Defaulter Alert', body: '42 students in cluster JEE-A have pending dues for March.', type: 'urgent', time: '12m ago', icon: 'bi-exclamation-octagon-fill', color: 'bg-red-100 text-red-600' },
  { id: 2, title: 'New Admission Registered', body: 'A new student "Aman Singh" has joined NEET-B batch.', type: 'info', time: '1h ago', icon: 'bi-person-plus-fill', color: 'bg-emerald-100 text-emerald-600' },
  { id: 3, title: 'Attendance Drop Sync', body: 'Batch Boards-H attendance dropped below 70% threshold.', type: 'warning', time: '4h ago', icon: 'bi-graph-down', color: 'bg-orange-100 text-orange-600' },
  { id: 4, title: 'System Node Updated', body: 'EduCore OS v2.4 successfully deployed to faculty studio.', type: 'system', time: '2d ago', icon: 'bi-cpu-fill', color: 'bg-slate-900 text-white' },
]

export default function ManagementNotificationsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <DashboardLayout role="management" title="Operational Broadcast Hub">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-50">
                <i className="bi bi-bell-fill"></i>
              </span>
              Global Notification Studio
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System biological alerts & operational broadcast os</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button onClick={() => setFilter('all')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", filter === 'all' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Global Feed</button>
             <button onClick={() => setFilter('urgent')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", filter === 'urgent' ? "bg-red-600 text-white shadow-xl shadow-red-500/20" : "text-slate-400 hover:text-red-900")}>Urgent Axis</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-4">
              <AnimatePresence mode="popLayout">
                 {notifications.filter(n => filter === 'all' || n.type === filter).map((n) => (
                    <motion.div
                       key={n.id}
                       layout
                       initial={{ opacity: 0, x: -20, scale: 0.95 }}
                       animate={{ opacity: 1, x: 0, scale: 1 }}
                       exit={{ opacity: 0, x: 20, scale: 0.95 }}
                       className="group p-6 bg-white rounded-[40px] border border-slate-100 hover:border-slate-300 transition-all hover:shadow-2xl flex items-start gap-6 relative overflow-hidden"
                    >
                       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform", n.color)}>
                          <i className={cn("bi text-2xl", n.icon)} />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="text-[14px] font-black tracking-tight text-slate-900">{n.title}</h4>
                             <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{n.time}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-500 leading-relaxed mb-4">"{n.body}"</p>
                          <div className="flex gap-2">
                             <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-extrabold uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all">Mark Cleared</button>
                             <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-extrabold uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all">Trace Student Node</button>
                          </div>
                       </div>
                       {n.type === 'urgent' && <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500" />}
                    </motion.div>
                 ))}
              </AnimatePresence>
              
              <div className="flex justify-center pt-8">
                 <button className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:underline">Synchronize Global Archive Feed</button>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden group border border-slate-900">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <i className="bi bi-megaphone-fill text-[80px] text-primary-400" />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest mb-6">Omni-Channel Broadcast</h3>
                 <p className="text-slate-400 text-xs font-bold leading-relaxed mb-10">Transmit regional alerts or cluster notices to all student and faculty nodes instantly via WhatsApp, Email & App Notification.</p>
                 <textarea 
                   className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-sm font-bold text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-primary-500 transition-all outline-none resize-none mb-6 h-32"
                   placeholder="Type broadcast intelligence here..."
                 />
                 <button className="w-full py-5 bg-primary-600 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-2xl hover:bg-primary-500 transition-all flex items-center justify-center gap-3">
                    <i className="bi bi-broadcast animate-pulse" /> Launch Broadcast Cluster
                 </button>
              </div>

              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                 <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">Cluster Notification Pulse</h3>
                 <div className="space-y-6">
                    <div>
                       <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Node Sync Velocity</span>
                          <span className="text-xs font-black text-slate-900">High</span>
                       </div>
                       <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                             <div key={i} className="flex-1 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
