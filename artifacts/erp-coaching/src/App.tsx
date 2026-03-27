import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider, useAuthContext } from "@/context/auth-context";

import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import TeacherDashboard from "@/pages/teacher";
import ManagementDashboard from "@/pages/management";
import VideoPlayer from "@/pages/video";
import Doubts from "@/pages/doubts";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component, allowedRole, path, ...rest }: any) {
  const { role, isLoggedIn } = useAuthContext();
  
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  
  if (role !== allowedRole) {
    return <Redirect to={`/${role}/dashboard`} />;
  }
  
  return <Component {...rest} />;
}

function PublicOnlyRoute({ component: Component, path, ...rest }: any) {
  const { role, isLoggedIn } = useAuthContext();
  
  if (isLoggedIn) {
    return <Redirect to={`/${role}/dashboard`} />;
  }
  
  return <Component {...rest} />;
}

function Router() {
  const { role, isLoggedIn } = useAuthContext();

  return (
    <Switch>
      <Route path="/">
        {isLoggedIn ? <Redirect to={`/${role}/dashboard`} /> : <Landing />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to={`/${role}/dashboard`} /> : <Login />}
      </Route>

      {/* Student Routes */}
      <Route path="/student/dashboard">
        <ProtectedRoute allowedRole="student" component={Dashboard} />
      </Route>
      <Route path="/student/video/:id">
        <ProtectedRoute allowedRole="student" component={VideoPlayer} />
      </Route>
      <Route path="/student/doubts">
        <ProtectedRoute allowedRole="student" component={Doubts} />
      </Route>
      <Route path="/student/courses"><Redirect to="/student/dashboard" /></Route>
      <Route path="/student/tests"><Redirect to="/student/dashboard" /></Route>
      <Route path="/student/analytics"><Redirect to="/student/dashboard" /></Route>
      <Route path="/student/settings"><Redirect to="/student/dashboard" /></Route>
      
      {/* Teacher Routes */}
      <Route path="/teacher/dashboard">
        <ProtectedRoute allowedRole="teacher" component={TeacherDashboard} />
      </Route>
      <Route path="/teacher/classes"><Redirect to="/teacher/dashboard" /></Route>
      <Route path="/teacher/assignments"><Redirect to="/teacher/dashboard" /></Route>
      <Route path="/teacher/doubts"><Redirect to="/teacher/dashboard" /></Route>
      <Route path="/teacher/students"><Redirect to="/teacher/dashboard" /></Route>
      <Route path="/teacher/analytics"><Redirect to="/teacher/dashboard" /></Route>

      {/* Management Routes */}
      <Route path="/management/dashboard">
        <ProtectedRoute allowedRole="management" component={ManagementDashboard} />
      </Route>
      <Route path="/management/students"><Redirect to="/management/dashboard" /></Route>
      <Route path="/management/teachers"><Redirect to="/management/dashboard" /></Route>
      <Route path="/management/fees"><Redirect to="/management/dashboard" /></Route>
      <Route path="/management/attendance"><Redirect to="/management/dashboard" /></Route>
      <Route path="/management/reports"><Redirect to="/management/dashboard" /></Route>
      <Route path="/management/settings"><Redirect to="/management/dashboard" /></Route>

      {/* Fallbacks */}
      <Route path="/dashboard"><Redirect to={isLoggedIn ? `/${role}/dashboard` : "/"} /></Route>
      <Route path="/teacher"><Redirect to={isLoggedIn ? `/${role}/dashboard` : "/"} /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
