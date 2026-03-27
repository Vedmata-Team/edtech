'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const collections = [
  { id: 101, name: 'Arjun Mehta', amount: '₹12,400', date: '21 Mar 2026', method: 'UPI', type: 'Tuition Fee' },
  { id: 102, name: 'Priya Sharma', amount: '₹15,000', date: '20 Mar 2026', method: 'Cash', type: 'Admission' },
  { id: 103, name: 'Karan Thapar', amount: '₹8,900', date: '18 Mar 2026', method: 'Card', type: 'Test Series' },
  { id: 104, name: 'Sonia Khan', amount: '₹12,400', date: '15 Mar 2026', method: 'Net Banking', type: 'Tuition Fee' },
]

export default function ManagementFeesPage() {
  const [feeFilter, setFeeFilter] = useState('collected')

  return (
    <DashboardLayout role="management" title="Financial OS">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-50">
                <i className="bi bi-bank2"></i>
              </span>
              Revenue Collection Hub
            </h1>
            <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System automated financial sync & ledger tracking os</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             <button onClick={() => setFeeFilter('collected')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", feeFilter === 'collected' ? "bg-emerald-600 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}>Collected (₹14.2L)</button>
             <button onClick={() => setFeeFilter('pending')} className={cn("px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all", feeFilter === 'pending' ? "bg-red-600 text-white shadow-xl" : "text-slate-400 hover:text-red-900")}>Awaiting (₹1.8L)</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest text-[14px]">Latest Collection Matrix</h3>
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center"><i className="bi bi-funnel-fill text-xs" /></div>
                 </div>
                 
                 <div className="space-y-4">
                    {collections.map((c) => (
                      <div key={c.id} className="grid grid-cols-4 items-center p-5 bg-slate-50 rounded-3xl border border-slate-50 hover:bg-slate-900 hover:text-white transition-all group/item">
                         <div className="col-span-1">
                            <p className="text-xs font-black tracking-tight">{c.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover/item:text-slate-500">ID: #{c.id}</p>
                         </div>
                         <div className="col-span-1">
                            <p className="text-[10px] font-extrabold uppercase tracking-widest">{c.type}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.method}</p>
                         </div>
                         <div className="col-span-1 text-center font-mono text-[10px] uppercase font-bold text-slate-400">{c.date}</div>
                         <div className="col-span-1 text-right">
                            <p className="text-sm font-black text-emerald-600 group-hover/item:text-emerald-400 leading-none">{c.amount}</p>
                            <span className="text-[8px] font-bold uppercase tracking-widest group-hover/item:text-emerald-500">Cleared Node</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group border border-slate-800">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <i className="bi bi-safe2-fill text-[120px] text-emerald-500" />
                 </div>
                 <p className="text-emerald-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4">Regional Collection Target</p>
                 <h2 className="text-4xl font-black mb-1">₹6.4L <span className="text-slate-500 text-sm font-bold">/ ₹10L</span></h2>
                 <p className="text-slate-400 text-xs font-bold mb-10">System projecting 100% target match at current velocity.</p>

                 <div className="space-y-4">
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full w-[64%]" />
                    </div>
                    <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest">
                       <span className="text-emerald-500">Node Cleared</span>
                       <span className="text-slate-500">Waiting for Sync</span>
                    </div>
                 </div>
                 
                 <button className="w-full mt-10 py-5 bg-emerald-600 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-[24px] shadow-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
                    <i className="bi bi-cloud-arrow-up-fill" /> Transmit Ledger
                 </button>
              </div>

              <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm group">
                 <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-6">Financial Intelligence Action</h3>
                 <div className="space-y-4">
                    <button className="w-full flex items-center gap-3 p-3 bg-slate-50 border border-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group/btn">
                       <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 group-hover/btn:bg-indigo-600 group-hover/btn:text-white flex items-center justify-center transition-all">
                          <i className="bi bi-envelope-check-fill" />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black tracking-tight">Bulk Identity Receipts</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Transmit Digital Proofs</p>
                       </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-slate-50 border border-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group/btn">
                       <div className="w-10 h-10 rounded-xl bg-white text-orange-600 group-hover/btn:bg-orange-600 group-hover/btn:text-white flex items-center justify-center transition-all">
                          <i className="bi bi-lightning-charge-fill" />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black tracking-tight">One-Click Reminders</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Launch WhatsApp Protocol</p>
                       </div>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 bg-slate-50 border border-slate-200 rounded-[40px] flex items-center justify-between overflow-hidden relative group">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-950 group-hover:text-white transition-all">
                 <i className="bi bi-file-earmark-bar-graph-fill text-xl" />
              </div>
              <div>
                 <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Financial Performance Audit</p>
                 <p className="text-sm font-black text-slate-900">Institute projected revenue growth: +12% this cluster.</p>
              </div>
           </div>
           <button className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest hover:underline">Download Detailed Summary Hub</button>
        </div>
      </div>
    </DashboardLayout>
  )
}
