import { Link, useLocation } from "wouter";
import { Home, BookOpen, ClipboardList, MessageCircle, User, Users, CreditCard, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/auth-context";

const STUDENT_NAV = [
  { name: "Home", icon: Home, path: "/student/dashboard" },
  { name: "Courses", icon: BookOpen, path: "/student/courses" },
  { name: "Tests", icon: ClipboardList, path: "/student/tests" },
  { name: "Doubts", icon: MessageCircle, path: "/student/doubts" },
  { name: "Profile", icon: User, path: "/student/settings" },
];

const TEACHER_NAV = [
  { name: "Home", icon: Home, path: "/teacher/dashboard" },
  { name: "Classes", icon: BookOpen, path: "/teacher/classes" },
  { name: "Tasks", icon: ClipboardList, path: "/teacher/assignments" },
  { name: "Doubts", icon: MessageCircle, path: "/teacher/doubts" },
  { name: "Profile", icon: User, path: "/teacher/analytics" },
];

const MANAGEMENT_NAV = [
  { name: "Home", icon: Home, path: "/management/dashboard" },
  { name: "Students", icon: Users, path: "/management/students" },
  { name: "Fees", icon: CreditCard, path: "/management/fees" },
  { name: "Attnd", icon: Calendar, path: "/management/attendance" },
  { name: "Reports", icon: FileText, path: "/management/reports" },
];

export function BottomNav() {
  const [location] = useLocation();
  const { role } = useAuthContext();

  const navItems = 
    role === 'student' ? STUDENT_NAV :
    role === 'teacher' ? TEACHER_NAV :
    role === 'management' ? MANAGEMENT_NAV : [];

  if (navItems.length === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-blue-100 z-50 px-2 sm:px-6 pb-safe shadow-lg">
      <div className="h-full flex items-center justify-between pb-1">
        {navItems.map((item) => {
          const isActive = location === item.path || (location.startsWith(`/${role}`) && location.includes(item.name.toLowerCase().split(' ')[0]) && item.path !== `/${role}/dashboard`);
          
          return (
            <Link key={item.path} href={item.path}>
              <div className="relative flex flex-col items-center justify-center w-14 sm:w-16 h-12 cursor-pointer group pt-1">
                {isActive && (
                  <motion.div 
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 bg-blue-100 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-colors duration-200", 
                    isActive ? "text-[#2563EB]" : "text-slate-400 group-hover:text-slate-700"
                  )} 
                />
                <span 
                  className={cn(
                    "text-[10px] mt-0.5 font-bold transition-colors truncate w-full text-center px-1",
                    isActive ? "text-[#2563EB]" : "text-slate-400"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
