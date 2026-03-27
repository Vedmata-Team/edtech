'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const sessions = [
  { id: 1, title: 'JEE Advanced: Rotational Dynamics', batch: 'JEE-A 2025', time: 'LIVE NOW', students: 42, status: 'live' },
  { id: 2, title: 'NEET: Organic Chemistry basics', batch: 'NEET-B 2026', time: 'Next: 04:30 PM', students: 0, status: 'scheduled' },
  { id: 3, title: 'Class 12: Wave Optics MCQ', batch: 'Boards-A', time: 'Tomorrow 10:00 AM', students: 0, status: 'scheduled' },
]

export default function TeacherLivePage() {
  return (
    <DashboardLayout role="teacher" title="Faculty Live Studio">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                <i className="bi bi-broadcast"></i>
              </span>
              Live Session Control
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Autonomous Sync & Broadcast Terminal</p>
          </div>
          <button className="px-8 py-4 bg-indigo-600 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-3">
             <i className="bi bi-plus-lg"></i>
             Schedule New Node
          </button>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Active Live Session */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden group border border-slate-900">
               <div className="absolute top-0 right-0 p-8">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
               </div>
               <div className="relative z-10">
                  <p className="text-indigo-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4">Current Active Node</p>
                  <h2 className="text-3xl font-black mb-6 leading-tight">JEE Advanced: Rotational Dynamics<br /><span className="text-slate-500">Torque & Angular Momentum</span></h2>
                  
                  <div className="flex flex-wrap items-center gap-8 mb-10">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400">
                           <i className="bi bi-people-fill text-xl" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Live Students</p>
                           <p className="text-lg font-black">42 Connected</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                           <i className="bi bi-clock-fill text-xl" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Elapsed Time</p>
                           <p className="text-lg font-black">45:12</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <button className="px-8 py-4 bg-white text-slate-900 font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-100 transition-all">
                        Open Studio Terminal
                     </button>
                     <button className="px-8 py-4 bg-red-600/20 border border-red-600/30 text-red-500 font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                        Terminate Session
                     </button>
                  </div>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                     <i className="bi bi-chat-square-dots-fill text-xl" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-2">Engage Chat</h4>
                  <p className="text-xs text-slate-500 font-bold mb-6">4 unread priority questions from top ranking students.</p>
                  <button className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest hover:underline">Launch Inbox Hub</button>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                     <i className="bi bi-hand-thumbs-up-fill text-xl" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-2">Node Polling</h4>
                  <p className="text-xs text-slate-500 font-bold mb-6">Create real-time feedback polls to check topic mastery.</p>
                  <button className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest hover:underline">Initiate Fast-Poll</button>
               </div>
            </div>
          </div>

          {/* Queued Sessions */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 h-full">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-8 pb-4 border-b border-slate-50">Instructional Queue</h3>
                <div className="space-y-6">
                   {sessions.filter(s => s.status !== 'live').map(s => (
                     <div key={s.id} className="group relative pl-6 border-l-2 border-slate-100 hover:border-indigo-500 transition-colors">
                        <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-colors" />
                        <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">{s.time}</p>
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">{s.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           <span>{s.batch}</span>
                           <span className="w-1 h-1 rounded-full bg-slate-200" />
                           <span className="flex items-center gap-1"><i className="bi bi-people" /> 0 Reg</span>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 bg-slate-50 rounded-3xl p-6 border border-slate-100">
                   <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 text-center">System Log</p>
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Encoder Status: Active
                      </div>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Network Sync: Latency 14ms
                      </div>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500">
                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Last Recorded: 2h ago
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
