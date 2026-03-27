'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const students = [
  { id: 1, name: 'Arjun Mehta', batch: 'JEE-A 2025', rank: 'AIR 420', attend: '96%', performance: 'Peak', status: 'online' },
  { id: 2, name: 'Priya Sharma', batch: 'NEET-B 2026', rank: 'AIR 12', attend: '98%', performance: 'Critical', status: 'offline' },
  { id: 3, name: 'Karan Thapar', batch: 'JEE-B', rank: 'AIR 8.2k', attend: '82%', performance: 'Average', status: 'online' },
  { id: 4, name: 'Sonia Khan', batch: 'Boards', rank: '92%', attend: '91%', performance: 'Rising', status: 'online' },
  { id: 5, name: 'Rahul V.', batch: 'JEE-A 2025', rank: 'AIR 1.1k', attend: '88%', performance: 'Peak', status: 'offline' },
  { id: 6, name: 'Neha J.', batch: 'NEET-A', rank: 'AIR 45', attend: '99%', performance: 'Peak', status: 'online' },
]

export default function TeacherStudentsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <DashboardLayout role="teacher" title="Student Directory OS">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-120px)] overflow-hidden">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                <i className="bi bi-people-fill"></i>
              </span>
              Batch Management Hub
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System behavioral nodes & student performance tracking</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button onClick={() => setFilter('all')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", filter === 'all' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Global (428)</button>
             <button onClick={() => setFilter('online')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", filter === 'online' ? "bg-emerald-600 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Online (56)</button>
          </div>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-hide py-2">
           <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                 <tr className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <th className="px-10 pb-4">Student Node</th>
                    <th className="px-6 pb-4">Operational Batch</th>
                    <th className="px-6 pb-4">Metric / Rank</th>
                    <th className="px-6 pb-4">Attendance Rate</th>
                    <th className="px-6 pb-4">Performance Pulse</th>
                    <th className="px-10 pb-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="mt-4">
                 {students.filter(s => filter === 'all' || s.status === filter).map((s) => (
                    <motion.tr 
                      key={s.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer relative"
                    >
                       <td className="px-10 py-6 rounded-l-[32px] border-l border-y border-slate-50 group-hover:border-indigo-100">
                          <div className="flex items-center gap-4">
                             <div className="relative">
                                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner">
                                   {s.name[0]}
                                </div>
                                <div className={cn("absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white", s.status === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300')} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">{s.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">UID: #{s.id + 1024}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-indigo-100">
                          <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest">{s.batch}</p>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-indigo-100">
                          <p className="text-xs font-black text-slate-900 tracking-tight">{s.rank}</p>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-indigo-100">
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black text-slate-900">{s.attend}</span>
                             <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: s.attend }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-indigo-100">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest",
                            s.performance === 'Peak' ? 'bg-emerald-50 text-emerald-600' : 
                            s.performance === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                          )}>
                             {s.performance} Axis
                          </span>
                       </td>
                       <td className="px-10 py-6 text-right rounded-r-[32px] border-r border-y border-slate-50 group-hover:border-indigo-100">
                          <div className="flex items-center justify-end gap-2 pr-0 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-10 h-10 rounded-xl bg-white text-indigo-600 border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm flex items-center justify-center transition-all">
                                <i className="bi bi-person-lines-fill text-lg" />
                             </button>
                             <button className="w-10 h-10 rounded-xl bg-white text-emerald-600 border border-slate-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm flex items-center justify-center transition-all">
                                <i className="bi bi-whatsapp text-lg" />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>

        <footer className="mt-8 flex items-center justify-between p-8 bg-slate-900 rounded-[40px] text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="bi bi-hdd-network-fill text-[120px]" />
           </div>
           <div className="relative z-10">
              <p className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.3em] mb-2">Global Batch Control</p>
              <h4 className="text-xl font-black">428 Student Nodes Managed Locally</h4>
              <p className="text-slate-400 text-xs font-bold mt-1">Direct communication with all parents and students active.</p>
           </div>
           <div className="relative z-10 flex gap-4">
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-white/10 transition-all">
                 Download Audit Log
              </button>
              <button className="px-8 py-4 bg-indigo-600 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:bg-indigo-500 transition-all shadow-indigo-500/20">
                 Sync New Batch
              </button>
           </div>
        </footer>
      </div>
    </DashboardLayout>
  )
}
