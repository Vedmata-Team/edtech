'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'
import { cn } from '@/lib/utils'

type Role = 'student' | 'teacher' | 'management'

export default function LoginClient() {
  const [role, setRole] = useState<Role | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (role) {
      login(role)
      router.push(`/${role}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans selection:bg-primary-100 selection:text-primary-900">
      
      {/* Branding Side - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col flex-1 bg-slate-950 p-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group mb-20 inline-flex">
            <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/30 group-hover:bg-primary-500 transition-all">
               <i className="bi bi-mortarboard-fill text-white text-2xl"></i>
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight uppercase">Edu<span className="text-primary-400">Core</span></span>
          </Link>

          <div className="max-w-xl space-y-10">
            <h1 className="text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              India's #1 <br />
              <span className="text-primary-400">Coaching OS</span>
            </h1>
            <p className="text-xl text-slate-400 font-bold leading-relaxed">
              Experience the future of education management. One platform for students, teachers, and management with one-click automation.
            </p>
          </div>
        </div>

        <div className="mt-auto relative z-10 grid grid-cols-2 gap-8">
           <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl transition-all hover:bg-white/10">
              <i className="bi bi-shield-lock-fill text-emerald-400 text-3xl mb-4"></i>
              <p className="text-sm font-extrabold text-white uppercase tracking-widest mb-1">Bank-Grade Node</p>
              <p className="text-xs font-bold text-slate-500">Industry-standard encryption protocol active.</p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl transition-all hover:bg-white/10">
              <i className="bi bi-cpu text-primary-400 text-3xl mb-4"></i>
              <p className="text-sm font-extrabold text-white uppercase tracking-widest mb-1">Automation Engine</p>
              <p className="text-xs font-bold text-slate-500">99.9% Autonomous task execution uptime.</p>
           </div>
        </div>
      </div>

      {/* Login Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!role ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center md:text-left mb-12">
                   <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Authorize Your Portal</h2>
                   <p className="text-slate-500 font-bold mt-2">Select the operational role you wish to access.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {[
                    { id: 'student', label: 'Student Node', desc: 'Secure access to lectures and study engine.', icon: 'bi-person-badge-fill', color: 'bg-blue-600' },
                    { id: 'teacher', label: 'Teacher Node', desc: 'Faculty terminal for sessions and grading.', icon: 'bi-person-workspace', color: 'bg-indigo-600' },
                    { id: 'management', label: 'Admin Node', desc: 'Global management dashboard control.', icon: 'bi-speedometer2', color: 'bg-slate-900' },
                  ].map((r) => (
                    <motion.button
                      key={r.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole(r.id as Role)}
                      className="group flex flex-col items-start gap-4 p-5 rounded-[28px] border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary-200 hover:shadow-2xl transition-all text-left relative overflow-hidden h-full"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-xl transition-all group-hover:scale-110", r.color)}>
                        <i className={cn("bi", r.icon)}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-900 tracking-tight uppercase leading-none mb-1">{r.label}</p>
                        <p className="text-[10px] font-bold text-slate-500 leading-normal">{r.desc}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-100">
                        <i className="bi bi-chevron-right text-[10px] text-slate-900"></i>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="pt-10 text-center">
                  <p className="text-[10px] font-extrabold text-slate-300 uppercase tracking-[0.3em]">Institutional Single Sign-On Active</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="mb-10 flex items-center gap-4">
                  <button 
                    onClick={() => setRole(null)}
                    className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <i className="bi bi-arrow-left-short text-2xl"></i>
                  </button>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">{role} Node Authorized</h2>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">Operational Node Ready for Execution</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="p-8 bg-primary-50 border border-primary-100 rounded-[32px] text-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <i className="bi bi-shield-check text-5xl text-primary-600 mb-4 block animate-pulse"></i>
                     <p className="text-slate-900 font-bold mb-2">Authenticated Demo Mode Active</p>
                     <p className="text-xs text-slate-500">The EduCore OS has automatically authorized this node for your session. No credentials required.</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full py-6 bg-primary-600 text-white font-extrabold uppercase tracking-[0.25em] text-[11px] rounded-[24px] shadow-2xl shadow-primary-500/30 hover:bg-primary-500 transition-all disabled:opacity-50 btn-glow"
                  >
                    {isLoading ? "Synchronizing Hub..." : `Enter ${role} Dashboard`}
                  </motion.button>

                  <div className="text-center">
                    <button className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest hover:text-primary-600 transition-colors">Switch Institutional Node</button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-3">
                  <button className="hover:text-primary-600">Sync Issues?</button>
                  <button className="hover:text-primary-600">Request Reset</button>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-center">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.1em] mb-2 leading-relaxed">
                    Demo Credentials Interface Active
                  </p>
                  <p className="text-[9px] font-bold text-slate-500">
                    Any credentials will satisfy the system node in debug mode.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}

import Link from 'next/link'
