'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const experts = [
  { id: 1, name: 'Rahul Sir', subject: 'Physics', status: 'Online', avatar: 'RS', color: 'bg-blue-600' },
  { id: 2, name: 'Priya Ma\'am', subject: 'Mathematics', status: 'In Class', avatar: 'PM', color: 'bg-indigo-600' },
  { id: 3, name: 'Vikram Sir', subject: 'Chemistry', status: 'Online', avatar: 'VS', color: 'bg-emerald-600' },
  { id: 4, name: 'Sneha Ma\'am', subject: 'Biology', status: 'Offline', avatar: 'SM', color: 'bg-red-600' },
]

export default function DoubtsClient() {
  const [activeExpert, setActiveExpert] = useState(experts[0])
  const [message, setMessage] = useState('')

  return (
    <DashboardLayout role="student" title="Intelligence Doubt Hub">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Expert Subject Nodes */}
        <aside className="w-full lg:w-80 flex flex-col gap-4">
           <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-[0.2em] mb-6">Subject Experts</h3>
              <div className="space-y-2">
                 {experts.map((exp) => (
                   <button 
                     key={exp.id}
                     onClick={() => setActiveExpert(exp)}
                     className={cn(
                       "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all group",
                       activeExpert.id === exp.id ? "bg-primary-600 text-white shadow-xl shadow-primary-200 border-primary-500" : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-primary-100"
                     )}
                   >
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shadow-md", activeExpert.id === exp.id ? "bg-white/20" : exp.color)}>
                        {exp.avatar}
                     </div>
                     <div className="text-left flex-1 min-w-0">
                        <p className={cn("text-xs font-extrabold truncate", activeExpert.id === exp.id ? "text-white" : "text-slate-900")}>{exp.name}</p>
                        <p className={cn("text-[9px] font-bold uppercase tracking-wider", activeExpert.id === exp.id ? "text-primary-100" : "text-slate-500")}>{exp.subject}</p>
                     </div>
                     {exp.status === 'Online' && (
                       <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                     )}
                   </button>
                 ))}
              </div>
           </div>

           <div className="mt-auto bg-slate-950 rounded-3xl p-6 text-white border border-slate-900">
              <p className="text-[10px] font-extrabold text-primary-400 uppercase tracking-widest mb-2">System Status</p>
              <p className="text-xs font-bold text-slate-400 leading-relaxed mb-4">92% average doubt resolution rate today.</p>
              <div className="flex items-center gap-2">
                 <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-primary-500" />
                 </div>
                 <span className="text-[10px] font-extrabold">92%</span>
              </div>
           </div>
        </aside>

        {/* Support Terminal */}
        <section className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
           {/* Header */}
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                 <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", activeExpert.color)}>
                    <i className="bi bi-chat-left-text-fill text-xl"></i>
                 </div>
                 <div>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">{activeExpert.name}</h3>
                    <p className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                      {activeExpert.status} · Avg 5m reply
                    </p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center shadow-sm">
                    <i className="bi bi-telephone-fill"></i>
                 </button>
                 <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all flex items-center justify-center shadow-sm">
                    <i className="bi bi-camera-video-fill"></i>
                 </button>
              </div>
           </div>

           {/* Message History */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll bg-slate-50/20">
              <div className="flex flex-col items-center">
                 <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.3em] bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Secure Subject Thread Initiated</span>
              </div>

              {/* Mock Student Message */}
              <div className="flex justify-end pr-4">
                 <div className="max-w-[80%] bg-primary-600 text-white p-5 rounded-[28px] rounded-br-none shadow-xl shadow-primary-100 text-sm font-bold leading-relaxed">
                    Sir, I'm analyzing a Kinematics problem. If a ball is thrown vertically upward with initial velocity 20 m/s, what will be its velocity after 1.5 seconds?
                 </div>
              </div>

              {/* Mock Expert Response */}
              <div className="flex gap-4">
                 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 mt-2", activeExpert.color)}>
                    {activeExpert.avatar}
                 </div>
                 <div className="max-w-[80%] space-y-3">
                    <div className="bg-white border border-slate-100 p-5 rounded-[28px] rounded-bl-none shadow-sm text-sm font-bold leading-relaxed text-slate-700">
                       Great question Arjun! Let's solve this step by step using the kinematic equation: 
                       <br /><br />
                       v = u + at
                       <br /><br />
                       u = 20 m/s (upward)<br />
                       g = -10 m/s² (downward)<br />
                       t = 1.5s
                    </div>
                    <div className="bg-white border border-slate-100 p-5 rounded-[28px] rounded-bl-none shadow-sm text-sm font-bold leading-relaxed text-slate-700">
                       v = 20 + (-10)(1.5)<br />
                       v = 20 - 15 = 5 m/s upward.<br /><br />
                       The ball is still moving upward but decelerating. 
                    </div>
                 </div>
              </div>
           </div>

           {/* Input Terminal */}
           <div className="p-6 bg-white border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-[32px] focus-within:ring-2 focus-within:ring-primary-600 transition-all shadow-inner">
                 <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                    <i className="bi bi-plus-lg"></i>
                 </button>
                 <input 
                   className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-900 placeholder:text-slate-400 px-2"
                   placeholder="Input doubt query..."
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                 />
                 <button 
                   className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-200 hover:bg-primary-500 transition-all btn-glow"
                   disabled={!message.trim()}
                 >
                    <i className="bi bi-send-fill text-sm"></i>
                 </button>
              </div>
              <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest text-center mt-4">System syncing across 4 subject nodes</p>
           </div>
        </section>

      </div>
    </DashboardLayout>
  )
}
