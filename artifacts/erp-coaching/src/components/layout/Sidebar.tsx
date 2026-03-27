import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  ClipboardList,
  MessageCircle,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  CreditCard,
  Calendar,
  FileText,
  LogOut,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-context";

const STUDENT_NAV = [
  { name: "Dashboard", icon: Home,          path: "/student/dashboard" },
  { name: "Courses",   icon: BookOpen,      path: "/student/courses" },
  { name: "Tests",     icon: ClipboardList, path: "/student/tests" },
  { name: "Doubts",    icon: MessageCircle, path: "/student/doubts" },
  { name: "Analytics", icon: BarChart2,     path: "/student/analytics" },
  { name: "Settings",  icon: Settings,      path: "/student/settings" },
];

const TEACHER_NAV = [
  { name: "Dashboard",       icon: Home,          path: "/teacher/dashboard" },
  { name: "Live Classes",    icon: Video,         path: "/teacher/classes" },
  { name: "Create Tests",    icon: ClipboardList, path: "/teacher/assignments" },
  { name: "Doubts Inbox",    icon: MessageCircle, path: "/teacher/doubts" },
  { name: "Analytics",       icon: BarChart2,     path: "/teacher/analytics" },
  { name: "My Students",     icon: Users,         path: "/teacher/students" },
  { name: "System Settings", icon: Settings,      path: "/teacher/settings" },
];

const MANAGEMENT_NAV = [
  { name: "Dashboard",      icon: Home,          path: "/management/dashboard" },
  { name: "Students",       icon: Users,         path: "/management/students" },
  { name: "Teachers",       icon: BookOpen,      path: "/management/teachers" },
  { name: "Fee Management", icon: CreditCard,    path: "/management/fees" },
  { name: "Attendance",     icon: Calendar,      path: "/management/attendance" },
  { name: "Reports",        icon: FileText,      path: "/management/reports" },
  { name: "Settings",       icon: Settings,      path: "/management/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [location, setLocation] = useLocation();
  const { role, logout } = useAuthContext();

  const navItems =
    role === "student"    ? STUDENT_NAV :
    role === "teacher"    ? TEACHER_NAV :
    role === "management" ? MANAGEMENT_NAV : [];

  const handleLogout = () => { logout(); setLocation("/"); };

  const getRoleDisplay = () => {
    switch (role) {
      case "student":    return { name: "Aryan S.",   roleName: "Student",        initials: "AR" };
      case "teacher":    return { name: "Rahul Sir",  roleName: "Teacher Portal", initials: "RS" };
      case "management": return { name: "Admin User", roleName: "Management",     initials: "AD" };
      default:           return { name: "User",       roleName: "Role",           initials: "US" };
    }
  };

  const userDisplay = getRoleDisplay();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-screen bg-[#0F172A] border-r border-slate-800 sticky top-0 z-40"
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shrink-0 shadow-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-black text-lg tracking-tight text-white">
              Edu<span className="text-[#38BDF8]">Core</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 py-5 px-3 overflow-y-auto scrollbar-hide">
        {role === "teacher" && !isCollapsed && (
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pb-3">
            Core Operating System
          </p>
        )}
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group",
                    isActive
                      ? "bg-[#2563EB] text-white shadow-lg shadow-blue-900/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "group-hover:text-[#38BDF8]")} />
                  {!isCollapsed && (
                    <span className="font-semibold text-sm whitespace-nowrap">{item.name}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 shrink-0 space-y-2">
        {!isCollapsed ? (
          <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold shrink-0 text-xs">
                {userDisplay.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userDisplay.name}</p>
                <p className="text-xs text-slate-400">{userDisplay.roleName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Terminate Session"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            title="Terminate Session"
            className="w-full flex justify-center p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
