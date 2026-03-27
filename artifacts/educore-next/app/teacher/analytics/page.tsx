'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const PerformanceRadar = dynamic(
  () => import('recharts').then((m) => {
    const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } = m
    const data = [
      { subject: 'Mechanics', A: 80, B: 110, fullMark: 150 },
      { subject: 'Heat', A: 98, B: 130, fullMark: 150 },
      { subject: 'Wave Optics', A: 86, B: 130, fullMark: 150 },
      { subject: 'Modern Physics', A: 99, B: 100, fullMark: 150 },
      { subject: 'Kinematics', A: 85, B: 90, fullMark: 150 },
    ]
    return function Chart() {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
            <Radar name="Batch A" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
            <Radar name="Batch B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false }
)

export default function TeacherAnalyticsPage() {
  return (
    <DashboardLayout role="teacher" title="Faculty Intelligence">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
              <i className="bi bi-bar-chart-fill"></i>
            </span>
            Growth & Pulse Analytics
          </h1>
          <p className="mt-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">System behavioral tracking & predictive grade metrics</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
           
           <div className="lg:col-span-12 grid md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'System Retention', val: '94%', trend: '+2% wk', icon: 'bi-person-check-fill', color: 'bg-emerald-100 text-emerald-600' },
                { label: 'Avg Study Time', val: '4.2h', trend: '+18% mt', icon: 'bi-clock-history', color: 'bg-indigo-100 text-indigo-600' },
                { label: 'Tests Cleared', val: '842', trend: 'Total Nodes', icon: 'bi-clipboard-check-fill', color: 'bg-blue-100 text-blue-600' },
                { label: 'Pulse Rating', val: '4.8★', trend: 'Faculty Metric', icon: 'bi-star-fill', color: 'bg-orange-100 text-orange-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl group">
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-6", s.color)}>
                      <i className={cn("bi", s.icon)} />
                   </div>
                   <p className="text-3xl font-black text-slate-900 tracking-tight">{s.val}</p>
                   <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
           </div>

           <div className="lg:col-span-8 bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <i className="bi bi-pie-chart-fill text-[120px] text-indigo-600" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-[14px]">Sub-topic Mastery Radar</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">Cross-categorical performance mapping for Physics Batches.</p>
                 </div>
                 <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                    <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-[9px] font-extrabold uppercase tracking-widest shadow-sm">Batch A</button>
                    <button className="px-4 py-2 text-slate-500 rounded-lg text-[9px] font-extrabold uppercase tracking-widest">Batch B</button>
                 </div>
              </div>
              <PerformanceRadar />
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 rounded-[40px] p-8 text-white relative border border-slate-900 overflow-hidden">
                 <h3 className="text-sm font-black uppercase tracking-widest mb-8">Performance Alert Node</h3>
                 <div className="space-y-6">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group cursor-pointer hover:bg-white/10 transition-all">
                       <p className="text-[9px] font-extrabold text-orange-400 uppercase tracking-widest mb-2">High Velocity Drop</p>
                       <p className="text-sm font-bold leading-snug mb-3">5 students in JEE-A show negative trend in "Optics".</p>
                       <button className="text-[9px] font-extrabold text-white uppercase tracking-widest underline underline-offset-4">Remediate Now</button>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group cursor-pointer hover:bg-white/10 transition-all opacity-60">
                       <p className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest mb-2">Peak Node Activation</p>
                       <p className="text-sm font-bold leading-snug">Average attendance hitting 98% in NEET-B studio.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                    <i className="bi bi-file-earmark-arrow-down-fill text-[80px]" />
                 </div>
                 <h4 className="text-xl font-black mb-4 leading-tight">Batch Performance<br />System Report</h4>
                 <p className="text-indigo-100/70 text-xs font-bold leading-relaxed mb-10">Generate a comprehensive behavioral and grade report for all batches instantly. Ready for regional audit.</p>
                 <button className="w-full py-4 bg-white text-indigo-600 font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl transition-all hover:bg-indigo-50">Transmit Global Report</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
