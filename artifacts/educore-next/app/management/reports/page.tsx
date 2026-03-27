'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const reportNodes = [
  { id: 1, name: 'Q1 Financial Performance', type: 'Financial', size: '2.4 MB', date: '21 Mar 2026', icon: 'bi-bank2' },
  { id: 2, name: 'Batch JEE-A Progress Report', type: 'Academic', size: '1.8 MB', date: '20 Mar 2026', icon: 'bi-mortarboard-fill' },
  { id: 3, name: 'Attendance Audit Cluster', type: 'Operational', size: '0.8 MB', date: '19 Mar 2026', icon: 'bi-calendar-check-fill' },
  { id: 4, name: 'Monthly Admission Trends', type: 'Insights', size: '4.2 MB', date: '15 Mar 2026', icon: 'bi-graph-up-arrow' },
]

export default function ManagementReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <DashboardLayout role="management" title="Intelligence Archive Hub">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-white text-slate-900 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-50">
                <i className="bi bi-file-earmark-bar-graph-fill"></i>
              </span>
              Operational Report Terminal
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System performance archives & cluster intelligence os</p>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={cn(
               "px-8 py-4 bg-slate-900 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl transition-all flex items-center gap-3",
               isGenerating ? "bg-slate-700" : "hover:bg-primary-600 hover:shadow-primary-500/20"
            )}
          >
             {isGenerating ? (
               <>
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Processing Logic...
               </>
             ) : (
               <>
                 <i className="bi bi-gear-fill animate-spin-slow"></i>
                 Generate Master Node
               </>
             )}
          </button>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-widest">Archive Metadata Tree</h3>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total: 428 Clusters</div>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-6">
                    {reportNodes.map((r) => (
                      <motion.div 
                        key={r.id}
                        whileHover={{ y: -5 }}
                        className="group/item p-6 bg-slate-50 rounded-[32px] border border-slate-50 hover:bg-slate-900 hover:text-white transition-all cursor-pointer relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 p-6 opacity-5">
                            <i className={cn("bi text-8xl", r.icon)} />
                         </div>
                         <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-500 group-hover/item:bg-white/10 group-hover/item:text-white transition-all mb-4 shadow-sm">
                                  <i className={cn("bi", r.icon)} />
                               </div>
                               <h4 className="text-[14px] font-black tracking-tight mb-2 leading-snug">{r.name}</h4>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.type} Cluster</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-200/50 group-hover/item:border-white/10 flex items-center justify-between">
                               <p className="text-[10px] font-extrabold font-mono opacity-60 uppercase">{r.size}</p>
                               <button className="text-[9px] font-extrabold uppercase tracking-widest group-hover/item:text-primary-400 hover:underline">Download Hub</button>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 rounded-[40px] p-8 text-white relative flex flex-col justify-center overflow-hidden border border-slate-900 group">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <i className="bi bi-lightning-charge-fill text-[80px] text-primary-400" />
                 </div>
                 <h3 className="text-sm font-black uppercase tracking-widest mb-8">Autonomous Reports OS</h3>
                 <div className="space-y-4">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group cursor-pointer hover:bg-white/10 transition-all">
                       <p className="text-[10px] font-extrabold text-primary-400 uppercase tracking-widest mb-2">Sync Protocol Active</p>
                       <p className="text-sm font-bold leading-snug mb-3">Next cluster report for "Batch A" will auto-generate in 12h.</p>
                       <button className="text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-white flex items-center gap-2">
                          <i className="bi bi-clock-history" /> Configure Sync Frequency
                       </button>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group cursor-pointer hover:bg-white/10 transition-all opacity-60">
                       <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest mb-2">Data Integrity: v9.4</p>
                       <p className="text-sm font-bold leading-snug">All financial and academic nodes are synced to cloud.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative group overflow-hidden">
                 <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6 px-1">Predictive Analytics Node</h4>
                 <div className="space-y-6 box-gradient p-5 rounded-2xl">
                    <div>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Regional Cluster Rank</span>
                          <span className="text-xs font-black text-slate-900">#4</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1 }} className="h-full bg-slate-950" />
                       </div>
                    </div>
                    <div>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Revenue Velocity</span>
                          <span className="text-xs font-black text-slate-900">+12.4%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1 }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
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
