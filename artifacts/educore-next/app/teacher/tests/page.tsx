'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function TeacherTestsPage() {
  const [activeTab, setActiveTab] = useState('create')

  return (
    <DashboardLayout role="teacher" title="Assessment OS">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                <i className="bi bi-file-earmark-plus-fill"></i>
              </span>
              Test Generation Hub
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Cognitive Difficulty Engine & Question Lab</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            {['create', 'question-bank', 'evaluation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-indigo-600 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
                )}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-8">
             <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-magic" />
                   </div>
                   <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-[15px]">Smart Test Builder</h2>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Node Title</label>
                         <input className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none" placeholder="Ex: JEE Mains 2025 Mock 04" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Instructional Subject</label>
                         <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-500 transition-all outline-none">
                            <option>Physics Advanced</option>
                            <option>Mathematics Complex</option>
                            <option>Organic Chemistry</option>
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-6">
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer text-center group/item">
                         <i className="bi bi-layers-fill text-2xl text-slate-300 group-hover/item:text-indigo-500 transition-colors mb-2" />
                         <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">30 Questions</p>
                         <p className="text-sm font-bold text-slate-900 mt-1">Light Set</p>
                      </div>
                      <div className="p-6 bg-indigo-600 border border-indigo-500 rounded-3xl text-center shadow-xl shadow-indigo-100">
                         <i className="bi bi-stack text-2xl text-white mb-2" />
                         <p className="text-[10px] font-extrabold text-indigo-200 uppercase tracking-widest">60 Questions</p>
                         <p className="text-sm font-bold text-white mt-1">Standard Set</p>
                      </div>
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer text-center group/item">
                         <i className="bi bi-box-fill text-2xl text-slate-300 group-hover/item:text-indigo-500 transition-colors mb-2" />
                         <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">120 Questions</p>
                         <p className="text-sm font-bold text-slate-900 mt-1">Grand Set</p>
                      </div>
                   </div>

                   <div className="p-8 border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-200 transition-all cursor-pointer group/upload">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover/upload:scale-110 transition-transform">
                        <i className="bi bi-cloud-arrow-up-fill text-2xl" />
                      </div>
                      <p className="text-xs font-extrabold uppercase tracking-widest mb-1">Upload Bulk Excel/PDF</p>
                      <p className="text-[10px] font-bold opacity-60">System parses and categorizes questions automatically.</p>
                   </div>

                   <button className="w-full py-5 bg-slate-900 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-xl hover:bg-indigo-600 transition-all active:scale-95">
                      Authorize & Generate Node
                   </button>
                </div>
             </div>

             <div className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <i className="bi bi-stars" />
                   </div>
                   <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">AI Suggestion: Topic "Electrostatics" has 40% error rate in Batch A. Include it in next test?</p>
                </div>
                <button className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest hover:underline">Apply Recommendation</button>
             </div>
          </div>

          {/* Right Sidebar Stats */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden group border border-slate-900">
                <h3 className="text-sm font-black uppercase tracking-widest mb-8">Node Summary</h3>
                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Tests</span>
                      <span className="text-lg font-black tracking-tight">24 Nodes</span>
                   </div>
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Question Count</span>
                      <span className="text-lg font-black tracking-tight">4,821 Items</span>
                   </div>
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Batches Covered</span>
                      <span className="text-lg font-black tracking-tight">12 Groups</span>
                   </div>
                </div>
                
                <div className="mt-12 group/card relative p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
                   <p className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest mb-2">Grand Assessment Looming</p>
                   <p className="text-sm font-bold text-white leading-snug mb-4">Regional Mock 2025 Tier-1 is scheduled for Sunday 9am.</p>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Status: Awaiting Seal</span>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm group">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-6">Recent Reports</h3>
                <div className="space-y-4">
                   {[
                     { name: 'Rotational 01', score: '64%', batch: 'JEE-A' },
                     { name: 'Physics Unit 4', score: '78%', batch: 'Boards' },
                   ].map((r, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors cursor-pointer">
                        <div>
                           <p className="text-[10px] font-extrabold text-slate-900 tracking-tight">{r.name}</p>
                           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{r.batch}</p>
                        </div>
                        <span className="text-xs font-black text-indigo-600">{r.score}</span>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-6 py-3 border border-slate-100 text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">Full Archives</button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
