'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  Users, DollarSign, TrendingUp, Calendar, Bell, Download,
  ChevronRight, CheckCircle, AlertCircle, UserPlus, BarChart3
} from 'lucide-react'

const LineChartComponent = dynamic(
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
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 12 }}
              formatter={(v: number) => [`₹${v}L`, '']}
            />
            <Legend iconType="circle" iconSize={8} />
            <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 4 }} name="Total Fees" />
            <Line type="monotone" dataKey="collected" stroke="#38BDF8" strokeWidth={2.5} dot={{ fill: '#38BDF8', r: 4 }} name="Collected" strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false, loading: () => <div className="h-48 animate-pulse bg-slate-100 rounded-xl" /> }
)

const stats = [
  { label: 'Total Students', value: '1,248', icon: Users, color: 'bg-blue-50 text-blue-600', change: '+32 this month', trend: 'up' },
  { label: 'Revenue (Month)', value: '₹6.4L', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600', change: '+18% vs last month', trend: 'up' },
  { label: 'Attendance Today', value: '87%', icon: Calendar, color: 'bg-violet-50 text-violet-600', change: '1,085/1,248 present', trend: 'up' },
  { label: 'Pending Fees', value: '₹1.2L', icon: AlertCircle, color: 'bg-orange-50 text-orange-600', change: '48 students', trend: 'down' },
]

const recentStudents = [
  { name: 'Arjun Mehta', batch: 'JEE-A 2025', fee: '₹45,000', status: 'paid', date: '2 days ago' },
  { name: 'Priya Patel', batch: 'NEET-B 2025', fee: '₹38,000', status: 'pending', date: '1 day ago' },
  { name: 'Karan Singh', batch: 'JEE-B 2025', fee: '₹42,000', status: 'paid', date: '3 days ago' },
  { name: 'Ananya Roy', batch: 'Boards 2025', fee: '₹28,000', status: 'partial', date: '5 days ago' },
  { name: 'Rohan Gupta', batch: 'JEE-A 2025', fee: '₹45,000', status: 'paid', date: '1 week ago' },
]

const alerts = [
  { text: '48 students have pending fees for March', type: 'warning', icon: AlertCircle },
  { text: 'NEET Batch attendance below 75% — 3 students', type: 'error', icon: AlertCircle },
  { text: 'New enrollment: 5 students joined today', type: 'success', icon: CheckCircle },
  { text: 'Teacher Vikram Sir requested leave tomorrow', type: 'info', icon: Bell },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ManagementDashboardClient() {
  return (
    <DashboardLayout role="management" title="Management Dashboard">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white flex items-center justify-between"
      >
        <div>
          <p className="text-slate-400 text-sm mb-1">Good morning, Admin 👋</p>
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">EduCore Institute · All Branches</p>
        </div>
        <div className="hidden sm:flex gap-3">
          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            <UserPlus className="w-4 h-4" />
            New Enrollment
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            <p className={`text-xs font-medium mt-1 ${s.trend === 'up' ? 'text-emerald-600' : 'text-orange-600'}`}>
              {s.change}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground">Fee Collection Trend</h3>
                <p className="text-xs text-slate-500">Last 7 months (in Lakhs)</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-primary-600 font-semibold bg-primary-50 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
            <LineChartComponent />
          </motion.div>

          {/* Recent Enrollments / Student Table */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Recent Enrollments</h3>
              <button className="text-xs text-primary-600 font-semibold flex items-center gap-1 hover:underline">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-left text-xs font-semibold text-slate-500">Student</th>
                    <th className="pb-3 text-left text-xs font-semibold text-slate-500">Batch</th>
                    <th className="pb-3 text-left text-xs font-semibold text-slate-500">Fee</th>
                    <th className="pb-3 text-left text-xs font-semibold text-slate-500">Status</th>
                    <th className="pb-3 text-left text-xs font-semibold text-slate-500">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentStudents.map((s, i) => (
                    <motion.tr
                      key={s.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-xs font-bold flex-shrink-0">
                            {s.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-medium text-foreground">{s.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500 text-xs">{s.batch}</td>
                      <td className="py-3 font-semibold text-foreground">{s.fee}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          s.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                          s.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {s.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 text-xs">{s.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Alerts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Alerts</h3>
              <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">4</span>
            </div>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
                  a.type === 'warning' ? 'bg-orange-50' :
                  a.type === 'error' ? 'bg-red-50' :
                  a.type === 'success' ? 'bg-emerald-50' : 'bg-blue-50'
                }`}>
                  <a.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    a.type === 'warning' ? 'text-orange-500' :
                    a.type === 'error' ? 'text-red-500' :
                    a.type === 'success' ? 'text-emerald-500' : 'text-blue-500'
                  }`} />
                  <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Attendance overview */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Batch Attendance Today</h3>
            <div className="space-y-3.5">
              {[
                { batch: 'JEE Mains-A', pct: 92 },
                { batch: 'JEE Mains-B', pct: 78 },
                { batch: 'NEET-A', pct: 88 },
                { batch: 'NEET-B', pct: 71 },
                { batch: 'Board Prep', pct: 95 },
              ].map((b) => (
                <div key={b.batch}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{b.batch}</span>
                    <span className={`text-xs font-bold ${b.pct >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>{b.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${b.pct}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${b.pct >= 80 ? 'bg-emerald-500' : 'bg-orange-400'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-4">Monthly Overview</h3>
            <div className="space-y-3">
              {[
                { label: 'New Enrollments', value: '32' },
                { label: 'Tests Conducted', value: '128' },
                { label: 'Live Classes', value: '84' },
                { label: 'Doubts Resolved', value: '2,340' },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-blue-200 text-sm">{s.label}</span>
                  <span className="text-white font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
