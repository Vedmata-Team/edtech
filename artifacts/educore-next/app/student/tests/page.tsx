'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const tests = [
  { id: 1, title: 'JEE Mains Mock Test - 1', subject: 'Full Syllabus', duration: '180m', questions: 75, status: 'ready', difficulty: 'Hard' },
  { id: 2, title: 'Physics: Mechanics Quiz', subject: 'Physics', duration: '45m', questions: 25, status: 'ready', difficulty: 'Medium' },
  { id: 3, title: 'Chemistry Weekly Assessment', subject: 'Chemistry', duration: '60m', questions: 30, status: 'completed', score: '88%', difficulty: 'Medium' },
  { id: 4, title: 'Mathematics: Calculus', subject: 'Maths', duration: '90m', questions: 40, status: 'ready', difficulty: 'Hard' },
]

import DashboardLayout from '@/components/layout/DashboardLayout'

function Icon({ name, className }: { name: string, className?: string }) {
  return <i className={cn("bi", `bi-${name}`, className)}></i>
}

export default function MockTestsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <DashboardLayout role="student" title="Student Mock Test Arena">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Arena Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                <i className="bi bi-cpu-fill text-xl" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Assessment Nodes</h2>
            </div>
            <p className="text-slate-500 font-bold text-sm">System-generated mock tests based on your learning velocity and subject mastery.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
            {['all', 'ready', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2.5 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest transition-all",
                  filter === f ? "bg-primary-600 text-white shadow-xl shadow-primary-500/20" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Test Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.filter(t => filter === 'all' || t.status === filter).map((test) => (
            <motion.div
              layout
              key={test.id}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all relative flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={cn(
                  "px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border",
                  test.difficulty === 'Hard' ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"
                )}>
                  {test.difficulty}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  {test.subject}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-8 leading-tight group-hover:text-primary-600 transition-colors">
                {test.title}
              </h3>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between py-3 border-b border-slate-50">
                   <div className="flex items-center gap-3 text-slate-500">
                     <i className="bi bi-clock-history text-primary-500" />
                     <span className="text-[11px] font-bold uppercase tracking-wider">Duration</span>
                   </div>
                   <span className="text-sm font-extrabold text-slate-900">{test.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-50">
                   <div className="flex items-center gap-3 text-slate-500">
                     <i className="bi bi-layers-fill text-primary-500" />
                     <span className="text-[11px] font-bold uppercase tracking-wider">Volume</span>
                   </div>
                   <span className="text-sm font-extrabold text-slate-900">{test.questions} Items</span>
                </div>
              </div>

              {test.status === 'ready' ? (
                <button className="w-full py-5 bg-slate-950 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-3xl shadow-xl hover:bg-primary-600 transition-all active:scale-95">
                  Authorize & Start
                </button>
              ) : (
                <div className="flex items-center justify-between p-5 bg-emerald-50 rounded-[32px] border border-emerald-100">
                  <div>
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Archived Result</p>
                    <p className="text-2xl font-black text-emerald-700">{test.score}</p>
                  </div>
                  <button className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-all">
                    <i className="bi bi-graph-up-arrow" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Empty/Add Slot */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                <i className="bi bi-plus-lg text-xl" />
             </div>
             <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Request Custom Assessment</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-8 lg:bottom-12 z-50">
         <motion.div 
           initial={{ x: 100 }}
           animate={{ x: 0 }}
           className="bg-slate-950 text-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-6 border border-white/5"
         >
            <div className="w-14 h-14 bg-primary-600 rounded-[20px] flex items-center justify-center text-2xl shadow-2xl shadow-primary-500/20">
              <i className="bi bi-trophy-fill" />
            </div>
            <div>
               <p className="text-[9px] font-extrabold text-primary-400 uppercase tracking-[0.2em] mb-1">Global Leaderboard</p>
               <p className="text-lg font-black tracking-tight leading-none">Top 10% Batch A</p>
               <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                 Last Sync: 2m ago
               </p>
            </div>
         </motion.div>
      </div>
    </DashboardLayout>
  )
}
