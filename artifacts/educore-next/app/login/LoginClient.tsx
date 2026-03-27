'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, Users, BarChart3, Eye, EyeOff, ArrowRight, CheckCircle, Shield
} from 'lucide-react'
import { useAuth, type UserRole } from '@/components/providers/AuthProvider'

const roles = [
  {
    key: 'student' as UserRole,
    label: 'Student',
    icon: GraduationCap,
    color: 'bg-blue-500',
    desc: 'Access your classes, tests, and doubts',
    redirect: '/student/dashboard',
    bgColor: 'from-blue-600 to-blue-800',
  },
  {
    key: 'teacher' as UserRole,
    label: 'Teacher',
    icon: Users,
    color: 'bg-indigo-500',
    desc: 'Manage classes, students, and content',
    redirect: '/teacher/dashboard',
    bgColor: 'from-indigo-600 to-indigo-800',
  },
  {
    key: 'management' as UserRole,
    label: 'Management',
    icon: BarChart3,
    color: 'bg-slate-700',
    desc: 'Full admin control and analytics',
    redirect: '/management/dashboard',
    bgColor: 'from-slate-700 to-slate-900',
  },
]

export default function LoginClient() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'role' | 'login'>('role')
  const { login } = useAuth()
  const router = useRouter()

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r)
    setStep('login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1200))
    login(selectedRole)
    const role = roles.find((r) => r.key === selectedRole)!
    router.push(role.redirect)
  }

  const activeRole = roles.find((r) => r.key === selectedRole)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <motion.div
        className={`hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br ${
          activeRole ? activeRole.bgColor : 'from-primary-700 to-primary-900'
        } p-12 text-white relative overflow-hidden transition-all duration-500`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">EduCore ERP</span>
          </Link>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole || 'default'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-4xl font-black mb-4 leading-tight">
                {activeRole ? `Welcome, ${activeRole.label}` : 'India\'s #1 Coaching ERP'}
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                {activeRole ? activeRole.desc : 'One platform for students, teachers, and management.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-3">
            {['500+ Institutes trust EduCore', 'Bank-grade data security', '99.9% uptime guaranteed'].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-blue-100 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-300" />
          <p className="text-xs text-blue-300">Your data is encrypted and protected with industry-standard security.</p>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">EduCore ERP</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-black text-foreground mb-2">Choose your role</h1>
                  <p className="text-slate-500 text-sm">Select the portal you'd like to access</p>
                </div>

                <div className="space-y-3">
                  {roles.map((r) => (
                    <motion.button
                      key={r.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect(r.key)}
                      className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div className={`w-12 h-12 ${r.color} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0`}>
                        <r.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{r.label}</p>
                        <p className="text-sm text-slate-500">{r.desc}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-xs text-slate-400 mt-8">
                  Demo mode: any credentials will work
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => setStep('role')}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-8"
                >
                  ← Change role
                </button>

                <div className="mb-8">
                  {activeRole && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 ${activeRole.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <activeRole.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {activeRole.label} Login
                      </span>
                    </div>
                  )}
                  <h1 className="text-2xl font-black text-foreground mb-2">Welcome back</h1>
                  <p className="text-slate-500 text-sm">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email / Phone
                    </label>
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      Remember me
                    </label>
                    <a href="#" className="text-sm text-primary-600 font-medium hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.99 }}
                    className="w-full py-3.5 bg-primary-600 hover:bg-primary-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-6">
                  Demo: enter any email and password to log in
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
