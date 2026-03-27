import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  GraduationCap,
  BookOpen,
  Building2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/context/auth-context";
import { UserRole } from "@/hooks/use-auth";

function useQueryParams() {
  const search = window.location.search;
  return new URLSearchParams(search);
}

const ROLES = [
  {
    key: "student" as UserRole,
    label: "Student",
    sub: "Access courses, tests & doubts",
    icon: GraduationCap,
    gradient: "from-blue-600 to-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200 hover:border-blue-500",
    badge: "bg-blue-100 text-blue-800",
    perks: ["HD Video Lectures", "Mock Tests", "Doubt Resolution"],
  },
  {
    key: "teacher" as UserRole,
    label: "Teacher",
    sub: "Manage classes and students",
    icon: BookOpen,
    gradient: "from-indigo-600 to-blue-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200 hover:border-indigo-500",
    badge: "bg-indigo-100 text-indigo-800",
    perks: ["Class Scheduling", "Grade Assignments", "Performance Analytics"],
  },
  {
    key: "management" as UserRole,
    label: "Management",
    sub: "Run your entire institute",
    icon: Building2,
    gradient: "from-sky-600 to-cyan-500",
    bg: "bg-sky-50",
    border: "border-sky-200 hover:border-sky-500",
    badge: "bg-sky-100 text-sky-800",
    perks: ["Fee Collection", "Attendance Monitoring", "Financial Reports"],
  },
];

export default function Login() {
  const { login } = useAuthContext();
  const [, setLocation] = useLocation();
  const query = useQueryParams();
  const initialRole = query.get("role") as UserRole | null;

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    ["student", "teacher", "management"].includes(initialRole as string) ? initialRole : null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(selectedRole);
    setLocation(`/${selectedRole}/dashboard`);
  };

  const activeRole = ROLES.find((r) => r.key === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#DBEAFE] flex flex-col items-center justify-center p-4">

      {/* Floating blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {/* Logo */}
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 mb-8 cursor-pointer group relative z-10"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl text-[#0F172A] tracking-tight">
            Edu<span className="text-[#2563EB]">Core</span>
          </span>
        </motion.div>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden relative z-10"
      >
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* Step 1: Role Selection */
            <motion.div
              key="role-select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-3">Welcome to EduCore</h1>
                <p className="text-slate-500 text-lg">Choose your role to continue</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {ROLES.map((role) => (
                  <motion.button
                    key={role.key}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.key)}
                    className={`flex flex-col items-center p-8 ${role.bg} border-2 ${role.border} rounded-2xl transition-all shadow-sm hover:shadow-lg group`}
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                      <role.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-black text-xl text-[#0F172A] mb-1.5">{role.label}</h3>
                    <p className="text-slate-500 text-sm text-center mb-4">{role.sub}</p>
                    <ul className="w-full space-y-1.5">
                      {role.perks.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-sm text-slate-400 mt-8 flex items-center justify-center gap-1.5">
                <Shield className="w-4 h-4 text-slate-400" />
                Bank-grade security · Your data is always safe
              </p>
            </motion.div>
          ) : (
            /* Step 2: Login Form */
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 min-h-[480px]"
            >
              {/* Left Panel */}
              {activeRole && (
                <div className={`hidden lg:flex lg:col-span-2 bg-gradient-to-br ${activeRole.gradient} flex-col justify-between p-10 text-white`}>
                  <div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                      <activeRole.icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">{activeRole.label} Portal</h2>
                    <p className="text-white/80 text-sm">{activeRole.sub}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-4">What you get</p>
                    <ul className="space-y-3">
                      {activeRole.perks.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-white/90">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 p-3 rounded-xl bg-white/10 border border-white/20">
                      <p className="text-xs text-white/80 font-medium">
                        🔓 Demo mode: any credentials will work
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Form */}
              <div className="lg:col-span-3 p-8 md:p-12 flex flex-col">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-[#2563EB] mb-8 transition-colors text-sm font-semibold w-fit"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to roles
                </button>

                <div className="mb-8">
                  {activeRole && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold mb-4 ${activeRole.badge}`}>
                      <activeRole.icon className="w-3.5 h-3.5" />
                      Signing in as {activeRole.label}
                    </span>
                  )}
                  <h2 className="text-3xl font-black text-[#0F172A]">Sign in to EduCore</h2>
                  <p className="text-slate-500 mt-1">Welcome back! Let's continue your journey.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5 flex-1">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1.5" htmlFor="email">
                      Email or Username
                    </label>
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@educore.in"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 transition-all text-[#0F172A] placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1.5" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 transition-all text-[#0F172A] placeholder:text-slate-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                      <span className="text-sm text-slate-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-bold text-[#2563EB] hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#2563EB] text-white font-black text-base rounded-xl shadow-md hover:bg-[#1E40AF] hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Signing in…
                      </>
                    ) : (
                      <>Login as <span className="capitalize">{selectedRole}</span></>
                    )}
                  </motion.button>
                </form>

                <div className="mt-5 p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Demo Mode:</span> Enter any email and password to proceed.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-slate-400 text-xs mt-6 relative z-10"
      >
        © 2025 EduCore Technologies · Privacy Policy · Terms of Service
      </motion.p>
    </div>
  );
}
