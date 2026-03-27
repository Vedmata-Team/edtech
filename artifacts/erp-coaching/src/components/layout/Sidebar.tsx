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
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-context";

const STUDENT_NAV = [
  { name: "Dashboard", icon: Home, path: "/student/dashboard" },
  { name: "Courses", icon: BookOpen, path: "/student/courses" },
  { name: "Tests", icon: ClipboardList, path: "/student/tests" },
  { name: "Doubts", icon: MessageCircle, path: "/student/doubts" },
  { name: "Analytics", icon: BarChart2, path: "/student/analytics" },
  { name: "Settings", icon: Settings, path: "/student/settings" },
];

const TEACHER_NAV = [
  { name: "Overview", icon: Home, path: "/teacher/dashboard" },
  { name: "My Classes", icon: BookOpen, path: "/teacher/classes" },
  { name: "Assignments", icon: ClipboardList, path: "/teacher/assignments" },
  { name: "Doubts", icon: MessageCircle, path: "/teacher/doubts" },
  { name: "Students", icon: Users, path: "/teacher/students" },
  { name: "Analytics", icon: BarChart2, path: "/teacher/analytics" },
];

const MANAGEMENT_NAV = [
  { name: "Dashboard", icon: Home, path: "/management/dashboard" },
  { name: "Students", icon: Users, path: "/management/students" },
  { name: "Teachers", icon: BookOpen, path: "/management/teachers" },
  { name: "Fee Management", icon: CreditCard, path: "/management/fees" },
  { name: "Attendance", icon: Calendar, path: "/management/attendance" },
  { name: "Reports", icon: FileText, path: "/management/reports" },
  { name: "Settings", icon: Settings, path: "/management/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [location, setLocation] = useLocation();
  const { role, logout } = useAuthContext();

  const navItems = 
    role === 'student' ? STUDENT_NAV :
    role === 'teacher' ? TEACHER_NAV :
    role === 'management' ? MANAGEMENT_NAV : [];

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const getRoleDisplay = () => {
    switch(role) {
      case 'student': return { name: 'Aryan S.', roleName: 'Student', initials: 'AR' };
      case 'teacher': return { name: 'Mr. Sharma', roleName: 'Teacher', initials: 'MR' };
      case 'management': return { name: 'Admin User', roleName: 'Management', initials: 'AD' };
      default: return { name: 'User', roleName: 'Role', initials: 'US' };
    }
  };

  const userDisplay = getRoleDisplay();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="hidden md:flex flex-col h-screen bg-[#0F172A] border-r border-slate-800 sticky top-0 z-40 transition-all duration-300"
    >
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
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

      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location === item.path || (location.startsWith(`/${role}`) && location.includes(item.name.toLowerCase().split(' ')[0]) && item.path !== `/${role}/dashboard`);
          
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group active:scale-95",
                  isActive 
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-900/40" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "group-hover:text-[#38BDF8]")} />
                {!isCollapsed && (
                  <span className="font-semibold whitespace-nowrap">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 shrink-0">
        {!isCollapsed ? (
          <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700 mb-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold shrink-0 text-sm">
                {userDisplay.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userDisplay.name}</p>
                <p className="text-xs text-slate-400 capitalize">{userDisplay.roleName}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-xl transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogout}
            className="w-full flex justify-center mb-3 p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors active:scale-95"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
