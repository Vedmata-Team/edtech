'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const chapters = [
  { id: 1, title: 'Introduction to Kinematics', duration: '12:30', status: 'completed' },
  { id: 2, title: 'Distance vs Displacement', duration: '18:45', status: 'completed' },
  { id: 3, title: 'Speed, Velocity, Acceleration', duration: '22:10', status: 'playing' },
  { id: 4, title: 'Equations of Motion', duration: '28:50', status: 'locked' },
  { id: 5, title: 'Projectile Motion', duration: '31:20', status: 'locked' },
  { id: 6, title: 'Relative Motion', duration: '19:40', status: 'locked' },
]

export default function VideoClient() {
  const [activeChapter, setActiveChapter] = useState(chapters[2])

  return (
    <DashboardLayout role="student" title="Learning Node Terminal">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 pb-12">
        
        {/* Prime Video Terminal */}
        <div className="lg:col-span-9 space-y-6">
           <div className="bg-slate-950 rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-900 group">
              {/* Media Interface Layer */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                 <div className="absolute inset-x-0 top-0 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-black text-white uppercase tracking-widest bg-primary-600/20 border border-primary-500/30 px-3 py-1.5 rounded-lg backdrop-blur-md">Physics — Unit 1: {activeChapter.title}</p>
                    <div className="flex bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 gap-2">
                       <i className="bi bi-clock-history text-xs text-white"></i>
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Resume at 14:22</span>
                    </div>
                 </div>

                 {/* Playback Control Mask */}
                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/50 btn-glow animate-pulse-glow"
                 >
                    <i className="bi bi-play-fill text-4xl ml-1"></i>
                 </motion.button>
                 
                 {/* Timeline Logic Panel */}
                 <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-white font-mono">14:22</span>
                       <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group/line">
                          <div className="w-[65%] h-full bg-primary-500 relative">
                             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border border-primary-600 opacity-0 group-hover/line:opacity-100 transition-opacity" />
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-white font-mono">22:10</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <i className="bi bi-skip-start-fill text-xl text-white hover:text-primary-400 transition-colors"></i>
                          <i className="bi bi-play-fill text-3xl text-white hover:text-primary-400 transition-colors"></i>
                          <i className="bi bi-skip-end-fill text-xl text-white hover:text-primary-400 transition-colors"></i>
                          <div className="flex items-center gap-2 group/volume ml-4">
                             <i className="bi bi-volume-up-fill text-xl text-white"></i>
                             <div className="w-0 overflow-hidden group-hover/volume:w-20 h-1 bg-white/20 rounded-full transition-all">
                               <div className="w-3/4 h-full bg-white" />
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest hover:text-primary-400">1.0x Node</span>
                          <i className="bi bi-pip-fill text-xl text-white hover:text-primary-400"></i>
                          <i className="bi bi-gear-fill text-xl text-white hover:text-primary-400 transition-transform hover:rotate-45"></i>
                          <i className="bi bi-fullscreen text-xl text-white hover:text-primary-400 transition-transform"></i>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Metadata Hub */}
           <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start gap-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-200 shadow-sm">Kinematics Series</span>
                    <span className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-100">JEE Core Path</span>
                 </div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">{activeChapter.title}</h1>
                 <p className="text-sm font-bold text-slate-500 max-w-xl leading-relaxed">System analyzing lecture content: Physics faculty session on translational and rotational motion parameters. Session conducted by Rahul Sir.</p>
                 <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-full animate-float"></div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Rahul Sir</p>
                          <p className="text-[10px] font-bold text-slate-400">Physics Faculty</p>
                       </div>
                    </div>
                    <div className="w-[1px] h-8 bg-slate-100" />
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Global Engagement</p>
                        <p className="text-xs font-black text-slate-900">4,280 Views</p>
                    </div>
                 </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full sm:w-auto min-w-[200px]">
                 <button className="flex items-center justify-center gap-3 w-full py-4 bg-primary-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-100 btn-glow hover:bg-primary-500 transition-all">
                    <i className="bi bi-question-diamond-fill text-lg"></i>
                    Initiate Doubt
                 </button>
                 <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl hover:bg-white hover:border-primary-600 hover:text-primary-600 transition-all">
                       <i className="bi bi-bookmarks-fill"></i>
                       <span className="text-[10px] font-black tracking-widest uppercase">Save</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl hover:bg-white hover:border-emerald-600 hover:text-emerald-600 transition-all">
                       <i className="bi bi-cloud-arrow-down-fill"></i>
                       <span className="text-[10px] font-black tracking-widest uppercase">Offline</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Learning Queue Sidebar */}
        <div className="lg:col-span-3 space-y-6">
           <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Course Registry</h3>
                    <span className="text-[10px] font-black bg-white border border-slate-100 px-2 py-1 rounded-lg">2/6 Done</span>
                 </div>
                 <div className="h-1 bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div className="w-1/3 h-full bg-primary-600" />
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                 {chapters.map((chap, i) => (
                   <button 
                     key={chap.id}
                     onClick={() => setActiveChapter(chap)}
                     disabled={chap.status === 'locked'}
                     className={cn(
                       "w-full p-5 border-b border-slate-50 flex items-start gap-4 transition-all group",
                       chap.status === 'playing' ? "bg-primary-50/50" : chap.status === 'locked' ? "opacity-50 grayscale cursor-not-allowed" : "hover:bg-slate-50"
                     )}
                   >
                     <div className={cn(
                       "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                       chap.status === 'playing' ? "bg-primary-600 text-white" : chap.status === 'completed' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                     )}>
                        {chap.status === 'playing' ? <i className="bi bi-play-fill"></i> : chap.status === 'completed' ? <i className="bi bi-check-lg"></i> : <i className="bi bi-lock-fill text-xs"></i>}
                     </div>
                     <div className="text-left flex-1">
                        <p className={cn("text-xs font-black mb-1 leading-tight", chap.status === 'playing' ? "text-primary-700" : "text-slate-900")}>{chap.title}</p>
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                           <span>{chap.duration}</span>
                           <span className="uppercase tracking-widest">{chap.status}</span>
                        </div>
                     </div>
                   </button>
                 ))}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                 <button className="w-full py-4 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 shadow-xl transition-all">View All Modules</button>
              </div>
           </section>

           <div className="bg-slate-950 rounded-[40px] p-8 text-white border border-slate-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <i className="bi bi-lightning-charge-fill text-7xl text-primary-400"></i>
              </div>
              <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-4">Autonomous UpNext Hub</p>
              <div className="space-y-4">
                 {[
                   { title: "Newton's Laws", sub: "Physics · 34m" },
                   { title: "Work, Energy, Power", sub: "Physics · 28m" }
                 ].map((v, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="w-16 h-10 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                         <i className="bi bi-play-fill text-primary-400"></i>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-100 group-hover:text-primary-400 transition-colors">{v.title}</p>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{v.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
