import { Layout } from "@/components/layout/Layout";
import { useAppData } from "@/hooks/use-app-data";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { Moon, Sun, Clock, Trophy, CheckCircle2, Flame, PlayCircle, Atom, FunctionSquare, FlaskConical, Leaf, BookOpen, ClipboardList, MessageCircle, BarChart2, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CountdownTimer } from "@/components/dashboard/CountdownTimer";
import { SubjectAnimation } from "@/components/dashboard/SubjectAnimation";
import { Link, useLocation } from "wouter";
import { useAuthContext } from "@/context/auth-context";
import { LogOut } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Dashboard() {
  const { isLoading, user, courses, tests, performance } = useAppData();
  const { isDark, toggle } = useTheme();
  const [, setLocation] = useLocation();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'physics': return Atom;
      case 'mathematics': return FunctionSquare;
      case 'chemistry': return FlaskConical;
      case 'biology': return Leaf;
      default: return BookOpen;
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 gap-3"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Good morning, {user.name} <span className="inline-block origin-bottom-right hover:animate-pulse">👋</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2 font-medium">You have 3 tests upcoming this week. Keep it up!</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button 
              onClick={toggle}
              className="p-2.5 md:p-3 bg-card border border-border rounded-full shadow-sm hover:shadow-md transition-all text-foreground active:scale-95"
            >
              {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
            <button 
              onClick={handleLogout}
              className="p-2.5 md:p-3 bg-card border border-border rounded-full shadow-sm hover:shadow-md transition-all text-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 active:scale-95 flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Hero Banner - Resume */}
        {!isLoading && courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent border border-blue-100 dark:border-blue-900/30 rounded-3xl p-5 md:p-6 mb-8 md:mb-12 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
              <SubjectAnimation animation="physics" />
            </div>
            <div className="relative z-10">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">Continue where you left off</span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">{courses[0].subject}</h2>
              <p className="text-muted-foreground text-sm mb-3">{courses[0].chapter}</p>
              <div className="flex items-center gap-3">
                <div className="w-32 md:w-48 h-2 bg-blue-100 dark:bg-blue-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${courses[0].progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{courses[0].progress}%</span>
              </div>
            </div>
            <button 
              onClick={() => setLocation(`/student/video/${courses[0].id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-all active:scale-95 z-10 w-full sm:w-auto"
            >
              Resume
            </button>
          </motion.div>
        )}

        {/* Stats Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          {[
            { label: "Study Time", value: user.studyTime, icon: Clock },
            { label: "Current Rank", value: `#${user.rank}`, icon: Trophy },
            { label: "Tests Done", value: user.testsCompleted, icon: CheckCircle2 },
            { label: "Streak", value: `${user.streak} days`, icon: Flame, iconClass: "text-orange-500" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-card p-4 md:p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent/10 rounded-full blur-xl group-hover:bg-accent/20 transition-all"></div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3 md:mb-4 text-accent-foreground">
                <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconClass || ""}`} />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              {isLoading ? (
                <div className="h-6 md:h-8 w-16 md:w-20 bg-muted animate-pulse rounded-md mt-1"></div>
              ) : (
                <p className="text-lg md:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Your Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Your Subjects</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { id: '1', name: 'Physics', color: 'from-blue-600 to-blue-400', icon: Atom, left: '12 lectures left' },
              { id: '2', name: 'Mathematics', color: 'from-purple-600 to-purple-400', icon: FunctionSquare, left: '18 lectures left' },
              { id: '3', name: 'Chemistry', color: 'from-emerald-600 to-emerald-400', icon: FlaskConical, left: '6 lectures left' },
              { id: '4', name: 'Biology', color: 'from-rose-600 to-rose-400', icon: Leaf, left: '24 lectures left' },
            ].map((sub, i) => (
              <div 
                key={sub.name}
                onClick={() => setLocation(`/student/courses?subject=${sub.name.toLowerCase()}`)}
                className={`min-w-[140px] md:min-w-[160px] md:flex-1 bg-gradient-to-br ${sub.color} p-4 rounded-2xl shadow-sm text-white cursor-pointer active:scale-95 transition-transform shrink-0 snap-start relative overflow-hidden`}
              >
                <div className="absolute right-[-10px] top-[-10px] opacity-20">
                  <sub.icon className="w-16 h-16" />
                </div>
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                  <sub.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-1">{sub.name}</h3>
                <p className="text-xs text-white/80">{sub.left}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Continue Learning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Continue Learning</h2>
            <Link href="/student/courses">
              <span className="text-sm md:text-base text-primary font-semibold hover:text-accent transition-colors cursor-pointer">
                View All &rarr;
              </span>
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="min-w-[280px] h-[220px] bg-card rounded-2xl animate-pulse border border-border shrink-0"></div>
              ))
            ) : (
              courses.map((course, i) => {
                const Icon = getSubjectIcon(course.subject);
                return (
                  <Link key={course.id} href={`/student/video/${course.id}`}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="min-w-[280px] md:min-w-[300px] bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shrink-0 snap-start cursor-pointer overflow-hidden group"
                    >
                      <div className={`h-36 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                        <SubjectAnimation animation={course.animation} />
                        <div className="absolute top-3 left-3 bg-black/30 backdrop-blur-md rounded-lg p-2 text-white shadow-sm flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-bold">{course.subject}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <PlayCircle className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground text-lg line-clamp-1">{course.chapter}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">Lecture {i + 1}</p>
                        
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                          <span className="text-foreground">{course.progress}% completed</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-accent rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Upcoming Tests */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Upcoming Tests</h2>
            <div className="space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-24 bg-card rounded-2xl animate-pulse border border-border"></div>
                ))
              ) : (
                tests.map((test) => (
                  <div key={test.id} className="bg-card p-4 md:p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-4 hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-foreground">{test.subject}</h4>
                        <p className="text-sm text-muted-foreground">{test.chapter}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                        test.difficulty === 'Hard' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900' :
                        test.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900' :
                        'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:border-green-900'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1 md:mt-2">
                      <CountdownTimer targetDate={test.targetDate} />
                      <button className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                        Start
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Your Performance</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                ↑ 23% this month
              </span>
            </div>
            
            <div className="bg-card p-4 md:p-6 rounded-3xl border border-border shadow-sm h-[280px] md:h-[320px]">
              {isLoading ? (
                <div className="w-full h-full bg-muted animate-pulse rounded-xl"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                      itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      activeDot={{ r: 6, fill: "hsl(var(--accent))", stroke: "hsl(var(--card))", strokeWidth: 3 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* Platform Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 mt-8"
        >
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">EduCore brings your entire learning journey into one powerful platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: BookOpen, title: 'Smart Video Lectures', desc: 'HD lectures with subject-specific visual aids. Resume anytime, anywhere across devices.', color: 'text-blue-500', bg: 'bg-blue-500/15' },
              { icon: ClipboardList, title: 'Adaptive Mock Tests', desc: 'AI-powered tests that adapt to your weak areas. Get instant detailed score analysis.', color: 'text-orange-500', bg: 'bg-orange-500/15' },
              { icon: MessageCircle, title: 'Live Doubt Resolution', desc: 'Chat directly with expert teachers. Get step-by-step solutions with visual diagrams.', color: 'text-green-500', bg: 'bg-green-500/15' },
              { icon: BarChart2, title: 'Deep Analytics', desc: 'Track study hours, subject scores, and peer rankings. Spot weak topics instantly.', color: 'text-purple-500', bg: 'bg-purple-500/15' },
              { icon: Trophy, title: 'Gamified Learning', desc: 'Daily streaks, leaderboards, and achievement badges keep you motivated every day.', color: 'text-amber-500', bg: 'bg-amber-500/15' },
              { icon: Calendar, title: 'Smart Schedule', desc: 'Auto-generated timetables with test countdowns and study reminders.', color: 'text-red-500', bg: 'bg-red-500/15' }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:scale-[1.02] transition-all p-6 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">How EduCore Works</h2>
          </div>
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-4 max-w-5xl mx-auto">
            {/* Dashed line connector on desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-border z-0"></div>
            
            {[
              { num: 1, title: 'Join Your Batch', desc: 'Register and get instant access to all your subjects, teachers, and course material.', bg: 'bg-primary' },
              { num: 2, title: 'Learn & Practice', desc: 'Watch lectures, solve practice questions, and take timed tests — all in one place.', bg: 'bg-accent text-accent-foreground' },
              { num: 3, title: 'Track & Improve', desc: 'Use AI analytics to find your gaps. Watch your rank climb as you improve.', bg: 'bg-primary' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex-1 flex flex-col items-center text-center relative z-10"
              >
                <div className={`w-16 h-16 rounded-full ${step.bg} ${step.bg === 'bg-primary' ? 'text-primary-foreground' : ''} flex items-center justify-center text-2xl font-bold mb-4 shadow-md border-4 border-card`}>
                  {step.num}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
