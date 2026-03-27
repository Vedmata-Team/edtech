import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Eye, 
  EyeOff,
  ArrowLeft
} from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { UserRole } from "@/hooks/use-auth";

// simple hook to parse query params (since wouter's useSearch is a bit limited in some versions)
function useQueryParams() {
  const search = window.location.search;
  return new URLSearchParams(search);
}

export default function Login() {
  const { login } = useAuthContext();
  const [, setLocation] = useLocation();
  const query = useQueryParams();
  const initialRole = query.get('role') as UserRole | null;

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    ['student', 'teacher', 'management'].includes(initialRole as string) ? initialRole : null
  );
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      login(selectedRole);
      setLocation(`/${selectedRole}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Logo Header */}
      <Link href="/">
        <div className="flex items-center gap-2 mb-8 cursor-pointer hover:opacity-80 transition-opacity">
          <GraduationCap className="h-10 w-10 text-primary" />
          <span className="font-bold text-3xl text-primary tracking-tight">EduCore</span>
        </div>
      </Link>

      <div className="w-full max-w-4xl bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
        <div className="p-8 md:p-12">
          
          {!selectedRole ? (
            /* Step 1: Role Selection */
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <h2 className="text-3xl font-bold text-foreground mb-3">Welcome to EduCore</h2>
              <p className="text-muted-foreground mb-10 text-lg">Choose your role to continue</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setSelectedRole('student')}
                  className="flex flex-col items-center p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:scale-[1.02] hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <GraduationCap className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl text-blue-900 mb-2">Student</h3>
                  <p className="text-blue-700/80 text-sm">Access courses, tests and doubts</p>
                </button>

                <button 
                  onClick={() => setSelectedRole('teacher')}
                  className="flex flex-col items-center p-8 bg-amber-50 border-2 border-amber-200 rounded-2xl hover:scale-[1.02] hover:border-amber-500 hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <BookOpen className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-xl text-amber-900 mb-2">Teacher</h3>
                  <p className="text-amber-700/80 text-sm">Manage classes and students</p>
                </button>

                <button 
                  onClick={() => setSelectedRole('management')}
                  className="flex flex-col items-center p-8 bg-green-50 border-2 border-green-200 rounded-2xl hover:scale-[1.02] hover:border-green-500 hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Building2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-green-900 mb-2">Management</h3>
                  <p className="text-green-700/80 text-sm">Run the entire institute</p>
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Login Form */
            <div className="max-w-md mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to roles
              </button>

              <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm mb-4 ${
                  selectedRole === 'student' ? 'bg-blue-100 text-blue-800' :
                  selectedRole === 'teacher' ? 'bg-amber-100 text-amber-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Logging in as: <span className="capitalize">{selectedRole}</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email or Username</label>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@educore.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-accent text-accent-foreground font-bold text-lg rounded-xl shadow-md hover:bg-accent/90 hover:shadow-lg transition-all mt-4 active:scale-[0.98]"
                >
                  Login as <span className="capitalize">{selectedRole}</span>
                </button>
              </form>

              <div className="mt-6 text-center bg-secondary/50 p-3 rounded-lg border border-border/50 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Demo Note:</span> Any credentials will work.
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
