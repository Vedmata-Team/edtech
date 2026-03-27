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
      className="hidden md:flex flex-col h-screen bg-card border-r border-border sticky top-0 z-40 transition-all duration-300"
    >
      <div className="h-20 flex items-center justify-between px-6 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-primary tracking-tight">EduCore</span>
          )}
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location === item.path || (location.startsWith(`/${role}`) && location.includes(item.name.toLowerCase().split(' ')[0]) && item.path !== `/${role}/dashboard`);
          
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 group active:scale-95",
                  isActive 
                    ? "bg-accent text-accent-foreground shadow-md shadow-accent/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-accent-foreground" : "group-hover:text-primary")} />
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/50 shrink-0 bg-background/50">
        {!isCollapsed ? (
          <div className="flex items-center justify-between bg-card p-3 rounded-2xl border border-border mb-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {userDisplay.initials}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-foreground truncate">{userDisplay.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{userDisplay.roleName}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogout}
            className="w-full flex justify-center mb-3 p-3 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors active:scale-95"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
