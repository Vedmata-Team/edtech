'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PopupForm } from './PopupForm'

const DashboardScroll = () => {
  const images = [
    { src: '/images/management_preview.png', label: 'Management Node' },
    { src: '/images/teacher_preview.png', label: 'Teacher Studio' },
    { src: '/images/student_preview.png', label: 'Student App' },
  ]

  return (
    <div className="relative w-full h-[500px] lg:h-[700px] overflow-hidden rounded-[3rem] border-8 border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] bg-slate-900 group">
      {/* Decorative Browser Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-slate-800 flex items-center justify-between px-6 z-20 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/20" />
        </div>
        <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1 rounded-full border border-white/5">
           <i className="bi bi-shield-lock-fill text-[8px] text-emerald-500" />
           <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">educore.os / v2.0.4</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Scrolling Content */}
      <motion.div
        animate={{ 
          y: [0, -1500] 
        }}
        transition={{ 
          duration: 45, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="pt-20 pb-10 px-6 space-y-20"
      >
        {[...images, ...images, ...images].map((img, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 group/card transition-all duration-500 bg-slate-800">
             <img 
               src={img.src} 
               alt={img.label} 
               className="w-full h-auto object-cover grayscale-[20%] group-hover/card:grayscale-0 transition-all duration-700" 
             />
             <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                <p className="text-white font-extrabold tracking-widest text-[10px] uppercase">{img.label}</p>
             </div>
          </div>
        ))}
      </motion.div>

      {/* Interactive Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900 via-transparent to-slate-900 z-10" />
      
      {/* Dynamic Cursor Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary-500/30 transition-all duration-700" />
    </div>
  )
}

const NavItem = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: string }) => (
  <Link 
    href={href} 
    className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-3 py-2 rounded-xl hover:bg-primary-50"
  >
    {icon && <i className={`bi bi-${icon} text-xs`} />}
    {children}
  </Link>
)

const SubjectCombinationAnimation = () => {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<{x:string, y:string, targetX:string, targetY:string, duration:number}[]>([])

  useEffect(() => {
    setMounted(true)
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      targetX: Math.random() * 100 + '%',
      targetY: Math.random() * 100 + '%',
      duration: 5 + Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  if (!mounted) return <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden" />

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
      {/* Floating Particles (Physics) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full blur-[0.5px]"
          initial={{ x: p.x, y: p.y }}
          animate={{ 
            x: [p.x, p.targetX, p.x],
            y: [p.y, p.targetY, p.y],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Rotating Molecules (Chemistry) */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-emerald-500/20 rounded-full chem-orbit"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500/30 rounded-full blur-sm" />
      </motion.div>
      {/* Grid Lines (Math) */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0">
         {[...Array(144)].map((_, i) => (
           <div key={i} className="border-[0.25px] border-slate-200/5" />
         ))}
      </div>
    </div>
  )
}

const plans = [
  {
    name: 'Starter', price: { monthly: 2999, yearly: 2399 },
    desc: 'Perfect for small coaching centers',
    features: ['Up to 200 students', '5 teacher accounts', 'Basic analytics', 'Fee management', 'WhatsApp alerts', 'Email support'],
    cta: 'Start Free Trial', highlight: false,
  },
  {
    name: 'Professional', price: { monthly: 4999, yearly: 3999 },
    desc: 'Most popular for growing institutes',
    features: ['Up to 1000 students', '20 teacher accounts', 'Live classes & recording', 'Mock test series', 'Advanced analytics', 'Priority support'],
    cta: 'Start Free Trial', highlight: true,
  },
  {
    name: 'Enterprise', price: { monthly: 6999, yearly: 5599 },
    desc: 'For large institutes with multiple branches',
    features: ['Unlimited students', 'Unlimited teachers', 'Multi-branch management', 'Custom branding', 'API access', 'Dedicated account manager'],
    cta: 'Book a Demo', highlight: false,
  },
]

const automationSteps = [
  { title: '1 Click Fee Reminder', desc: 'Send WhatsApp/SMS to all pending students instantly', icon: 'currency-rupee', color: 'bg-emerald-100 text-emerald-700' },
  { title: 'Auto Assignment Follow-Up', desc: 'Notify students who didn’t submit DPP', icon: 'clipboard-check', color: 'bg-blue-100 text-blue-700' },
  { title: 'Smart Alerts', desc: '“Physics performance dropping” → Take action instantly', icon: 'lightning-charge', color: 'bg-amber-100 text-amber-700' },
  { title: 'Bulk Announcements', desc: 'Send updates to all students in seconds', icon: 'megaphone', color: 'bg-primary-100 text-primary-700' },
]

const results = [
  { val: '40%', label: 'Less Admin Work', icon: 'gear-wide-connected' },
  { val: '2X', label: 'Faster Fee Collection', icon: 'currency-exchange' },
  { val: '95%', label: 'Student Retention', icon: 'people' },
  { val: '30+', label: 'Hours Saved Monthly', icon: 'clock-history' },
]

const targets = [
  'Coaching Institutes (JEE / NEET / SSC / Boards)',
  'Schools (CBSE / ICSE / State Boards)',
  'Online Educators',
  'Tuition Centers',
  'Test Series Platforms',
]

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <i className={`bi bi-${name} ${className}`} />
)

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'management'>('student')
  const [isMonthly, setIsMonthly] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
      
      {/* The Header and Patriotic Strip are now in RootLayout */}

      {/* Hero Section v3.0 (Split Layout) */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden hero-gradient">
        <SubjectCombinationAnimation />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-lg mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700">Live for 2026 Season 🚀</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Trusted by 500+ Institutes</span>
              </div>
              
              <h1 className="text-5xl lg:text-[70px] font-black text-slate-950 tracking-tight mb-8 leading-[1.05]">
                Run Your Entire School or<br />
                Coaching Institute on One<br />
                <span className="text-primary-600">Smart Platform.</span>
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl font-bold leading-relaxed mb-10 max-w-xl">
                Students, Teachers & Management — Together on the only OS built for high-performance Bharat.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full sm:w-auto"
                >
                  <Link 
                    href="https://wa.me/919506933715" 
                    className="group relative w-full sm:w-auto px-10 py-5 bg-primary-600 text-white font-extrabold uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-primary-500/50 hover:bg-primary-500 transition-all flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Icon name="play-circle-fill" className="text-xl" /> 
                    <span>Get Live Demo Now</span>
                  </Link>
                </motion.div>
                <Link href="https://wa.me/919506933715" className="w-full sm:w-auto px-8 py-5 bg-white border-2 border-slate-100 text-slate-900 font-extrabold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:border-primary-100 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Icon name="whatsapp" className="text-emerald-500 text-lg" /> Custom Quote
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-8 pt-8 border-t border-slate-200/50 grayscale opacity-60">
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900">500+</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Institutes</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900">10 Lakh+</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Students</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900">4.8★</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Rating</span>
                 </div>
              </div>
            </motion.div>

            {/* Right Dashboard Scroll */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <DashboardScroll />
              
              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 z-30 hidden xl:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Icon name="graph-up-arrow" className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency Boost</p>
                    <p className="text-xl font-black text-slate-900">+40% Faster</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🏙️ Schools Recognition Strip */}
      <div className="py-6 bg-slate-900 border-y border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <div className="flex items-center gap-3">
               <Icon name="building-check" className="text-white text-xl" />
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">K-12 Schools</span>
            </div>
            <div className="flex items-center gap-3">
               <Icon name="book-half" className="text-white text-xl" />
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Global Coaching Brands</span>
            </div>
            <div className="flex items-center gap-3">
               <Icon name="award" className="text-white text-xl" />
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Edu-Foundations</span>
            </div>
            <div className="flex items-center gap-3">
               <Icon name="mortarboard" className="text-white text-xl" />
               <span className="text-[10px] font-bold text-white uppercase tracking-widest">Training Centers</span>
            </div>
         </div>
      </div>

      {/* 💼 2. Personal Brand Trust Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-slate-200 border border-white flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02, rotate: -2 }}
                className="w-64 h-64 md:w-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100"
              >
                <img src="/images/founder_divy.png" alt="Divy Mohan" className="w-full h-full object-cover" />
              </motion.div>
              
              <div className="absolute -bottom-8 -right-8 bg-slate-950 text-white p-8 rounded-[32px] shadow-2xl border border-white/10">
                <div className="flex items-center gap-4 mb-3">
                   <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                      <Icon name="patch-check-fill" className="text-white text-xl" />
                   </div>
                   <div>
                     <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-400">Verified Founder</p>
                     <p className="text-lg font-black tracking-tight">Divy Mohan</p>
                   </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                     Electronic Systems<br />
                     IIT Madras
                   </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full mb-8 border border-primary-100">
                <Icon name="stars" className="text-sm" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest">Vision from the Core</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                Building the Future of<br />
                <span className="text-primary-600">Bharat&apos;s Education.</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-slate-600 text-lg md:text-xl font-bold leading-relaxed italic">
                  &quot;Coming from IIT Madras, I've seen the power of high-performance systems. EduCore is my mission to bring that same efficiency to every coaching institute in India.&quot;
                </p>
                <p className="text-slate-500 text-lg font-bold leading-relaxed">
                  We don't just build management tools; we build the technical backbone that allows educators to focus on what they do best: <span className="text-slate-900">Teaching.</span>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary-200 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Icon name="telephone-fill" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Trust Line</p>
                    <p className="text-sm font-extrabold text-slate-900">+91 9506933715</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary-200 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-100 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Icon name="envelope-fill" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Founder&apos;s Office</p>
                    <p className="text-sm font-extrabold text-slate-900">support@educore.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 Dashboards Experience ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-bold uppercase text-primary-600 tracking-[0.4em] mb-4">The Complete Ecosystem</h2>
            <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              One System, <span className="text-primary-600">Three Worlds.</span>
            </p>
          </div>

          <div className="space-y-32">
            {/* Management Dashboard */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 text-white rounded-2xl mb-6 shadow-xl">
                  <Icon name="graph-up" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">For Management</span>
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Full Operational Control with Real-Time Intelligence</h3>
                <p className="text-slate-500 text-lg font-bold leading-relaxed mb-8">
                  Track every rupee, monitor every student, and manage every staff member from a single, high-performance dashboard. Built for owners who want growth.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Icon name="currency-exchange" className="text-2xl text-primary-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Fee OS</p>
                    <p className="text-xs text-slate-500 font-bold">1-Click Reminders</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <Icon name="people-fill" className="text-2xl text-primary-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Staff Control</p>
                    <p className="text-xs text-slate-500 font-bold">Access Management</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <img src="/images/management_preview.png" alt="Management Dashboard" className="rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-primary-600/20 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>

            {/* Teacher Dashboard */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-2xl mb-6 shadow-xl">
                  <Icon name="person-workspace" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">For Teachers</span>
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Teach, Monitor, and Inspire with Powerful Tools</h3>
                <p className="text-slate-500 text-lg font-bold leading-relaxed mb-8">
                  Doubt solving system, live class management, and automated test creation. Let your teachers focus on teaching, while the OS handles the boring stuff.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <Icon name="chat-dots-fill" className="text-2xl text-emerald-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Doubt Solver</p>
                    <p className="text-xs text-slate-500 font-bold">Timestamp Support</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <Icon name="card-checklist" className="text-2xl text-emerald-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Auto Evaluation</p>
                    <p className="text-xs text-slate-500 font-bold">Instant Results</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <img src="/images/teacher_preview.png" alt="Teacher Dashboard" className="rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tl from-primary-600/20 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>

            {/* Student Dashboard */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl mb-6 shadow-xl">
                  <Icon name="mortarboard" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">For Students</span>
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Learn Smarter, Track Your Progress in Real-Time</h3>
                <p className="text-slate-500 text-lg font-bold leading-relaxed mb-8">
                  HD Video lectures, interactive mock tests, and a dedicated doubt solving portal. Everything a student needs to excel, in one beautiful app.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <Icon name="play-btn-fill" className="text-2xl text-blue-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Video OS</p>
                    <p className="text-xs text-slate-500 font-bold">Resume Anywhere</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <Icon name="bar-chart-fill" className="text-2xl text-blue-600 mb-3" />
                    <p className="text-sm font-extrabold text-slate-900">Live Analytics</p>
                    <p className="text-xs text-slate-500 font-bold">Rank Tracking</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <img src="/images/student_preview.png" alt="Student Dashboard" className="rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-primary-600/20 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎮 3. INTERACTIVE DEMO WORKSPACE */}
      <section id="demo-zone" className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-primary-500 to-emerald-500 opacity-20" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-bold uppercase text-primary-600 tracking-[0.4em] mb-4">Live Operational Nodes</h2>
            <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Launch Your <span className="text-primary-600">Interactive Demo.</span>
            </p>
            <p className="mt-6 text-slate-500 font-bold text-lg">No signup required. Experience the full Bharat OS ecosystem instantly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Management Demo */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Icon name="speedometer2" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-widest text-[14px]">Management Terminal</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">Full control over fees, staff, batches, and institute growth analytics.</p>
              <Link 
                href="/login" 
                className="w-full py-4 bg-slate-900 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                Launch Admin Demo <Icon name="arrow-right-short" />
              </Link>
            </motion.div>

            {/* Teacher Demo */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Icon name="person-workspace" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-widest text-[14px]">Teacher Studio</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">Manage sessions, solve doubts via timestamps, and track student pulse.</p>
              <Link 
                href="/login" 
                className="w-full py-4 bg-primary-600 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-700 transition-all"
              >
                Launch Faculty Demo <Icon name="arrow-right-short" />
              </Link>
            </motion.div>

            {/* Student Demo */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Icon name="mortarboard" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-widest text-[14px]">Student App Node</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">HD video lectures, interactive testing, and automated study alerts.</p>
              <Link 
                href="/login" 
                className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
              >
                Launch Student Demo <Icon name="arrow-right-short" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🧠 3. WHY THIS IS DIFFERENT Section */}
      <section id="why-different" className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-900 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-[10px] font-extrabold uppercase text-primary-400 tracking-[0.4em] mb-4">The Smart Advantage</h2>
          <p className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-20 text-white">
            Not just another ERP — this is a<br />
            <span className="text-primary-500 underline decoration-primary-500/30 decoration-8 underline-offset-8">Smart Coaching OS</span>
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { title: 'One-Click Automation', desc: 'Send fee reminders, assignment alerts, and announcements instantly without effort.', icon: 'lightning-charge-fill', color: 'bg-primary-600 shadow-primary-500/20' },
              { title: 'Real-Time Student Tracking', desc: 'Know exactly who is studying and who is not with deep behavioral analytics.', icon: 'eye-fill', color: 'bg-emerald-600 shadow-emerald-500/20' },
              { title: 'Doubt Solving System', desc: 'Students can ask doubts directly from video timestamps for contextual learning.', icon: 'chat-square-text-fill', color: 'bg-blue-600 shadow-blue-500/20' },
              { title: 'Teacher Performance Insights', desc: 'Track teaching effectiveness with real data on student engagement and results.', icon: 'graph-up-arrow', color: 'bg-orange-600 shadow-orange-500/20' },
              { title: 'Business Growth Dashboard', desc: 'Increase admissions with built-in CRM & advanced marketing analytics.', icon: 'star-fill', color: 'bg-violet-600 shadow-violet-500/20' },
              { title: 'Professional Branding', desc: 'Custom domain and white-labeled mobile apps for your institute.', icon: 'award-fill', color: 'bg-pink-600 shadow-pink-500/20' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-110", item.color)}>
                  <Icon name={item.icon} className="text-xl" />
                </div>
                <h3 className="text-xl font-extrabold mb-4 group-hover:text-primary-400 transition-colors uppercase tracking-widest text-[14px]">{item.title}</h3>
                <p className="text-slate-400 font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-8 border border-primary-500/20 bg-primary-500/5 rounded-3xl inline-block">
             <p className="text-xl font-extrabold text-primary-400 italic">"This system doesn’t just show data — it tells you what to do next."</p>
          </div>
        </div>
      </section>

      {/* ⚡ 4. AUTOMATION DEMO SECTION */}
      <section id="automation" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">The Game Changer</h2>
          <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-20 text-center">
            🤖 Smart Automation <span className="text-primary-600">In Action</span>
          </p>

          <div className="grid lg:grid-cols-4 gap-6">
            {automationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-10 bg-slate-50 border border-slate-100 rounded-[50px] hover:bg-white hover:shadow-2xl hover:border-white transition-all duration-500 overflow-hidden"
              >
                <div className={cn("inline-flex w-16 h-16 rounded-[22px] items-center justify-center mb-8 shadow-2xl transition-transform duration-500 group-hover:rotate-12", step.color)}>
                  <Icon name={step.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-widest text-[13px]">{step.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{step.desc}</p>
                 <div className="mt-8 flex justify-center">
                    <button className="text-[9px] font-extrabold uppercase tracking-widest py-2 px-4 bg-slate-900 text-white rounded-xl transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Try This Flow
                    </button>
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-primary-600 rounded-[40px] p-12 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000">
                <Icon name="lightning-charge-fill" className="text-[200px]" />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-left">
                  <p className="text-3xl font-extrabold mb-4">Save 30+ hours every month.</p>
                  <p className="text-primary-100 font-bold text-lg">Our automation OS handles all the tasks that suck your time.</p>
                </div>
                <Link href="https://wa.me/919506933715" className="px-12 py-5 bg-white text-primary-600 font-extrabold uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-2xl hover:bg-slate-50 transition-all">
                  Request Automation Audit
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 🚀 5. PRICING / LICENSING Section */}
      <section id="pricing" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Investment Node</h2>
            <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">Scale-friendly <span className="text-primary-600">Pricing.</span></p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={cn("text-xs font-extrabold uppercase tracking-widest", isMonthly ? "text-slate-900" : "text-slate-400")}>Monthly</span>
              <button 
                onClick={() => setIsMonthly(!isMonthly)}
                className="w-14 h-7 bg-slate-200 rounded-full relative p-1 transition-colors hover:bg-slate-300"
              >
                <motion.div 
                  animate={{ x: isMonthly ? 0 : 28 }}
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                />
              </button>
              <span className={cn("text-xs font-extrabold uppercase tracking-widest", !isMonthly ? "text-primary-600" : "text-slate-400")}>Yearly <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full ml-1">SAVE 20%</span></span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative p-10 rounded-[40px] border flex flex-col h-full transition-all duration-500",
                  plan.highlight ? "bg-slate-950 text-white border-slate-900 shadow-2xl scale-[1.05] z-10" : "bg-white border-slate-100 shadow-xl hover:shadow-2xl"
                )}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Scalable</div>
                )}
                <h4 className="text-xl font-extrabold uppercase tracking-widest mb-2">{plan.name}</h4>
                <p className={cn("text-sm font-bold mb-8", plan.highlight ? "text-slate-400" : "text-slate-500")}>{plan.desc}</p>
                <div className="mb-10">
                  <span className="text-4xl font-extrabold">₹{isMonthly ? plan.price.monthly : plan.price.yearly}</span>
                  <span className={cn("text-xs font-bold uppercase ml-2", plan.highlight ? "text-slate-500" : "text-slate-400")}>/ month</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-bold">
                      <Icon name="check-circle-fill" className={cn("text-lg", plan.highlight ? "text-primary-400" : "text-primary-600")} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="https://wa.me/919506933715"
                  className={cn(
                    "w-full py-5 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.2em] text-center transition-all btn-glow",
                    plan.highlight ? "bg-primary-600 text-white shadow-primary-500/20" : "bg-slate-900 text-white shadow-slate-200"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 6. RESULTS & TARGETS Section */}
      <section id="results" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Market Impact</h2>
               <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">Performance levels of institutes using EduCore OS.</p>
               <div className="grid sm:grid-cols-2 gap-6">
                 {results.map((res, i) => (
                   <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                      <Icon name={res.icon} className="text-3xl text-primary-600 mb-6 group-hover:scale-110 transition-transform" />
                      <p className="text-4xl font-extrabold text-slate-900 mb-1">{res.val}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{res.label}</p>
                   </div>
                 ))}
               </div>
            </div>
            <div className="bg-slate-950 rounded-[40px] p-12 text-white relative flex flex-col justify-center overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Icon name="bullseye" className="text-[200px]" />
               </div>
               <h3 className="text-2xl font-extrabold mb-10 tracking-tight">Who is this for?</h3>
               <div className="space-y-6">
                 {targets.map((target, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform"><Icon name="check" /></div>
                      <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{target}</p>
                   </div>
                 ))}
               </div>
               <div className="mt-12 pt-12 border-t border-white/5">
                  <p className="text-xs font-extrabold uppercase text-primary-400 tracking-widest mb-4">Secure Your Node</p>
                  <Link href="https://wa.me/919506933715" className="inline-flex items-center gap-3 text-lg font-extrabold hover:text-primary-400 transition-colors">
                    Start Your Transformation <Icon name="arrow-right" />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎥 7. DEMO VIDEO Section */}
      <section id="demo-video" className="py-24 bg-slate-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Proof of Concept</h2>
            <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-16">See the OS in high-speed action.</p>
            
            <div className="max-w-5xl mx-auto aspect-video rounded-[45px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-white bg-slate-900 relative group cursor-pointer">
               {/* Professional Video Placeholder Frame */}
               <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 group-hover:bg-slate-950/20 transition-all">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl btn-glow animate-pulse-glow"
                  >
                     <Icon name="play-fill" className="text-4xl ml-1" />
                  </motion.div>
               </div>
               {/* Blurred background image representing a video thumbnail */}
               <div className="w-full h-full bg-[url('/images/management_preview.png')] bg-cover bg-center blur-sm opacity-40" />
            </div>
            
            <p className="mt-12 text-slate-400 font-bold max-w-xl mx-auto">
               This is a 3-minute walkthrough showing the ONE-CLICK Automation workflow from Student App to Management Terminal.
            </p>
         </div>
      </section>

      {/* 🚀 CTA 1 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-extrabold text-slate-900 mb-6">🚀 Want a System Like This for Your Institute?</h3>
          <p className="text-slate-500 text-lg font-bold mb-10">Get your own branded ERP platform today with all these smart features.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:9506933715" className="flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-primary-700 transition-all">
              <Icon name="telephone-fill" /> Call: 9506933715
            </a>
            <a href="https://wa.me/919506933715" className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-emerald-700 transition-all">
              <Icon name="whatsapp" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 📊 5. RESULTS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Impact & Proof</h2>
              <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                📈 What You Can Achieve With EduCore
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Less Admin Work', val: '40%', desc: 'Automate repetitive tasks and focus on teaching.', icon: 'gear-wide-connected' },
                  { label: 'Faster Fee Collection', val: '2X', desc: 'No more manual follow-ups with automated reminders.', icon: 'currency-exchange' },
                  { label: 'Higher Retention', val: '35%', desc: 'Better engagement leads to happier students and parents.', icon: 'person-hearts' },
                  { label: 'Organized Institute', val: '100%', desc: 'Run your coaching like a professional company.', icon: 'building-check' },
                ].map((res, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-primary-600">
                      <Icon name={res.icon} className="text-2xl" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">{res.val}</span>
                        <span className="text-sm font-extrabold text-slate-400 uppercase tracking-widest">{res.label}</span>
                      </div>
                      <p className="text-slate-500 font-bold text-sm">{res.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-600 rounded-[50px] p-12 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Icon name="graph-up-arrow" className="text-[150px]" />
               </div>
               <h3 className="text-3xl font-extrabold mb-6">"Run your coaching like a professional company."</h3>
               <p className="text-primary-100 text-lg font-bold mb-10 leading-relaxed">
                 Most coaching owners struggle with administration. EduCore OS takes that burden away, allowing you to scale from 100 to 1000+ students without increasing staff.
               </p>
               <div className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                 <p className="text-sm font-extrabold uppercase tracking-widest text-primary-200 mb-2">Real Quote from a Client</p>
                 <p className="text-xl font-bold italic">"We grew from 2 branches to 5 branches in just 1 year after implementing EduCore. The system handles everything."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎥 10. DEMO VIDEO SECTION */}
      <section id="demo-video" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">See It To Believe It</h2>
          <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-12">
            🎥 Watch How It Works
          </p>
          <div className="relative aspect-video rounded-[40px] overflow-hidden bg-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group cursor-pointer">
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <Icon name="play-fill" className="text-4xl translate-x-1" />
                </div>
             </div>
             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" alt="Demo Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-slate-900 to-transparent">
                <p className="text-xl font-extrabold text-white">Full Platform Walkthrough (10:45 min)</p>
                <p className="text-slate-400 font-bold">Watch how EduCore transforms daily operations.</p>
             </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="https://wa.me/919506933715" className="px-10 py-4 bg-primary-600 text-white font-extrabold rounded-2xl shadow-xl hover:bg-primary-700 transition-all flex items-center gap-2">
              Book a Personalized Demo <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🎯 6. WHO IS THIS FOR Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Target Audience</h2>
          <p className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-20 text-center">
            🎯 Perfect <span className="text-primary-600">For:</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {targets.map((target, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-3 hover:bg-white hover:shadow-xl hover:border-white transition-all cursor-default"
              >
                <Icon name="check-circle-fill" className="text-primary-600 text-xl" />
                <span className="text-lg font-extrabold text-slate-900">{target}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-xl text-slate-500 font-bold">"If you teach students — this platform is for you."</p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em]">Core Capabilities</h2>
               <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Architecture of Intelligence.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: 'One-Click Fee OS', icon: 'currency-exchange', text: 'Automate collection reminders via SMS, Mail and WhatsApp. Zero manual follow-ups required.', color: 'blue' },
                 { title: 'Doubt Priority Engine', icon: 'chat-left-dots-fill', text: 'Autonomous sorting of student doubts. Critical and weak student nodes prioritized automatically.', color: 'orange' },
                 { title: 'Batch Pulse Analytics', icon: 'activity', text: 'System tells you exactly where performance is dropping and suggests revision classes.', color: 'emerald' },
               ].map((feat, i) => (
                 <div key={i} className="group p-10 bg-slate-50 border border-slate-100 rounded-[40px] hover:bg-white hover:border-white hover:shadow-2xl transition-all duration-500">
                    <div className={cn(
                      "w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:rotate-12",
                      feat.color === 'blue' ? 'bg-blue-100 text-blue-600' : feat.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                    )}>
                       <i className={cn("bi text-2xl", feat.icon)}></i>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">{feat.title}</h3>
                    <p className="text-slate-500 font-bold leading-relaxed">{feat.text}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── Pricing Section with Urgency ── */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-extrabold uppercase text-primary-600 tracking-[0.4em] mb-4">Investment Plans</h2>
            <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">Simple, Transparent Pricing</p>
            <p className="text-slate-500 text-lg font-bold">No hidden charges. Start free, scale as you grow.</p>
            
            {/* ⚡ Urgency Tag */}
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-orange-100 border border-orange-200 rounded-2xl shadow-xl animate-bounce">
              <Icon name="lightning-charge-fill" className="text-orange-600 text-xl" />
              <div className="text-left">
                <p className="text-[10px] font-extrabold uppercase text-orange-600 tracking-widest leading-none mb-1">Limited Time Offer</p>
                <p className="text-sm font-extrabold text-slate-900">Get FREE setup + customization if you book demo this week. <span className="text-orange-600">Only for first 10 institutes.</span></p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-10 rounded-[50px] border transition-all duration-500 group",
                  plan.highlight 
                    ? "bg-slate-950 text-white border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] scale-105 z-10" 
                    : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-2xl hover:border-white"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-2 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest shadow-2xl">
                    Most Popular Choice
                  </div>
                )}
                <h3 className={cn("text-xl font-extrabold uppercase tracking-widest mb-2", plan.highlight ? "text-primary-400" : "text-slate-900")}>{plan.name}</h3>
                <p className={cn("text-xs font-bold mb-8", plan.highlight ? "text-slate-400" : "text-slate-500")}>{plan.desc}</p>
                
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-5xl font-extrabold tracking-tight">₹{plan.price.monthly.toLocaleString()}</span>
                  <span className={cn("text-sm font-extrabold uppercase tracking-widest", plan.highlight ? "text-slate-600" : "text-slate-300")}>/ Mo</span>
                </div>

                <ul className="space-y-4 mb-12">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Icon name="check-circle-fill" className={cn("text-lg", plan.highlight ? "text-primary-400" : "text-primary-600")} />
                      <span className={cn("text-sm font-bold", plan.highlight ? "text-slate-300" : "text-slate-700")}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="https://wa.me/919506933715" 
                  className={cn(
                    "block w-full text-center py-5 rounded-2xl font-extrabold uppercase tracking-widest text-[11px] shadow-xl transition-all",
                    plan.highlight 
                      ? "bg-primary-600 text-white hover:bg-primary-500 shadow-primary-500/20" 
                      : "bg-slate-900 text-white hover:bg-primary-600 shadow-slate-900/10"
                  )}
                >
                  Acquire License
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ── */}
      <section className="py-32 bg-primary-600 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <SubjectCombinationAnimation />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <Icon name="lightning-charge-fill" className="text-6xl text-accent mx-auto mb-10 animate-pulse" />
           <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
             Ready to Transform Your Coaching Institute?
           </h2>
           <p className="text-primary-100 text-xl font-bold mb-12 max-w-2xl mx-auto">
             Join 500+ institutes that already run smarter with EduCore. Branded mobile apps, automated fees, and smart doubt solving — all in one place.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="https://wa.me/919506933715" className="px-12 py-6 bg-white text-primary-600 font-extrabold uppercase tracking-[0.3em] text-[12px] rounded-3xl shadow-2xl hover:bg-slate-50 transition-all btn-glow">
                Get Your Branded ERP Now
              </Link>
              <a href="tel:9506933715" className="px-12 py-6 bg-primary-700 text-white font-extrabold uppercase tracking-[0.3em] text-[12px] rounded-3xl border border-primary-500 hover:bg-primary-800 transition-all">
                Call for Demo: 9506933715
              </a>
           </div>
           <p className="mt-12 text-[10px] font-extrabold uppercase tracking-[0.4em] text-primary-200">
             “This is not just software — this is your complete coaching business system.”
           </p>
        </div>
      </section>

      {/* ── System Footer ── */}
      <footer className="pt-24 pb-12 bg-white border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
               <div className="col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/30">
                        <Icon name="mortarboard-fill" />
                     </div>
                     <span className="font-extrabold text-xl uppercase tracking-tighter">Edu<span className="text-primary-600">Core</span> OS</span>
                  </div>
                  <p className="text-slate-500 font-bold leading-relaxed max-w-sm mb-8">
                    The #1 Coaching & School Management Operating System in India. Designed to automate growth and simplify administration.
                  </p>
                  <div className="flex items-center gap-4">
                     <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><Icon name="facebook" /></a>
                     <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><Icon name="instagram" /></a>
                     <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><Icon name="linkedin" /></a>
                     <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all"><Icon name="youtube" /></a>
                  </div>
               </div>
               <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-slate-900 tracking-[0.4em] mb-8">Modules</h4>
                  <ul className="space-y-4">
                     {['Fee OS', 'Doubt Solver', 'Live Classes', 'Mock Tests', 'Analytics Hub'].map(link => (
                        <li key={link}><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">{link}</Link></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-slate-900 tracking-[0.4em] mb-8">Contact Dev</h4>
                  <ul className="space-y-4">
                     <li className="flex items-center gap-3">
                        <Icon name="telephone-fill" className="text-primary-600" />
                        <span className="text-sm font-bold text-slate-700">9506933715</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <Icon name="envelope-fill" className="text-primary-600" />
                        <span className="text-xs font-bold text-slate-700 break-all">vedmatawebdesigning@gmail.com</span>
                     </li>
                  </ul>
               </div>
            </div>

            {/* Sticky Repeat Strip in Footer */}
            <div className="bg-slate-950 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mb-12 border border-slate-900">
               <div>
                  <p className="text-white font-extrabold text-lg mb-1 tracking-tight">Rocket-launch your institute today!</p>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Get branded ERP on custom domain in 5 days.</p>
               </div>
               <div className="flex items-center gap-4">
                  <a href="tel:9506933715" className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-primary-400 transition-all">Call Now</a>
                  <a href="https://wa.me/919506933715" className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20">Chat on WhatsApp</a>
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-50">
               <p className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">© 2026 Vedmata Web Designing • Built in India for World</p>
               <div className="flex items-center gap-8">
                  <Link href="#" className="text-[10px] font-extrabold text-slate-400 hover:text-slate-900 uppercase tracking-widest">Pricing Protocol</Link>
                  <Link href="#" className="text-[10px] font-extrabold text-slate-400 hover:text-slate-900 uppercase tracking-widest">SLA Agreement</Link>
                  <Link href="#" className="text-[10px] font-extrabold text-slate-400 hover:text-slate-900 uppercase tracking-widest">Privacy Core</Link>
               </div>
            </div>
         </div>
      </footer>

      {/* 💬 Premium WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919506933715"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] group flex items-center"
      >
        <div className="relative flex items-center justify-center">
           {/* Animated Glow Rings */}
           <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
           <div className="absolute inset-[-8px] bg-emerald-500 rounded-full animate-pulse opacity-10" />
           
           {/* Main Button */}
           <div className="relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-[0_20px_50px_rgba(18,140,126,0.3)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]">
              <Icon name="whatsapp" className="text-3xl" />
           </div>

           {/* Hover Tooltip */}
           <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl">
              Connect with Dev
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
           </div>
        </div>
      </motion.a>

      <PopupForm />
    </div>
  )
}
