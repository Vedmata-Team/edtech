'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const doubts = [
  { id: 1, student: 'Arjun Mehta', text: 'Sir, horizontal velocity is constant why?', time: '2m', priority: 'critical', batch: 'JEE-A', subject: 'Kinematics' },
  { id: 2, student: 'Priya S.', text: 'Real vs Virtual image diff?', time: '12m', priority: 'medium', batch: 'NEET-B', subject: 'Optics' },
  { id: 3, student: 'Karan T.', text: 'Carnot cycle efficiency why 1-T2/T1?', time: '21m', priority: 'low', batch: 'JEE-B', subject: 'Heat' },
  { id: 4, student: 'Sonia K.', text: 'Difference between scalar and vector product example?', time: '1h', priority: 'low', batch: 'Boards', subject: 'Vectors' },
]

export default function TeacherDoubtsPage() {
  const [selectedDoubt, setSelectedDoubt] = useState(doubts[0])

  return (
    <DashboardLayout role="teacher" title="Sync Inbox Terminal">
      <div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-120px)] flex flex-col">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                <i className="bi bi-inboxes-fill"></i>
              </span>
              Priority Doubts Hub
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Cognitive sync resolution & student support os</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest shadow-xl">Unresolved (24)</button>
             <button className="px-6 py-2 text-slate-400 hover:text-slate-900 text-[10px] font-extrabold uppercase tracking-widest">Archived (4.2k)</button>
          </div>
        </header>

        <div className="flex-1 grid lg:grid-cols-12 gap-8 overflow-hidden min-h-0">
           {/* Doubts List */}
           <div className="lg:col-span-5 space-y-4 overflow-y-auto pr-2 scrollbar-hide py-1">
              {doubts.map((doubt) => (
                <motion.div
                  key={doubt.id}
                  layout
                  onClick={() => setSelectedDoubt(doubt)}
                  whileHover={{ x: 5 }}
                  className={cn(
                    "p-6 rounded-[32px] border transition-all cursor-pointer group relative overflow-hidden",
                    selectedDoubt.id === doubt.id 
                      ? "bg-slate-900 border-slate-900 text-white shadow-2xl" 
                      : doubt.priority === 'critical' ? "bg-orange-50 border-orange-100" : "bg-white border-slate-100"
                  )}
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-inner", selectedDoubt.id === doubt.id ? "bg-white/10 text-white" : "bg-indigo-100 text-indigo-600")}>
                            {doubt.student[0]}
                         </div>
                         <div>
                            <p className={cn("text-xs font-extrabold tracking-tight", selectedDoubt.id === doubt.id ? "text-white" : "text-slate-900")}>{doubt.student}</p>
                            <p className={cn("text-[9px] font-bold uppercase tracking-widest", selectedDoubt.id === doubt.id ? "text-slate-500" : "text-slate-400")}>{doubt.batch}</p>
                         </div>
                      </div>
                      <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", selectedDoubt.id === doubt.id ? "bg-white/10 text-white" : doubt.priority === 'critical' ? 'bg-orange-200 text-orange-700' : 'bg-slate-100 text-slate-400')}>
                         {doubt.priority}
                      </span>
                   </div>
                   <p className={cn("text-xs font-bold leading-relaxed line-clamp-2", selectedDoubt.id === doubt.id ? "text-slate-300" : "text-slate-500 group-hover:text-slate-900")}>"{doubt.text}"</p>
                   <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                      <p className={cn("text-[9px] font-bold uppercase tracking-widest", selectedDoubt.id === doubt.id ? "text-indigo-400" : "text-indigo-600")}>{doubt.subject}</p>
                      <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{doubt.time} ago</p>
                   </div>
                </motion.div>
              ))}
           </div>

           {/* Resolution Workspace */}
           <div className="lg:col-span-7 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative group">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[22px] flex items-center justify-center text-2xl shadow-inner">
                       <i className="bi bi-chat-dots-fill" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-2">Resolution Console</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Node: {selectedDoubt.student} / {selectedDoubt.subject}</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center">
                       <i className="bi bi-person-badge-fill" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center">
                       <i className="bi bi-graph-up-arrow" />
                    </button>
                 </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30 scrollbar-hide">
                 <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 animate-in fade-in slide-in-from-left duration-500">{selectedDoubt.student[0]}</div>
                       <div className="bg-white p-6 rounded-[32px] rounded-tl-none border border-slate-100 shadow-sm animate-in fade-in slide-in-from-left duration-500">
                          <p className="text-sm font-bold text-slate-900 leading-relaxed">"{selectedDoubt.text}"</p>
                          <div className="mt-4 flex items-center gap-3">
                             <span className="text-[10px] font-bold text-slate-400">{selectedDoubt.subject} Module</span>
                             <span className="text-[10px] font-bold text-slate-400">· Sent at {selectedDoubt.time} ago</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                       <div className="max-w-[80%] bg-indigo-600 text-white p-6 rounded-[32px] rounded-tr-none shadow-xl shadow-indigo-200 animate-in fade-in slide-in-from-right duration-500">
                          <p className="text-sm font-bold leading-relaxed">System Note: You are resolving this for a students from {selectedDoubt.batch}. You can use the whiteboard or a quick video clip.</p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">RS</div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-white">
                 <div className="relative">
                    <textarea 
                      className="w-full h-32 px-6 py-5 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                      placeholder="Type your strategic resolution here..."
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button className="w-10 h-10 rounded-2xl bg-white text-slate-400 hover:text-indigo-600 border border-slate-100 shadow-sm flex items-center justify-center transition-all">
                          <i className="bi bi-mic-fill" />
                       </button>
                       <button className="w-10 h-10 rounded-2xl bg-white text-slate-400 hover:text-indigo-600 border border-slate-100 shadow-sm flex items-center justify-center transition-all">
                          <i className="bi bi-paperclip" />
                       </button>
                    </div>
                    <div className="absolute bottom-4 right-6">
                       <button className="px-8 py-3 bg-slate-950 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                          <i className="bi bi-send-fill" /> Transmit Resolve
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
