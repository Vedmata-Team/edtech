import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Users, Calendar, MessageCircle, BarChart2, Video, FileText, LogOut } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { useAuthContext } from "@/context/auth-context";
import { useLocation } from "wouter";

const TODAY_CLASSES = [
  { time: '9:00 AM - Physics Ch.4', topic: 'Motion', students: 42 },
  { time: '11:00 AM - Physics Ch.4', topic: 'Momentum', students: 38 },
  { time: '2:00 PM - Grade 12', topic: 'Thermodynamics', students: 45 },
  { time: '4:00 PM - Revision', topic: 'Mock Test Review', students: 40 },
];

const RECENT_DOUBTS = [
  { initials: 'RK', name: 'Rahul K', question: 'Why does acceleration remain constant...', time: '10 min ago' },
  { initials: 'PS', name: 'Priya S', question: 'Confused about Newton third law...', time: '45 min ago' },
  { initials: 'AJ', name: 'Amit J', question: 'How to solve projectile problems...', time: '1 hour ago' },
];

const PERFORMANCE_DATA = [
  { subject: 'Kinematics', score: 85 },
  { subject: 'Dynamics', score: 72 },
  { subject: 'Thermodynamics', score: 68 },
  { subject: 'Optics', score: 79 },
  { subject: 'Electricity', score: 88 },
];

const TOP_STUDENTS = [
  { rank: 1, name: 'Aryan Sharma', score: '94%' },
  { rank: 2, name: 'Priya Singh', score: '91%' },
  { rank: 3, name: 'Rahul Kumar', score: '88%' },
  { rank: 4, name: 'Meera Patel', score: '85%' },
  { rank: 5, name: 'Amit Joshi', score: '82%' },
];

const ASSIGNMENT_DATA = [
  { name: 'Submitted', value: 78, color: 'hsl(var(--accent))' },
  { name: 'Pending', value: 22, color: 'hsl(var(--muted-foreground))' },
];

export default function TeacherDashboard() {
  const { logout } = useAuthContext();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex justify-between items-start"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Welcome, Mr. Sharma
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">Physics Teacher - Grade 11 & 12</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 bg-secondary rounded-full hover:bg-border transition-colors text-foreground active:scale-95 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:block font-medium pr-2">Logout</span>
          </button>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Total Students", value: "124", icon: Users },
            { label: "Classes Today", value: "3", icon: Calendar },
            { label: "Pending Doubts", value: "8", icon: MessageCircle, badge: true },
            { label: "Avg Class Score", value: "74%", icon: BarChart2 },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-5 rounded-2xl border border-border shadow-sm relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary relative">
                <stat.icon className="w-5 h-5" />
                {stat.badge && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-card"></span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Today Schedule */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Today's Schedule</h2>
                <button className="text-sm font-semibold text-primary hover:text-accent transition-colors">View Full Calendar</button>
              </div>
              <div className="space-y-4">
                {TODAY_CLASSES.map((cls, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-border hover:bg-secondary/50 transition-colors gap-4">
                    <div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                        {cls.time}
                      </span>
                      <h4 className="font-bold text-foreground">{cls.topic}</h4>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <Users className="w-4 h-4" />
                        {cls.students} Students
                      </div>
                    </div>
                    <button className="bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-accent/90 transition-colors active:scale-95 flex items-center gap-2 justify-center sm:justify-start">
                      <Video className="w-4 h-4" /> Start Class
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Doubts */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Recent Doubts</h2>
                <button className="text-sm font-semibold text-primary hover:text-accent transition-colors">View All (8)</button>
              </div>
              <div className="space-y-4">
                {RECENT_DOUBTS.map((doubt, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                        {doubt.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground text-sm">{doubt.name}</h4>
                          <span className="text-xs text-muted-foreground">{doubt.time}</span>
                        </div>
                        <p className="text-sm text-foreground/80 mt-1 line-clamp-1">{doubt.question}</p>
                      </div>
                    </div>
                    <button className="bg-secondary text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-border transition-colors active:scale-95 shrink-0">
                      Reply
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Class Performance */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Class Performance</h2>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600}} width={90} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--secondary))'}}
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {PERFORMANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Top Students */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Top Students</h2>
              <div className="space-y-3">
                {TOP_STUDENTS.map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        student.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        student.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {student.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-sm text-foreground">{student.name}</span>
                    </div>
                    <span className="text-sm font-bold bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-lg">
                      {student.score}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Assignment Status */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Assignment Status</h2>
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-[120px] w-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ASSIGNMENT_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {ASSIGNMENT_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))', padding: '4px 8px' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3">
                  {ASSIGNMENT_DATA.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                        <span className="text-sm font-bold text-foreground">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}