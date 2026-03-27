'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  GraduationCap, BookOpen, Video, ClipboardList, MessageCircle,
  BarChart3, DollarSign, Users, Calendar, Bell, CheckCircle,
  ChevronRight, Star, Menu, X, Play, ArrowRight, Zap, Shield,
  TrendingUp, Clock, Award, FileText, Layers, Settings,
  ChevronDown, Check, Sparkles
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const stats = [
  { label: 'Institutes Onboarded', value: 500, suffix: '+' },
  { label: 'Students Managed', value: 2, suffix: 'L+' },
  { label: 'Tests Conducted', value: 50, suffix: 'K+' },
  { label: 'Doubts Resolved', value: 10, suffix: 'L+' },
]

const roles = [
  {
    key: 'student',
    label: 'Student Portal',
    icon: GraduationCap,
    color: '#2563EB',
    tagline: 'Learn smarter, track your progress in real-time',
    features: [
      { icon: Video, title: 'HD Video Lectures', desc: 'Resume exactly where you left off with smart bookmarking' },
      { icon: ClipboardList, title: 'Mock Tests & Analytics', desc: 'Chapter-wise tests with detailed performance analysis' },
      { icon: MessageCircle, title: 'Instant Doubt Resolution', desc: 'Get answers from subject experts within minutes' },
      { icon: TrendingUp, title: 'Performance Insights', desc: 'Rank, percentile, and subject-wise progress tracking' },
    ],
  },
  {
    key: 'teacher',
    label: 'Teacher Portal',
    icon: Users,
    color: '#1E40AF',
    tagline: 'Teach, monitor, and inspire with powerful tools',
    features: [
      { icon: Video, title: 'Live Class Management', desc: 'HD live streaming with attendance auto-capture' },
      { icon: FileText, title: 'Content Upload', desc: 'Upload video lectures, PDFs, and study material in bulk' },
      { icon: ClipboardList, title: 'Test Creation', desc: 'AI-powered question bank and auto-graded assessments' },
      { icon: MessageCircle, title: 'Doubt Management', desc: 'Answer doubts with text, images, and video explanations' },
    ],
  },
  {
    key: 'management',
    label: 'Management Dashboard',
    icon: BarChart3,
    color: '#0F172A',
    tagline: 'Full operational control with real-time intelligence',
    features: [
      { icon: DollarSign, title: 'Fee Collection & Ledger', desc: 'Online payments, reminders, receipts, and reporting' },
      { icon: Users, title: 'Student & Staff Management', desc: 'Enroll, track, promote, and manage all users' },
      { icon: BarChart3, title: 'Advanced Analytics', desc: 'Batch performance, revenue, and attendance dashboards' },
      { icon: Bell, title: 'Smart Notifications', desc: 'WhatsApp, SMS, and email alerts to parents and students' },
    ],
  },
]

const modules = [
  { icon: Users, title: 'Student Management', desc: 'Enroll, track, and manage students at scale' },
  { icon: Video, title: 'Live Classes', desc: 'HD streaming with auto attendance and recording' },
  { icon: ClipboardList, title: 'Mock Test Series', desc: 'AI-generated tests with instant evaluation' },
  { icon: MessageCircle, title: 'Doubt Resolution', desc: 'Real-time Q&A with expert teachers' },
  { icon: DollarSign, title: 'Fee Management', desc: 'Online collection, invoicing, and reminders' },
  { icon: BarChart3, title: 'Analytics & Reports', desc: 'Deep insights on performance and revenue' },
  { icon: Calendar, title: 'Attendance System', desc: 'Biometric & app-based with parent alerts' },
  { icon: BookOpen, title: 'Study Material', desc: 'Centralized library for notes, PDFs, and videos' },
  { icon: Bell, title: 'Communication Hub', desc: 'WhatsApp, SMS, and email in one place' },
]

