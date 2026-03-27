'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const RevenueChart = dynamic(
  () => import('recharts').then((m) => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } = m
    return function Chart() {
      const data = [
        { month: 'Aug', revenue: 4.2, collected: 3.8 },
        { month: 'Sep', revenue: 5.1, collected: 4.5 },
        { month: 'Oct', revenue: 4.8, collected: 4.2 },
        { month: 'Nov', revenue: 6.2, collected: 5.8 },
        { month: 'Dec', revenue: 5.5, collected: 5.1 },
        { month: 'Jan', revenue: 7.1, collected: 6.4 },
        { month: 'Feb', revenue: 6.8, collected: 6.2 },
      ]
      return (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip
              contentStyle={{ background: '#fff', border: 'none', borderRadius: 16, fontSize: 12, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              formatter={(v: number) => [`₹${v}L`, '']}
            />
            <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="collected" stroke="#10B981" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#10B981', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-52 animate-pulse bg-slate-100 rounded-2xl" /> }
)

const stats = [
  { label: 'Total Students', value: '1,248', icon: 'bi-people-fill', bg: 'bg-blue-50', iconColor: 'text-blue-600', dynamic: '32 new this month', status: 'up' },
  { label: 'Revenue (MTD)', value: '₹6.4L', icon: 'bi-bank2', bg: 'bg-emerald-50', iconColor: 'text-emerald-600', dynamic: '18% growth', status: 'up' },
  { label: 'Attendance', value: '87%', icon: 'bi-calendar-check-fill', bg: 'bg-violet-50', iconColor: 'text-violet-600', dynamic: '1,085 present today', status: 'stable' },
  { label: 'Pending Fees', value: '₹1.2L', icon: 'bi-exclamation-octagon-fill', bg: 'bg-orange-50', iconColor: 'text-orange-600', dynamic: '48 defaulters', status: 'alert' },
]

const suggestions = [
  { id: 1, text: '20 students haven’t submitted Physics DPP since 3 days.', type: 'warning', action: 'Notify Students', icon: 'bi-lightning-charge-fill' },
  { id: 2, text: 'Mathematics Batch B performance dropped by 12% in last test.', type: 'danger', action: 'Assign Extra Class', icon: 'bi-graph-down-arrow' },
  { id: 3, text: 'Attendance in morning batches is below 70% this week.', type: 'info', action: 'Check Logs', icon: 'bi-info-circle-fill' },
]

export default function ManagementDashboardClient() {
  const [sendingReminder, setSendingReminder] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSendReminder = () => {
    setSendingReminder(true)
    setTimeout(() => setSendingReminder(false), 2000)
  }

  return (
    <DashboardLayout role="management" title="Admin Control Center">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Automation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-500/20 text-primary-400 text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md border border-primary-500/30">
                  <i className="bi bi-cpu-fill mr-1"></i> Automation Active
                </span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">System Intelligence Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">EduCore Institute Management · Multi-Branch OS</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-5 py-3 rounded-2xl text-sm transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] btn-glow w-full sm:w-auto"
              >
                <i className="bi bi-megaphone-fill"></i>
                Bulk Announcement
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendReminder}
                disabled={sendingReminder}
                className={cn(
                  "flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-2xl text-sm transition-all border shadow-lg auto-pulse w-full sm:w-auto",
                  sendingReminder 
                    ? "bg-emerald-600 border-emerald-500 text-white" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                )}
              >
                {sendingReminder ? (
                  <>
                    <i className="bi bi-check-circle-fill"></i>
                    Reminders Sent
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill text-orange-400"></i>
                    Send Fee Reminders
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Smart Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm transition-all group hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6", s.bg)}>
                  <i className={cn("bi text-xl", s.icon, s.iconColor)}></i>
                </div>
                {s.status === 'alert' && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                  </span>
                )}
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">{s.dynamic}</span>
                <i className={cn("bi", s.status === 'up' ? 'bi-arrow-up-circle-fill text-emerald-500' : 'bi-dash-circle-fill text-slate-300')}></i>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Revenue and Automation Tables */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Intelligent Suggestions Panel */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="bi bi-stars text-8xl text-primary-600"></i>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <i className="bi bi-lightbulb-fill text-primary-500"></i>
                    Smart Suggestions Panel
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">AI-driven actionable insights for today</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {suggestions.map((item) => (
                  <motion.div 
                    key={item.id}
                    className={cn(
                      "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01]",
                      item.type === 'warning' ? "bg-amber-50 border-amber-100" : 
                      item.type === 'danger' ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3 md:mb-0">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                        item.type === 'warning' ? "bg-white text-amber-600" : 
                        item.type === 'danger' ? "bg-white text-red-600" : "bg-white text-blue-600"
                      )}>
                        <i className={cn("bi", item.icon)}></i>
                      </div>
                      <p className="text-xs font-bold text-slate-700 leading-snug">{item.text}</p>
                    </div>
                    <button className={cn(
                      "px-4 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all btn-glow shadow-sm",
                      item.type === 'warning' ? "bg-amber-600 text-white" : 
                      item.type === 'danger' ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                    )}>
                      {item.action}
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Collection Graph */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Fee Collection Analytics</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Real-time revenue stream tracking</p>
                </div>
                <div className="flex gap-2">
                   <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors">
                     <i className="bi bi-download"></i>
                   </button>
                </div>
              </div>
              <RevenueChart />
            </div>

          </div>

          {/* Right Sidebar Automation */}
          <div className="space-y-6">
            
            {/* One-Click Action Center */}
            <section className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-[0.2em]">Quick Action OS</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-all group">
                  <i className="bi bi-person-plus-fill text-2xl mb-2 text-slate-400 group-hover:text-primary-500 icon-bounce"></i>
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter">Add Student</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all group">
                  <i className="bi bi-currency-dollar text-2xl mb-2 text-slate-400 group-hover:text-emerald-500 icon-bounce"></i>
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter">Collect Fee</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-violet-500 hover:text-violet-600 transition-all group">
                  <i className="bi bi-window-stack text-2xl mb-2 text-slate-400 group-hover:text-violet-500 icon-bounce"></i>
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter">New Batch</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-all group">
                  <i className="bi bi-file-earmark-pdf-fill text-2xl mb-2 text-slate-400 group-hover:text-orange-500 icon-bounce"></i>
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter">Report Gen</span>
                </button>
              </div>
            </section>

            {/* Fee Defaulters List with Automation */}
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">Fee Defaulters</h3>
                <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-1 rounded-lg">48 Pending</span>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { name: 'Priya Patel', amount: '₹12,400', batch: 'JEE-A 2025' },
                  { name: 'Arjun Singh', amount: '₹8,900', batch: 'NEET-B 2025' },
                  { name: 'Rohan Gupta', amount: '₹15,000', batch: 'Fdn-C 2026' },
                ].map((std) => (
                  <div key={std.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-600">
                        {std.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{std.name}</p>
                        <p className="text-[10px] font-medium text-slate-500">{std.batch}</p>
                      </div>
                    </div>
                    <p className="text-xs font-extrabold text-red-600">{std.amount}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-[0.15em] rounded-2xl hover:bg-slate-800 transition-all btn-glow shadow-xl">
                 View All Defaulters
              </button>
            </section>

            {/* Multi Ad System Placeholder */}
            <div className="relative group rounded-3xl overflow-hidden shadow-lg shadow-primary-900/10">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" 
                alt="Ad" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-white font-extrabold text-sm mb-1 uppercase">Upgrade to Pro ERP</p>
                <p className="text-white/70 text-[10px] font-medium">Get Predictive AI Analytics for your institute</p>
              </div>
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white font-extrabold uppercase tracking-widest z-20 border border-white/20">Sponsored</div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
