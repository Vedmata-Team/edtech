import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Play,
  ClipboardList,
  MessageCircle,
  CreditCard,
  Calendar,
  BarChart2,
  Menu,
  X,
  CheckCircle2,
  Star,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Award,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER = "919999999999"; // replace with real number
const WHATSAPP_MSG = encodeURIComponent("Hi! I'd like to know more about EduCore ERP. Website: edtech.vmdonline.cloud");

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white px-3 py-2.5 rounded-full shadow-xl hover:bg-[#1ebe5d] transition-all hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="text-xs font-bold hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

function AnnouncementStrip() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-[#0F172A] text-xs font-semibold flex items-center py-2 pr-8 overflow-hidden">
      {/* Mobile: scrolling marquee */}
      <div className="flex sm:hidden flex-1 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16">
          <span>🇮🇳 Bharat ka #1 Coaching ERP — AI-powered doubt resolution ab live hai! <a href="#features" className="underline font-bold text-blue-700">Explore now →</a></span>
          <span>🇮🇳 Bharat ka #1 Coaching ERP — AI-powered doubt resolution ab live hai! <a href="#features" className="underline font-bold text-blue-700">Explore now →</a></span>
        </div>
      </div>
      {/* Desktop: static centered */}
      <span className="hidden sm:flex flex-1 justify-center gap-2">
        <span>🇮🇳</span>
        Bharat ka #1 Coaching ERP — AI-powered doubt resolution ab live hai!
        <a href="#features" className="underline font-bold ml-1 text-blue-700">Explore now →</a>
      </span>
      <button onClick={() => setVisible(false)} aria-label="Dismiss" className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:opacity-70 shrink-0"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}

/* ─── Animated Counter ─────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

/* ─── Floating Shapes Background ───────────────────────────────── */
function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 animate-float-slow"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full opacity-15 animate-float"
        style={{ background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)", animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10 animate-float-slow"
        style={{ background: "radial-gradient(circle, #1E40AF 0%, transparent 70%)", animationDelay: "2s" }} />
    </div>
  );
}

/* ─── Section Fade-in Wrapper ───────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  const roles = [
    {
      label: "Student",
      icon: GraduationCap,
      color: "#2563EB",
      bg: "from-blue-600 to-blue-500",
      lightBg: "bg-blue-50 border-blue-200",
      textColor: "text-blue-900",
      subColor: "text-blue-700",
      role: "student",
      features: [
        "Subject-wise HD video lectures with progress tracking",
        "Adaptive mock tests with instant score analysis",
        "Live doubt chat with subject teachers",
        "Rank tracking and performance analytics",
        "Daily streak and achievement system",
        "Personalized study schedule generator",
      ],
    },
    {
      label: "Teacher",
      icon: BookOpen,
      color: "#1E40AF",
      bg: "from-indigo-600 to-blue-600",
      lightBg: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-900",
      subColor: "text-indigo-700",
      role: "teacher",
      features: [
        "Manage today's class schedule effortlessly",
        "Grade assignments and give instant feedback",
        "Answer student doubt queries in real-time",
        "View class performance analytics dashboard",
        "Create and schedule timed mock tests",
        "Upload and manage course videos",
      ],
    },
    {
      label: "Management",
      icon: Building2,
      color: "#0284c7",
      bg: "from-sky-600 to-cyan-500",
      lightBg: "bg-sky-50 border-sky-200",
      textColor: "text-sky-900",
      subColor: "text-sky-700",
      role: "management",
      features: [
        "Complete student enrollment management",
        "Fee collection and payment tracking",
        "Attendance monitoring across all classes",
        "Staff and teacher management portal",
        "Financial reports and analytics",
        "White-label branding options",
      ],
    },
  ];

  const features = [
    { title: "HD Video Lectures", icon: Play, color: "text-blue-600", bg: "bg-blue-100", desc: "Subject-specific visual aids with resume-anywhere capability across all devices." },
    { title: "Adaptive Mock Tests", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-100", desc: "AI-powered tests that adapt to weak areas. Instant detailed analysis after every attempt." },
    { title: "Live Doubt Resolution", icon: MessageCircle, color: "text-sky-600", bg: "bg-sky-100", desc: "Connect students with teachers in real-time. Step-by-step solutions with diagrams." },
    { title: "Fee Management", icon: CreditCard, color: "text-blue-700", bg: "bg-blue-50", desc: "Automated fee tracking, payment reminders, receipts and GST invoicing built-in." },
    { title: "QR Attendance", icon: Calendar, color: "text-cyan-600", bg: "bg-cyan-100", desc: "One-scan attendance marking with automated parent notifications and reports." },
    { title: "Deep Analytics", icon: BarChart2, color: "text-indigo-700", bg: "bg-indigo-50", desc: "Peer ranking, subject scores, topic-level gaps, and cohort comparison in real-time." },
    { title: "Leaderboard & Gamification", icon: Award, color: "text-sky-700", bg: "bg-sky-50", desc: "Daily streaks, achievement badges, and class leaderboards to drive student motivation." },
    { title: "Role-based Dashboards", icon: Users, color: "text-blue-600", bg: "bg-blue-100", desc: "Custom, purpose-built views for students, teachers, and management — all in one system." },
    { title: "Bank-grade Security", icon: Shield, color: "text-indigo-600", bg: "bg-indigo-100", desc: "End-to-end encryption, 2FA login, and daily data backups. Your data is always safe." },
  ];

  const testimonials = [
    { name: "Pradeep Sharma", role: "Director, BrightMinds Academy, Kota", rating: 5, quote: "Hamare 3 coaching centres ka poora kaam EduCore ne badal diya. Fee collection, attendance, student tracking — sab seamless. Admin effort 70% kam ho gaya.", avatar: "PS" },
    { name: "Ananya Gupta", role: "Physics Teacher, TopRanker Institute, Patna", rating: 5, quote: "Doubt resolution feature ne meri life badal di. Pehle 5 doubts solve karne mein jo time lagta tha, ab 20+ ho jaate hain. Mere students ke scores dramatically improve hue hain.", avatar: "AG" },
    { name: "Rohit Mehta", role: "Student, NEET Batch 2025, Jaipur", rating: 5, quote: "Adaptive mock tests ne mujhe exactly pata chala kahan weak hoon. 3 mahine mein rank #450 se #89 ho gaya! Maa-baap ki aankhon mein jo khushi thi, woh priceless hai.", avatar: "RM" },
    { name: "Meera Patel", role: "Centre Manager, StudyHub, Surat", rating: 5, quote: "EduCore ka analytics dashboard hamari team ko pehle se hi at-risk students dikhata hai. Bharat ke har chhote sheher ke coaching centre ko yeh chahiye.", avatar: "MP" },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Coaching Institutes" },
    { value: 85000, suffix: "+", label: "Active Students" },
    { value: 98, suffix: "%", label: "Satisfaction Rate" },
    { value: 4.8, suffix: "/5", label: "Average Rating", isDecimal: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnnouncementStrip />
      <WhatsAppButton />

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <header role="banner">
        <nav
          className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100" : "bg-transparent"
          }`}
          aria-label="Primary navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-black text-xl text-[#0F172A] tracking-tight">
                    Edu<span className="text-[#2563EB]">Core</span>
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <button className="px-5 py-2 text-sm font-bold bg-[#2563EB] text-white rounded-xl hover:bg-[#1E40AF] transition-colors shadow-md flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Client Portal
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                    Try Free Demo
                  </button>
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-b border-blue-100 shadow-lg overflow-hidden"
              >
                <div className="px-4 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-2 pb-1 flex flex-col gap-2">
                    <Link href="/login">
                      <button className="w-full py-3 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Client Portal
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="w-full py-3 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                        Try Free Demo
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <main>
        <section className="relative pt-36 md:pt-44 pb-20 px-4 hero-gradient overflow-hidden" aria-labelledby="hero-heading">
          <FloatingBlobs />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold mb-8 shadow-sm"
              >
                <span>🇮🇳</span>
                Proudly Built for Bharat's Coaching Institutes
                <span className="flex items-center gap-1 text-yellow-600">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  4.8
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-[#0F172A]"
              >
                Har Bacche Ka Sapna
                <br />
                <span className="text-gradient">Poora Karo</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                From Kota to Kanpur, from small-town coaching centres to big-city institutes —
                EduCore brings every student, teacher, and director onto one powerful platform.
                <span className="block mt-2 text-base text-slate-500">Video lectures · Mock tests · Fee collection · Attendance — sab ek jagah.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link href="/login">
                  <button className="group w-full sm:w-auto px-6 py-3.5 text-sm font-bold bg-[#2563EB] text-white rounded-2xl shadow-lg hover:bg-[#1E40AF] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    Try Free Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <button className="w-full px-6 py-3.5 text-sm font-bold border-2 border-[#2563EB] text-[#2563EB] rounded-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    See How It Works
                  </button>
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-slate-500 mb-16"
              >
                No credit card required · Free 14-day trial · Setup in minutes · 🇮🇳 Made in India
              </motion.p>

              {/* Hero Dashboard Mock */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-4xl"
                aria-hidden="true"
              >
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-sky-300/10 rounded-3xl blur-3xl scale-105" />

                <div className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
                  {/* Browser Bar */}
                  <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-lg px-3 py-1 text-xs text-slate-400 border border-slate-200 text-left max-w-64 mx-auto">
                        app.educore.in/student/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-5 md:p-8 bg-[#F8FAFC]">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      {[
                        { label: "Study Time", value: "4h 32m", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
                        { label: "Rank", value: "#42", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-100" },
                        { label: "Tests Done", value: "18", icon: CheckCircle2, color: "text-sky-600", bg: "bg-sky-100" },
                        { label: "Streak", value: "7 Days 🔥", icon: Zap, color: "text-orange-500", bg: "bg-orange-100" },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm"
                        >
                          <div className={`w-7 h-7 ${stat.bg} rounded-lg flex items-center justify-center mb-1.5`}>
                            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">{stat.label}</p>
                          <p className="text-sm font-bold text-[#0F172A] mt-0.5">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Bars */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                      <p className="text-sm font-bold text-[#0F172A] mb-4">Subject Progress</p>
                      <div className="space-y-3">
                        {[
                          { subject: "Physics", pct: 78, color: "bg-blue-500" },
                          { subject: "Mathematics", pct: 65, color: "bg-indigo-500" },
                          { subject: "Chemistry", pct: 52, color: "bg-sky-500" },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-20 text-left font-medium">{s.subject}</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.pct}%` }}
                                transition={{ delay: 0.9 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                                className={`h-full ${s.color} rounded-full`}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-700 w-10 text-right">{s.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-2 md:-right-8 bg-white rounded-2xl shadow-xl border border-blue-100 px-4 py-3 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Test Submitted!</p>
                    <p className="text-xs text-slate-500">Score: 94/100</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-2 md:-left-8 bg-white rounded-2xl shadow-xl border border-blue-100 px-4 py-3 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Doubt Resolved</p>
                    <p className="text-xs text-slate-500">By Dr. Ramesh • 2m ago</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            aria-hidden="true"
          >
            <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS BANNER ─────────────────────────────────────────── */}
        <section className="py-14 px-4 bg-[#2563EB]" aria-label="Platform statistics">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-6">
              <p className="text-blue-200 text-sm font-semibold">🇮🇳 Bharat ke coaching institutes ka bharosa</p>
            </FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-blue-500">
              {stats.map((stat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="text-center px-6 py-4">
                    <p className="text-3xl md:text-4xl font-black text-white mb-1">
                      {stat.isDecimal ? (
                        <>{stat.value}{stat.suffix}</>
                      ) : (
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      )}
                    </p>
                    <p className="text-sm font-medium text-blue-200">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ────────────────────────────────────────────── */}
        <section className="py-10 bg-white border-b border-slate-100 px-4" aria-label="Trusted by">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Trusted by 500+ coaching institutes across Bharat
            </p>
            <p className="text-xs text-slate-400 mb-6">Kota · Patna · Hyderabad · Jaipur · Lucknow · Pune · Indore · Surat</p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
              {["DreamEdu", "BrightMinds", "TopRanker Institute", "StudyHub", "Excel Academy", "Merit Classes"].map((name) => (
                <div key={name} className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-bold text-sm hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROLE TABS ─────────────────────────────────────────────── */}
        <section id="features" className="py-24 px-4 bg-[#F8FAFC]" aria-labelledby="roles-heading">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full border border-blue-200 mb-5">
                Built for Every Role
              </span>
              <h2 id="roles-heading" className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">
                One Platform, Three Powerful Views
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Whether you are a student, teacher, or administrator — EduCore gives you exactly what you need.
              </p>
            </FadeIn>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-10">
              <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm gap-1">
                {roles.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === i
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <r.icon className="w-4 h-4" />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Left: Features List */}
                <div>
                  <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl ${roles[activeTab].lightBg} border mb-6`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roles[activeTab].bg} flex items-center justify-center`}>
                      {(() => { const Icon = roles[activeTab].icon; return <Icon className="w-5 h-5 text-white" />; })()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Portal</p>
                      <p className={`font-black text-lg ${roles[activeTab].textColor}`}>{roles[activeTab].label}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {roles[activeTab].features.map((feat, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-slate-700 font-medium">{feat}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href={`/login?role=${roles[activeTab].role}`}>
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1E40AF] transition-colors shadow-md hover:shadow-lg">
                      Login as {roles[activeTab].label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

                {/* Right: Visual Card */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${roles[activeTab].bg} opacity-10 rounded-3xl blur-2xl`} />
                  <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${roles[activeTab].bg} flex items-center justify-center mb-5 shadow-md`}>
                      {(() => { const Icon = roles[activeTab].icon; return <Icon className="w-7 h-7 text-white" />; })()}
                    </div>
                    <h3 className="text-xl font-black text-[#0F172A] mb-2">{roles[activeTab].label} Portal</h3>
                    <p className="text-slate-500 text-sm mb-6">Everything you need, perfectly tailored for your role.</p>

                    <div className="grid grid-cols-2 gap-3">
                      {roles[activeTab].features.slice(0, 4).map((f, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mb-1.5" />
                          <p className="text-xs font-semibold text-slate-700 leading-snug">{f.split(" ").slice(0, 4).join(" ")}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                      <p className="text-xs font-bold text-blue-700">✓ Free demo access — no sign-up required</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── PLATFORM FEATURES GRID ──────────────────────────────── */}
        <section className="py-16 px-4 bg-white" aria-labelledby="platform-features-heading">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-sky-50 text-sky-600 text-sm font-bold rounded-full border border-sky-200 mb-4">
                All Modules Included
              </span>
              <h2 id="platform-features-heading" className="text-2xl md:text-4xl font-black text-[#0F172A] mb-3">
                Everything Your Institute Needs
              </h2>
              <p className="text-base text-slate-500 max-w-2xl mx-auto">
                9 powerful modules. Zero integrations needed. All included in every plan.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {features.map((f, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <article className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <div className={`w-9 h-9 md:w-12 md:h-12 ${f.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <f.icon className={`w-4 h-4 md:w-6 md:h-6 ${f.color}`} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-[#0F172A] mb-1">{f.title}</h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed hidden sm:block">{f.desc}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF]" aria-labelledby="how-heading">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full border border-blue-200 mb-5">
                Get Started in Minutes
              </span>
              <h2 id="how-heading" className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">
                Simple 3-Step Setup
              </h2>
              <p className="text-lg text-slate-500">No technical knowledge required. Your institute is live within minutes.</p>
            </FadeIn>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-blue-300 via-sky-400 to-blue-300" aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Choose Your Plan",
                    desc: "Pick the plan that fits your institute size. No complex onboarding — just sign up and go.",
                    icon: Sparkles,
                    color: "from-blue-600 to-blue-500",
                  },
                  {
                    step: "02",
                    title: "Add Your Team",
                    desc: "Invite teachers and enroll students in bulk via CSV. Everyone gets instant dashboard access.",
                    icon: Users,
                    color: "from-indigo-600 to-blue-600",
                  },
                  {
                    step: "03",
                    title: "Go Live Instantly",
                    desc: "All modules are pre-configured. Classes, tests, fees, and attendance — live on day one.",
                    icon: Zap,
                    color: "from-sky-600 to-cyan-500",
                  },
                ].map((s, i) => (
                  <FadeIn key={i} delay={i * 0.15}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
                        <s.icon className="w-8 h-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full border-2 border-blue-200 flex items-center justify-center text-xs font-black text-blue-600">
                          {i + 1}
                        </div>
                      </div>
                      <h3 className="font-black text-lg text-[#0F172A] mb-2">{s.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section id="testimonials" className="py-24 px-4 bg-white" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full border border-blue-200 mb-5">
                🇮🇳 Real Stories from Real Institutes
              </span>
              <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-black text-[#0F172A] mb-2">
                Dil Se — Loved Across Bharat
              </h2>
              <p className="text-slate-500 text-sm mb-4">From small-town coaching centres to city institutes, EduCore is changing lives.</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                <span className="ml-2 text-slate-600 font-bold">4.8 / 5 from 1,247 reviews</span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <blockquote className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4 flex-1 italic">"{t.quote}"</p>
                    <footer className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {t.avatar}
                      </div>
                      <div>
                        <cite className="font-bold text-sm text-[#0F172A] not-italic">{t.name}</cite>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                    </footer>
                  </blockquote>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF]" aria-labelledby="pricing-heading">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full border border-blue-200 mb-5">
                Transparent Pricing
              </span>
              <h2 id="pricing-heading" className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4">
                Simple Plans for Every Institute
              </h2>
              <p className="text-lg text-slate-500 mb-8">No hidden fees. Cancel anytime. All plans include every module.</p>

              {/* Toggle */}
              <div className="inline-flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
                {(["monthly", "yearly"] as const).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      billingCycle === cycle ? "bg-[#2563EB] text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    {cycle === "yearly" && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black ${billingCycle === "yearly" ? "bg-sky-400 text-white" : "bg-green-100 text-green-700"}`}>
                        Save 20%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {/* Starter */}
              <FadeIn>
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 md:p-8 flex flex-col hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-black text-[#0F172A] mb-1">Starter</h3>
                  <p className="text-xs text-slate-500 mb-4">Perfect for small coaching centers</p>
                  <div className="mb-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-[#0F172A]">₹{billingCycle === "monthly" ? "2,999" : "2,399"}</span>
                      <span className="text-slate-500 pb-1 text-sm">/mo</span>
                    </div>
                    {billingCycle === "yearly" && <p className="text-xs text-blue-600 font-bold mt-1">Save ₹7,200/yr</p>}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {["Up to 100 students", "5 teacher accounts", "All core modules", "Email & chat support", "Basic analytics"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login">
                    <button className="w-full py-3 rounded-xl border-2 border-[#2563EB] text-[#2563EB] font-bold text-sm hover:bg-blue-50 transition-colors">
                      Start Free Trial
                    </button>
                  </Link>
                </div>
              </FadeIn>

              {/* Growth — Most Popular */}
              <FadeIn delay={0.1}>
                <div className="relative bg-[#2563EB] rounded-2xl border-none p-5 md:p-8 flex flex-col shadow-2xl md:-translate-y-4 hover:md:-translate-y-6 transition-transform duration-300">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-400 text-[#0F172A] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide shadow-lg">
                    Most Popular
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">Growth</h3>
                  <p className="text-blue-200 text-xs mb-4">For growing institutes up to 500 students</p>
                  <div className="mb-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-white">₹{billingCycle === "monthly" ? "6,999" : "5,599"}</span>
                      <span className="text-blue-300 pb-1 text-sm">/mo</span>
                    </div>
                    {billingCycle === "yearly" && <p className="text-xs text-sky-300 font-bold mt-1">Save ₹16,800/yr</p>}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {["Up to 500 students", "25 teacher accounts", "Advanced analytics", "Priority support (4hr SLA)", "Custom branding", "Fee management & GST", "QR attendance system"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                        <span className="text-blue-100">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login">
                    <button className="w-full py-3 rounded-xl bg-sky-400 text-[#0F172A] font-bold text-sm hover:bg-sky-300 transition-colors shadow-lg">
                      Get Started
                    </button>
                  </Link>
                </div>
              </FadeIn>

              {/* Enterprise */}
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 md:p-8 flex flex-col hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-black text-[#0F172A] mb-1">Enterprise</h3>
                  <p className="text-xs text-slate-500 mb-4">For large institutes with 500+ students</p>
                  <div className="mb-4">
                    <span className="text-3xl font-black text-[#0F172A]">Custom</span>
                    <p className="text-xs text-slate-400 mt-1">Tailored to your needs</p>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {["Unlimited students & teachers", "Dedicated account manager", "Custom integrations & API", "White-label solution", "SLA-backed uptime (99.9%)", "On-premise deployment"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-xl border-2 border-[#1E40AF] text-[#1E40AF] font-bold text-sm hover:bg-blue-50 transition-colors">
                    Contact Sales
                  </button>
                </div>
              </FadeIn>
            </div>

            <FadeIn>
              <p className="text-center text-slate-500 mt-10 text-sm">
                All plans include a <strong>14-day free trial</strong>. No credit card required. Cancel anytime.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── DEMO CTA ─────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-white" aria-label="Demo and call to action">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="relative overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-3xl p-10 md:p-16 text-center shadow-2xl">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" aria-hidden="true" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-white text-sm font-bold mb-6">
                    <span>🇮🇳</span>
                    Bharat ka apna ERP — Live Demo, No Sign-up
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
                    Apne Institute Ko Aage Badhao
                  </h2>
                  <p className="text-sky-200 text-base font-semibold mb-3">Your institute. Your students. Your pride.</p>
                  <p className="text-blue-100 text-base max-w-2xl mx-auto mb-10">
                    Har bacche ka rank upar jaaye, har teacher ka kaam aasaan ho, har director ka institute grow kare —
                    yahi hai EduCore ka vaada. 500+ institutes already on board.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/login?role=student">
                      <button className="px-8 py-4 bg-white text-[#2563EB] font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Explore Student Demo
                      </button>
                    </Link>
                    <Link href="/login?role=teacher">
                      <button className="px-8 py-4 bg-sky-400 text-[#0F172A] font-bold rounded-2xl hover:bg-sky-300 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Explore Teacher Demo
                      </button>
                    </Link>
                    <Link href="/login?role=management">
                      <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-bold rounded-2xl hover:bg-white/20 transition-colors">
                        Management Demo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-[#0F172A] text-white pt-10 pb-20 md:pb-10 px-4" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-lg">Edu<span className="text-[#38BDF8]">Core</span></span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                India's most trusted ERP for coaching institutes. Streamline operations, boost performance, grow effortlessly.
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-slate-400 text-xs ml-1.5">4.8 · 1,247 reviews</span>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#1ebe5d] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Product</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {["Features", "Pricing", "How it Works", "Student Portal", "Teacher Portal", "Management Portal"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#38BDF8] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {["About Us", "Blog", "Case Studies", "Careers", "Privacy Policy", "Terms of Service"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#38BDF8] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © 2025 EduCore Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs font-semibold">🇮🇳 Bharat Mein Banaya Gaya — Made with ❤️ in India</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-slate-500 text-xs">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