const steps = [
  { step: '01', title: 'Sign Up & Set Up', desc: 'Create your institute account in 5 minutes. Add batches, subjects, and staff with guided onboarding.', icon: Settings },
  { step: '02', title: 'Onboard Your Students', desc: 'Import student data in bulk or let students self-register. Fee collection goes live instantly.', icon: Users },
  { step: '03', title: 'Start Teaching & Tracking', desc: 'Go live with classes, tests, and doubt sessions. Track everything from one unified dashboard.', icon: TrendingUp },
]

const testimonials = [
  {
    name: 'Rahul Sharma', role: 'Director, Apex IIT Academy, Delhi',
    avatar: 'RS', rating: 5,
    text: 'EduCore transformed how we operate. Fee collection is now fully automated, and parents get real-time updates. We saved 40 hours/month on admin work.',
  },
  {
    name: 'Priya Patel', role: 'Founder, Spark Learning Center, Surat',
    avatar: 'PP', rating: 5,
    text: 'The doubt-solving module is a game changer. Students get answers within 10 minutes, and our retention rate improved by 35% in just 3 months.',
  },
  {
    name: 'Vikram Singh', role: 'Principal, Success Point, Jaipur',
    avatar: 'VS', rating: 5,
    text: 'Switching to EduCore was the best decision. Live classes, mock tests, analytics — everything is seamlessly connected. Highly recommended!',
  },
  {
    name: 'Anita Desai', role: 'Head, Momentum Coaching, Pune',
    avatar: 'AD', rating: 5,
    text: 'Our teachers love how easy it is to upload content and manage doubts. Student engagement improved dramatically. EduCore simply works.',
  },
]

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

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeRole, setActiveRole] = useState(0)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground tracking-tight">
              Edu<span className="text-primary-600">Core</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md animate-pulse-glow"
            >
              Start Free Demo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/30"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="py-2 text-sm font-medium text-slate-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Link href="/login" className="mt-2 w-full text-center py-3 bg-primary-600 text-white font-semibold rounded-xl text-sm">
                  Start Free Demo
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen hero-gradient flex items-center pt-16 overflow-hidden">
        {/* Floating blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-primary-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary-100 rounded-full blur-2xl opacity-60"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                #1 Coaching ERP Platform in India
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
            >
              All-in-One{' '}
              <span className="text-gradient">Coaching & School</span>{' '}
              ERP Platform
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Manage students, teachers, fees, live classes, mock tests, and doubts
              from a single intelligent dashboard. Built for modern coaching institutes.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 hover:bg-primary-800 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                <Play className="w-4 h-4" />
                Start Free Demo
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-foreground font-semibold rounded-2xl border border-slate-200 transition-all duration-200 shadow-sm text-sm"
              >
                Book a Demo
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              {['No credit card required', '14-day free trial', 'Setup in 5 minutes'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative animate-float">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Welcome back 👋</p>
                    <h3 className="text-lg font-bold text-foreground">Arjun Mehta</h3>
                  </div>
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AM</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Study Time', value: '4.2h', icon: Clock, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Rank', value: '#12', icon: Award, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Tests Done', value: '28', icon: ClipboardList, color: 'bg-violet-50 text-violet-600' },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-2xl p-3 text-center">
                      <div className={`w-8 h-8 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-1.5`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      <p className="text-base font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-foreground">Physics — Kinematics</p>
                    <span className="text-xs text-primary-600 font-medium">72%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary-600 to-accent rounded-full"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  {['Maths', 'Chemistry', 'Biology'].map((s, i) => (
                    <div key={s} className="flex-1 bg-slate-50 rounded-xl p-2.5 text-center">
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${[85, 60, 78][i]}%` }}
                          transition={{ duration: 1, delay: 1.3 + i * 0.2 }}
                          className="h-full bg-primary-600 rounded-full"
                        />
                      </div>
                      <p className="text-xs font-medium text-slate-600">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-slate-100"
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Rank improved!</p>
                  <p className="text-xs text-emerald-600">#45 → #12 this week</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 border border-slate-100"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Doubt Answered</p>
                  <p className="text-xs text-slate-500">2 min ago by Sir</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section ref={statsRef} className="bg-primary-800 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const count = useCountUp(s.value, 2000, statsInView)
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="text-center"
                >
                  <p className="text-3xl lg:text-4xl font-black text-white">
                    {count}{s.suffix}
                  </p>
                  <p className="text-sm text-blue-200 font-medium mt-1">{s.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Role Features ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
              Role-Based Portals
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              A Dedicated Experience for Everyone
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              Separate dashboards for students, teachers, and management — each optimized for their specific workflow.
            </motion.p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 rounded-2xl p-1 gap-1">
              {roles.map((r, i) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRole(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeRole === i
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <r.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{r.label}</span>
                  <span className="sm:hidden">{r.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-100">
                <div className="text-center mb-8">
                  <p className="text-base text-slate-600 font-medium">{roles[activeRole].tagline}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {roles[activeRole].features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
                    >
                      <div className="w-10 h-10 bg-primary-50 group-hover:bg-primary-600 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200">
                        <f.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-200" />
                      </div>
                      <h3 className="font-bold text-foreground mb-1 text-sm">{f.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-800 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    Try {roles[activeRole].label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Platform Modules Grid ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
              9 Powerful Modules
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Everything Your Institute Needs
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              From student enrollment to revenue analytics — all modules work together seamlessly.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {modules.map((m) => (
              <motion.div
                key={m.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(37,99,235,0.1)' }}
                className="bg-white rounded-2xl p-6 border border-slate-100 group cursor-default transition-all duration-200"
              >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-600 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <m.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Up and Running in 3 Simple Steps
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500">
              No technical expertise required. Our onboarding team handles everything.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary-200 to-primary-400" />
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="text-center relative"
              >
                <div className="w-24 h-24 bg-primary-600 rounded-3xl flex flex-col items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-100">
                  <span className="text-xs font-bold text-blue-200 mb-0.5">{s.step}</span>
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Loved by Institutes Across India
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {testimonials.map((t) => (
              <motion.article
                key={t.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                className="bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-200"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                </blockquote>
                <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                  <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-foreground mb-4">
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-8">
              No hidden charges. Start free, scale as you grow.
            </motion.p>

            <motion.div variants={fadeUp} className="inline-flex bg-slate-100 rounded-xl p-1">
              {(['monthly', 'yearly'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    billing === b ? 'bg-white text-foreground shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {b === 'monthly' ? 'Monthly' : 'Yearly'}{' '}
                  {b === 'yearly' && <span className="text-emerald-600 text-xs ml-1">Save 20%</span>}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 items-center"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ scale: plan.highlight ? 1.03 : 1.02 }}
                className={`rounded-3xl p-7 border transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-primary-600 border-primary-600 shadow-2xl shadow-primary-100 relative'
                    : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                )}
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-foreground'}`}>
                    ₹{plan.price[billing].toLocaleString()}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>/mo</span>
                </div>
                <p className={`text-xs mb-6 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.desc}</p>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-accent' : 'text-emerald-500'}`} />
                      <span className={plan.highlight ? 'text-white' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-white text-primary-700 hover:bg-blue-50'
                      : 'bg-primary-600 text-white hover:bg-primary-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-600 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Zap className="w-12 h-12 text-accent mx-auto mb-6" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Transform Your Coaching Institute?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
              Join 500+ institutes that already run smarter with EduCore. Setup takes less than 5 minutes. No credit card needed.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/login" className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg text-sm">
                Start Free 14-Day Trial
              </Link>
              <a href="#how-it-works" className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-colors text-sm">
                Watch Demo Video
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">EduCore</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                India's #1 All-in-One ERP platform for coaching institutes and schools.
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">All systems operational</span>
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'How It Works', 'Roadmap'] },
              { title: 'Solutions', links: ['Coaching Centers', 'K-12 Schools', 'Test Prep', 'Online Tutoring'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4 text-white">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 EduCore Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                <a key={l} href="#" className="text-slate-500 hover:text-white text-xs transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
