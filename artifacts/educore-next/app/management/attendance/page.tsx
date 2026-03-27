'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const attendanceBatches = [
  { id: 1, name: 'JEE-A 2025', total: 42, present: 38, pct: '90%', trend: 'stable' },
  { id: 2, name: 'NEET-A 2026', total: 56, present: 52, pct: '93%', trend: 'up' },
  { id: 3, name: 'Boards High', total: 110, present: 88, pct: '80%', trend: 'down' },
  { id: 4, name: 'JEE-B', total: 38, present: 32, pct: '84%', trend: 'up' },
]

export default function ManagementAttendancePage() {
  const [activeView, setActiveView] = useState('batches')

  return (
    <DashboardLayout role="management" title="Attendance Operational Sync">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-white text-violet-600 rounded-2xl flex items-center justify-center shadow-2xl border border-violet-50">
                <i className="bi bi-calendar-check-fill"></i>
              </span>
              Presence Monitoring Hub
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System biological presence tracking & batch sync os</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button onClick={() => setActiveView('batches')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", activeView === 'batches' ? "bg-violet-600 text-white shadow-xl shadow-violet-500/20" : "text-slate-400 hover:text-slate-900")}>Batch Presence</button>
             <button onClick={() => setActiveView('individual')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", activeView === 'individual' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Individual Trace</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
           <div className="lg:col-span-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                 {attendanceBatches.map((batch) => (
                    <motion.div 
                      key={batch.id} 
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-2xl overflow-hidden relative"
                    >
                       <div className="absolute top-0 right-0 p-8 opacity-5">
                          <i className="bi bi-person-check-fill text-8xl text-violet-600" />
                       </div>
                       <div className="relative z-10">
                          <div className="flex justify-between items-start mb-6">
                             <span className="bg-violet-50 text-violet-600 px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border border-violet-100">{batch.name} Node</span>
                             <div className={cn("w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.3)]", batch.trend === 'up' ? 'bg-emerald-500' : batch.trend === 'down' ? 'bg-red-500' : 'bg-slate-300')} />
                          </div>
                          
                          <div className="flex items-end justify-between mb-8">
                             <div>
                                <p className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">{batch.pct}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{batch.present} / {batch.total} Present</p>
                             </div>
                             <div className="text-right">
                                <span className={cn("text-[10px] font-extrabold uppercase tracking-widest", batch.trend === 'up' ? 'text-emerald-500' : batch.trend === 'down' ? 'text-red-500' : 'text-slate-500')}>
                                   {batch.trend === 'up' ? 'Node Growth' : batch.trend === 'down' ? 'Drop Trace' : 'Stable Batch'}
                                </span>
                             </div>
                          </div>

                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                             <div 
                               className={cn("h-full rounded-full transition-all duration-1000", batch.trend === 'down' ? 'bg-orange-500' : 'bg-violet-600')} 
                               style={{ width: batch.pct }} 
                             />
                          </div>
                       </div>
                    </motion.div>
                 ))}
                 
                 <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-[20px] flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <i className="bi bi-plus-lg text-xl" />
                    </div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Connect Presence Reader</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 rounded-[40px] p-8 text-white relative flex flex-col justify-center overflow-hidden border border-slate-900 group">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <i className="bi bi-shield-lock-fill text-[80px] text-violet-400" />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest mb-8">Node Lockdown Status</h3>
                 <div className="space-y-6">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group cursor-pointer hover:bg-white/10 transition-all">
                       <p className="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-2">Automated Alert OS</p>
                       <p className="text-sm font-bold leading-snug mb-3 text-slate-100">8 students absent in JEE-A without prior log.</p>
                       <button className="text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-400 flex items-center gap-2">
                          <i className="bi bi-send-fill" /> Transmit Parent Alert
                       </button>
                    </div>
                 </div>
                 <button className="w-full mt-10 py-4 bg-violet-600 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-2xl hover:bg-violet-500 transition-all flex items-center justify-center gap-2">
                    <i className="bi bi-broadcast" /> Global Broadcast
                 </button>
              </div>

              <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative group overflow-hidden">
                 <div className="absolute inset-0 bg-violet-600 opacity-0 group-hover:opacity-[0.02] transition-opacity" />
                 <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">Attendance Intelligence</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-lg"><i className="bi bi-lightning-charge" /></div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Peak Presence Node</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Mon-Tue Cluster @ 98%</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-lg"><i className="bi bi-graph-down" /></div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Drop Warning Node</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Friday Cluster @ 82%</p>
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
