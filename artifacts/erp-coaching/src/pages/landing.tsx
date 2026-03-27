import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
  X
} from "lucide-react";
import { useAuthContext } from "@/context/auth-context";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary tracking-tight">EduCore</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/login?role=student">
                <button className="px-4 py-2 text-sm font-bold bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-b border-border px-4 pt-2 pb-4 space-y-2 shadow-lg">
            <Link href="/login">
              <button className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg">
                Login
              </button>
            </Link>
            <Link href="/login?role=student">
              <button className="w-full text-center px-4 py-3 text-sm font-bold bg-accent text-accent-foreground rounded-lg">
                Get Started Free
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-24 pb-16 px-4 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-8 border border-accent/30">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          DEMO VERSION - All Features Unlocked
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          The All-in-One <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ERP Platform</span> <br className="hidden md:block" />
          for Coaching Institutes
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          EduCore streamlines students, teachers, and management into one powerful system. Courses, tests, doubts, attendance, fees — everything in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Link href="/login?role=student">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-accent text-accent-foreground rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Start as Student
            </button>
          </Link>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold border-2 border-primary text-primary rounded-xl hover:bg-primary/5 transition-all"
          >
            Explore Platform
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-16">No credit card required • Free demo access</p>

        {/* Animated Mock Dashboard */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto max-w-4xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border p-4 md:p-8"
        >
          <div className="absolute top-0 left-0 w-full h-12 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Study Time', value: '4h 32m', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Current Rank', value: '#42', icon: BarChart2, color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: 'Streak', value: '7 Days', icon: Play, color: 'text-orange-500', bg: 'bg-orange-50' }
            ].map((stat, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border flex flex-col items-center justify-center gap-3">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-2`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. LOGOS/TRUST BAR */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by 500+ coaching institutes across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-70 grayscale">
            {['DreamEdu', 'BrightMinds', 'TopRanker', 'StudyHub', 'ExcelAcademy'].map((name) => (
              <div key={name} className="px-6 py-3 bg-secondary rounded-full text-foreground font-bold text-lg shadow-sm border border-border/50">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROLE FEATURES SECTION */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Designed for Every Role</h2>
          <p className="text-xl text-muted-foreground">Three powerful views — each tailored to what matters most</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border shadow-md overflow-hidden flex flex-col"
          >
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Student Portal</h3>
              <ul className="space-y-4 mb-8 flex-1">
                {['Subject-wise video lectures with progress tracking', 'Adaptive mock tests with instant analysis', 'Live doubt chat with subject teachers', 'Rank tracking and performance analytics', 'Daily streak and achievement system'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login?role=student">
                <button className="w-full py-3 rounded-xl border-2 border-border font-bold hover:bg-secondary transition-colors">
                  Login as Student
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Teacher Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-3xl border-2 border-accent shadow-xl overflow-hidden flex flex-col relative md:-translate-y-4"
          >
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
              MOST USED
            </div>
            <div className="h-2 w-full bg-accent"></div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Teacher Portal</h3>
              <ul className="space-y-4 mb-8 flex-1">
                {['Manage today\'s class schedule', 'Grade assignments and give feedback', 'Answer student doubt queries', 'View class performance analytics', 'Create and schedule tests'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login?role=teacher">
                <button className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors shadow-sm">
                  Login as Teacher
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Management Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl border border-border shadow-md overflow-hidden flex flex-col"
          >
            <div className="h-2 w-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Management Portal</h3>
              <ul className="space-y-4 mb-8 flex-1">
                {['Complete student enrollment management', 'Fee collection and payment tracking', 'Attendance monitoring across all classes', 'Staff and teacher management', 'Financial reports and analytics'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login?role=management">
                <button className="w-full py-3 rounded-xl border-2 border-border font-bold hover:bg-secondary transition-colors">
                  Login as Management
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. PLATFORM FEATURES GRID */}
      <section className="py-24 bg-secondary/50 border-y border-border px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything Your Institute Needs</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Video Lectures', icon: Play, color: 'text-blue-500', bg: 'bg-blue-100', desc: 'HD lectures for all subjects' },
              { title: 'Mock Tests', icon: ClipboardList, color: 'text-orange-500', bg: 'bg-orange-100', desc: 'Full-length and sectional tests' },
              { title: 'Doubt Resolution', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-100', desc: 'Live teacher chat support' },
              { title: 'Fee Management', icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-100', desc: 'Automated fee tracking and reminders' },
              { title: 'Attendance', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-100', desc: 'QR-based attendance with reports' },
              { title: 'Analytics', icon: BarChart2, color: 'text-red-500', bg: 'bg-red-100', desc: 'Deep performance insights for all roles' }
            ].map((f, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                <div className={`p-4 rounded-xl ${f.bg} shrink-0`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{f.title}</h4>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-24 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Get Started in 3 Simple Steps</h2>
        
        <div className="relative flex flex-col md:flex-row gap-12 md:gap-8 items-start justify-between">
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] border-t-2 border-dashed border-primary/30 -z-10"></div>
          
          {[
            { step: 1, title: 'Choose Your Role', desc: 'Select whether you are a Student, Teacher, or Management staff.' },
            { step: 2, title: 'Login to EduCore', desc: 'Use your institute credentials to access your personalized dashboard.' },
            { step: 3, title: 'Start Learning / Teaching', desc: 'Access all features instantly. No setup needed.' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex-1 flex flex-col items-center bg-card md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border md:border-none border-border"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 shadow-lg border-4 border-background">
                {s.step}
              </div>
              <h3 className="font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-card border-y border-border px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-8">Flexible plans for institutes of all sizes</p>
            
            <div className="inline-flex items-center bg-secondary p-1 rounded-xl">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${billingCycle === 'monthly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Yearly <span className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-background rounded-3xl border border-border p-8 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-2">Starter</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">For small coaching centers up to 100 students</p>
              <div className="mb-6">
                <span className="text-4xl font-black">Rs.{billingCycle === 'monthly' ? '2,999' : '2,399'}</span>
                <span className="text-muted-foreground">/mo</span>
                {billingCycle === 'yearly' && <div className="text-sm text-primary font-medium mt-1">Billed annually</div>}
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['100 students', '5 teachers', 'Basic analytics', 'Email support', 'All core modules'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-border font-bold hover:bg-secondary transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Growth */}
            <div className="bg-primary rounded-3xl border-none p-8 flex flex-col text-primary-foreground relative md:scale-105 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <p className="text-primary-foreground/80 text-sm mb-6 h-10">For growing institutes up to 500 students</p>
              <div className="mb-6">
                <span className="text-4xl font-black">Rs.{billingCycle === 'monthly' ? '6,999' : '5,599'}</span>
                <span className="text-primary-foreground/80">/mo</span>
                {billingCycle === 'yearly' && <div className="text-sm text-accent font-medium mt-1">Billed annually</div>}
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['500 students', '25 teachers', 'Advanced analytics', 'Priority support', 'Custom branding', 'Fee management', 'Attendance system'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-accent">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors shadow-lg">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-background rounded-3xl border border-border p-8 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
              <p className="text-sm text-muted-foreground mb-6 h-10">For large institutes with 500+ students</p>
              <div className="mb-6">
                <span className="text-4xl font-black">Custom</span>
                <div className="text-sm text-transparent mt-1">Pricing</div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited students', 'Unlimited teachers', 'Dedicated support', 'Custom integrations', 'White-label solution', 'API access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-border font-bold hover:bg-secondary transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mt-8">All plans include 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* 8. DEMO NOTICE BANNER */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto bg-accent/10 border border-accent rounded-3xl p-8 md:p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">This is a Demo Version</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            You are viewing a full-featured demo of EduCore. All data is simulated. 
            No real students, teachers, or financial data is used. Perfect for evaluation!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login?role=student">
              <button className="px-6 py-3 bg-card border border-border rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
                Explore Student Demo
              </button>
            </Link>
            <Link href="/login?role=teacher">
              <button className="px-6 py-3 bg-card border border-border rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
                Explore Teacher Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-card border-t border-border pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl text-primary tracking-tight">EduCore</span>
              </div>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                All-in-One ERP for Modern Coaching Institutes
              </p>
              <div className="flex gap-6">
                <a href="#features" className="text-foreground hover:text-primary font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-foreground hover:text-primary font-medium transition-colors">Pricing</a>
                <Link href="/login" className="text-foreground hover:text-primary font-medium transition-colors">Login</Link>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-6 md:p-8 flex flex-col items-start md:items-end text-left md:text-right">
              <h3 className="font-bold text-xl mb-4">Contact Developer</h3>
              <p className="text-muted-foreground mb-6 max-w-xs">
                For demos, enterprise pricing, or custom development inquiries
              </p>
              <a 
                href="https://wa.me/919506933715" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp +91 9506933715
              </a>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 EduCore. All rights reserved.</p>
            <p>Built with React + TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
