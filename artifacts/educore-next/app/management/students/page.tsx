'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const studentNodes = [
  { id: 1, name: 'Arjun Mehta', batch: 'JEE-A 2025', fees: '₹12,400', attend: '96%', status: 'active', mobile: '9506933715' },
  { id: 2, name: 'Priya Sharma', batch: 'NEET-B 2026', fees: 'Paid', attend: '98%', status: 'active', mobile: '9506933715' },
  { id: 3, name: 'Karan Thapar', batch: 'JEE-B', fees: '₹8,900', attend: '82%', status: 'blocked', mobile: '9506933715' },
  { id: 4, name: 'Sonia Khan', batch: 'Boards', fees: 'Paid', attend: '91%', status: 'active', mobile: '9506933715' },
  { id: 5, name: 'Rahul V.', batch: 'JEE-A 2025', fees: '₹15,000', attend: '88%', status: 'active', mobile: '9506933715' },
]

export default function ManagementStudentsPage() {
  const [activeTab, setActiveTab] = useState('active')

  return (
    <DashboardLayout role="management" title="Operational Intelligence">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-120px)] overflow-hidden">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                <i className="bi bi-mortarboard-fill"></i>
              </span>
              Global Student Node Repository
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System identity & operational access management hub</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button onClick={() => setActiveTab('active')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", activeTab === 'active' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Active (1,248)</button>
             <button onClick={() => setActiveTab('defaulter')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", activeTab === 'defaulter' ? "bg-red-600 text-white shadow-xl shadow-red-500/20" : "text-slate-400 hover:text-red-600")}>Defaulters (48)</button>
          </div>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-hide py-2">
           <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                 <tr className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <th className="px-10 pb-4">Principal Identity</th>
                    <th className="px-6 pb-4">Operational Batch</th>
                    <th className="px-6 pb-4">Fee Protocol</th>
                    <th className="px-6 pb-4">Attendance Stream</th>
                    <th className="px-6 pb-4">Security Level</th>
                    <th className="px-10 pb-4 text-right">Admin Terminal</th>
                 </tr>
              </thead>
              <tbody className="mt-4">
                 {studentNodes.map((s) => (
                    <motion.tr 
                      key={s.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group bg-white hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer relative"
                    >
                       <td className="px-10 py-6 rounded-l-[32px] border-l border-y border-slate-50 group-hover:border-slate-900">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-2xl transition-transform group-hover:rotate-6">
                                {s.name[0]}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">{s.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">UID: #{s.id + 5000}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-slate-900">
                          <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest">{s.batch}</p>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-slate-900">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest",
                            s.fees === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                          )}>
                             {s.fees}
                          </span>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-slate-900">
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black text-slate-900">{s.attend}</span>
                             <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 rounded-full" style={{ width: s.attend }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 border-y border-slate-50 group-hover:border-slate-900">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest",
                            s.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          )}>
                             {s.status === 'active' ? 'Operational' : 'Access Restricted'}
                          </span>
                       </td>
                       <td className="px-10 py-6 text-right rounded-r-[32px] border-r border-y border-slate-50 group-hover:border-slate-900">
                          <div className="flex items-center justify-end gap-2 pr-0 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-10 h-10 rounded-xl bg-slate-950 text-white shadow-xl flex items-center justify-center transition-all hover:bg-black">
                                <i className="bi bi-eye-fill text-lg" />
                             </button>
                             <button className="w-10 h-10 rounded-xl bg-white text-emerald-600 border border-slate-100 hover:bg-emerald-600 hover:text-white shadow-sm flex items-center justify-center transition-all">
                                <i className="bi bi-currency-dollar text-lg" />
                             </button>
                          </div>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>

        <footer className="mt-8 grid md:grid-cols-2 gap-6 p-8 bg-slate-50 border border-slate-200 rounded-[40px] overflow-hidden relative group">
           <div className="relative z-10">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.3em] mb-4">Bulk Identity Operations</p>
              <div className="flex flex-wrap gap-4">
                 <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:bg-slate-900 hover:text-white transition-all">
                    Initiate Global Audit
                 </button>
                 <button className="px-8 py-4 bg-slate-900 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:bg-black transition-all">
                    Deploy New Node <i className="bi bi-plus-lg ml-2" />
                 </button>
              </div>
           </div>
           
           <div className="flex items-center justify-end gap-10">
              <div className="text-right">
                 <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Batch Retention</p>
                 <p className="text-3xl font-black text-emerald-600">95.4%</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Pulse Sync</p>
                 <p className="text-3xl font-black text-slate-900">v2.4</p>
              </div>
           </div>
        </footer>
      </div>
    </DashboardLayout>
  )
}
