import { Layout } from "@/components/layout/Layout";
import { useAuthContext } from "@/context/auth-context";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Users, 
  User, 
  IndianRupee, 
  Calendar, 
  LogOut, 
  Search,
  FileText,
  Bell,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

const MOCK_STUDENTS = [
  { id: 1, name: 'Aryan Sharma', batch: 'Gr.11 Science', status: 'Paid', date: '12 Jan 2024' },
  { id: 2, name: 'Priya Singh', batch: 'Gr.12 Commerce', status: 'Pending', date: '14 Jan 2024' },
  { id: 3, name: 'Rahul Kumar', batch: 'Gr.11 Science', status: 'Paid', date: '15 Jan 2024' },
  { id: 4, name: 'Meera Patel', batch: 'Gr.10 Math', status: 'Overdue', date: '01 Feb 2024' },
  { id: 5, name: 'Amit Joshi', batch: 'Gr.12 Science', status: 'Paid', date: '03 Feb 2024' },
  { id: 6, name: 'Neha Gupta', batch: 'Gr.10 Biology', status: 'Pending', date: '10 Feb 2024' },
];

const FEE_DATA = [
  { name: 'Jan', value: 310000 },
  { name: 'Feb', value: 340000 },
  { name: 'Mar', value: 380000 },
  { name: 'Apr', value: 360000 },
  { name: 'May', value: 410000 },
  { name: 'Jun', value: 384000 },
];

const ATTENDANCE_DATA = [
  { name: 'Present', value: 91, color: 'hsl(var(--accent))' },
  { name: 'Absent', value: 9, color: 'hsl(var(--muted-foreground))' },
];

const STAFF = [
  { name: 'Mr. Sharma', subject: 'Physics', online: true },
  { name: 'Mrs. Gupta', subject: 'Mathematics', online: false },
  { name: 'Dr. Verma', subject: 'Chemistry', online: true },
  { name: 'Ms. Das', subject: 'Biology', online: true },
];

export default function ManagementDashboard() {
  const { logout } = useAuthContext();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-10"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Good morning, Admin
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">Institute: BrightMinds Coaching Center</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 bg-secondary rounded-full hover:bg-border transition-colors text-foreground active:scale-95 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:block font-medium pr-2">Logout</span>
          </button>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Total Students", value: "847", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
            { label: "Total Teachers", value: "32", icon: User, color: "text-green-500", bg: "bg-green-100" },
            { label: "Monthly Revenue", value: "₹4.2L", icon: IndianRupee, color: "text-amber-500", bg: "bg-amber-100" },
            { label: "Attendance Today", value: "91%", icon: Calendar, color: "text-purple-500", bg: "bg-purple-100" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-5 rounded-2xl border border-border shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* LEFT COLUMN (colspan-2) */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* Student Enrollment Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col h-[400px]"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-foreground">Recent Enrollments</h2>
                <div className="flex w-full sm:w-auto gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors shadow-sm whitespace-nowrap">
                    Add Student
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2">
                <div className="border border-border rounded-xl divide-y divide-border">
                  {MOCK_STUDENTS.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.batch}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${
                          student.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                          student.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {student.status}
                        </span>
                        <div className="hidden sm:block text-xs text-muted-foreground w-20 text-right">
                          {student.date}
                        </div>
                        <button className="text-primary text-sm font-semibold hover:underline px-2">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Fee Collection Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-2">Fee Collection Trend</h2>
              <div className="flex flex-wrap gap-4 text-sm font-medium mb-6">
                <div className="bg-secondary px-3 py-1.5 rounded-lg border border-border">
                  Collected: <span className="text-primary font-bold">₹3,84,000</span>
                </div>
                <div className="bg-secondary px-3 py-1.5 rounded-lg border border-border">
                  Pending: <span className="text-amber-600 font-bold">₹48,000</span>
                </div>
                <div className="bg-secondary px-3 py-1.5 rounded-lg border border-border">
                  Overdue: <span className="text-red-600 font-bold">₹24,000</span>
                </div>
              </div>

              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FEE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--secondary))'}}
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Collection']}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN (colspan-1) */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            
            {/* Attendance Overview */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm text-center flex flex-col items-center"
            >
              <h2 className="text-xl font-bold text-foreground w-full text-left mb-1">Attendance</h2>
              <p className="text-sm text-muted-foreground w-full text-left mb-6">Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
              
              <div className="h-[180px] w-[180px] relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ATTENDANCE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {ATTENDANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-foreground">91%</span>
                  <span className="text-xs font-medium text-muted-foreground">Present</span>
                </div>
              </div>

              <div className="flex gap-4 w-full justify-center text-sm font-medium border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span>Present: 771</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                  <span>Absent: 76</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'Generate Fee Report' },
                  { icon: Users, label: 'Add New Student' },
                  { icon: User, label: 'Add New Teacher' },
                  { icon: Bell, label: 'Send Announcement' },
                  { icon: Download, label: 'Export Attendance' }
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center gap-3 p-4 bg-secondary rounded-xl hover:bg-border transition-colors active:scale-95 group text-left">
                    <action.icon className="w-5 h-5 text-primary group-hover:text-foreground transition-colors" />
                    <span className="font-semibold text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Staff Overview */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Staff Overview</h2>
                <button className="text-sm font-semibold text-primary hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {STAFF.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-secondary rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <span className="text-xs font-medium text-muted-foreground w-12 text-right">
                        {member.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
