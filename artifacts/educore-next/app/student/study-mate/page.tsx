'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

import DashboardLayout from '@/components/layout/DashboardLayout'

function Icon({ name, className }: { name: string, className?: string }) {
  return <i className={cn("bi", `bi-${name}`, className)}></i>
}

export default function StudyMatePage() {
  const [activeTab, setActiveTab] = useState('planner')

  return (
    <DashboardLayout role="student" title="Student Study Mate Engine">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
             <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Icon name="robot" />
             </span>
             Study Mate Engine
          </h1>
          <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">Personalized Academic Intelligence & Dynamic Resource Hub</p>
        </header>

        <div className="flex bg-white p-2 rounded-[28px] shadow-sm border border-slate-200 mb-12 w-fit mx-auto lg:mx-0">
           {[
             { id: 'planner', label: 'Smart Planner', icon: 'calendar-week-fill' },
             { id: 'resources', label: 'Flashcards', icon: 'layers-fill' },
             { id: 'mindmaps', label: 'AI Mind-Maps', icon: 'diagram-3-fill' }
           ].map((t) => (
             <button
               key={t.id}
               onClick={() => setActiveTab(t.id)}
               className={cn(
                 "flex items-center gap-2 px-8 py-3 rounded-[20px] text-[10px] font-extrabold uppercase tracking-widest transition-all",
                 activeTab === t.id ? "bg-indigo-600 text-white shadow-2xl" : "text-slate-400 hover:text-slate-900"
               )}
             >
               <Icon name={t.icon} />
               <span className="hidden sm:inline">{t.label}</span>
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'planner' && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-8 space-y-6">
                 {[
                   { time: '09:00 AM', label: 'Physics: Electrostatics Practice', type: 'practice', status: 'completed' },
                   { time: '11:00 AM', label: 'Chemistry: Organic Reaction Mechanisms', type: 'revision', status: 'active' },
                   { time: '02:00 PM', label: 'Calculus Mock Drill (Part A)', type: 'test', status: 'pending' },
                   { time: '04:00 PM', label: 'Doubt Solving Session (Live)', type: 'session', status: 'pending' },
                 ].map((s) => (
                   <div key={s.time} className="flex gap-6 group">
                      <div className="flex flex-col items-center pt-2">
                         <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{s.time}</div>
                         <div className="flex-1 w-px bg-slate-200 my-2" />
                      </div>
                      <div className={cn(
                        "flex-1 p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-indigo-100 bg-white",
                        s.status === 'active' && "ring-2 ring-indigo-600 ring-offset-2"
                      )}>
                        <p className="text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">{s.type}</p>
                        <p className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors uppercase leading-tight mb-4">{s.label}</p>
                        {s.status === 'active' ? (
                          <div className="flex items-center gap-4">
                             <button className="flex-1 py-3 bg-indigo-600 text-white font-extrabold uppercase tracking-widest text-[9px] rounded-xl shadow-lg shadow-indigo-200">Continue Session</button>
                             <div className="px-4 py-3 bg-indigo-50 text-indigo-600 font-extrabold text-[9px] uppercase tracking-widest rounded-xl">25m Left</div>
                          </div>
                        ) : (
                          <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                             <Icon name={s.status === 'completed' ? 'check-circle-fill' : 'circle'} />
                             {s.status}
                          </div>
                        )}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="lg:col-span-4 space-y-8">
                 <div className="p-8 bg-slate-900 text-white rounded-[40px] shadow-2xl">
                    <h4 className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest mb-6">EduCore AI Advice</h4>
                    <p className="text-sm font-bold text-slate-400 leading-relaxed mb-8">You spend most of your energy on Physics in the morning. I Suggest moving High-Intensity Mathematics to the 09:00 AM slot tomorrow to maximize velocity.</p>
                    <button className="w-full py-4 border border-white/20 text-white font-extrabold uppercase tracking-widest text-[9px] rounded-2xl hover:bg-white/10 transition-all">Optimization Settings</button>
                 </div>
                 <div className="p-8 bg-indigo-600 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
                    <Icon name="lightning-charge-fill" className="absolute -bottom-4 -right-4 text-7xl opacity-20" />
                    <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1">Weekly Streak</p>
                    <p className="text-3xl font-extrabold mb-4">Day 14</p>
                    <p className="text-xs font-bold text-white/60">You're in the top 1% of consistent students in Bharat.</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
