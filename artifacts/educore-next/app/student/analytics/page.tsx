'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import DashboardLayout from '@/components/layout/DashboardLayout'

function Icon({ name, className }: { name: string, className?: string }) {
  return <i className={cn("bi", `bi-${name}`, className)}></i>
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout role="student" title="Student Performance Pulse">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
             <span className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
                <Icon name="bar-graph" />
             </span>
             Performance Pulse
          </h1>
          <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Global Analytics & Predictive Growth Hub</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
           {[
             { label: 'Overall Percentile', val: '98.4%', change: '+1.2%', icon: 'percent' },
             { label: 'Total Test Hours', val: '124.5', change: '+12%', icon: 'clock' },
             { label: 'Active Streak', val: '14 Days', change: 'Personal Best', icon: 'fire' },
             { label: 'Doubt Solver Res', val: '100%', change: 'All Verified', icon: 'patch-check' },
           ].map((s) => (
             <div key={s.label} className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-50 text-primary-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                   <Icon name={s.icon} />
                </div>
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{s.val}</p>
                <p className={cn("text-[10px] font-extrabold uppercase tracking-widest mt-2 px-2 py-0.5 rounded-lg", s.change.includes('+') ? "bg-emerald-50 text-emerald-600" : "bg-primary-50 text-primary-600")}>{s.change}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-8 uppercase tracking-widest text-[14px]">Subject Velocity</h3>
              <div className="space-y-6">
                 {[
                   { sub: 'Physics', val: 85, color: 'bg-blue-600' },
                   { sub: 'Chemistry', val: 92, color: 'bg-emerald-600' },
                   { sub: 'Mathematics', val: 78, color: 'bg-primary-600' },
                 ].map((s) => (
                   <div key={s.sub}>
                     <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        <span>{s.sub}</span>
                        <span>{s.val}% Velocity</span>
                     </div>
                     <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${s.val}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn("h-full rounded-full shadow-lg", s.color)} 
                        />
                     </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 bg-slate-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden group">
              <Icon name="cpu" className="absolute top-10 right-10 text-7xl text-white opacity-5 group-hover:scale-125 transition-transform" />
              <div className="relative z-10">
                 <h3 className="text-xl font-extrabold uppercase tracking-widest text-[13px] mb-8">AI Study Prediction</h3>
                 <p className="text-lg font-bold text-slate-400 leading-relaxed mb-8">Based on your recent test velocity, you are on track to exceed your target JEE Percentile by <span className="text-emerald-400">2.4%</span>.</p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
                    <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Focus Point</p>
                    <p className="text-sm font-extrabold">Advanced Integration (Maths) requires 20% more velocity.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
