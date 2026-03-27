import { useState, useEffect } from "react";

// Mock Data Types
export type Course = {
  id: string;
  subject: string;
  chapter: string;
  progress: number;
  color: string;
  bgLight: string;
  textColor: string;
  animation: 'physics' | 'maths' | 'chemistry' | 'biology';
};

export type Test = {

  id: string;
  subject: string;
  chapter: string;
  targetDate: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: "student" | "teacher";
  timestamp: string;
};

export type PerformanceData = {
  name: string;
  score: number;
};

export function useAppData() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const courses: Course[] = [
    { id: '1', subject: 'Physics', chapter: 'Motion in One Dimension', progress: 65, color: 'from-blue-600 to-cyan-400', bgLight: 'bg-blue-50', textColor: 'text-blue-600', animation: 'physics' },
    { id: '2', subject: 'Mathematics', chapter: 'Differential Calculus', progress: 42, color: 'from-violet-600 to-purple-400', bgLight: 'bg-violet-50', textColor: 'text-violet-600', animation: 'maths' },
    { id: '3', subject: 'Chemistry', chapter: 'Organic Chemistry Basics', progress: 88, color: 'from-emerald-600 to-teal-400', bgLight: 'bg-emerald-50', textColor: 'text-emerald-600', animation: 'chemistry' },
    { id: '4', subject: 'Biology', chapter: 'Human Anatomy', progress: 15, color: 'from-rose-600 to-pink-400', bgLight: 'bg-rose-50', textColor: 'text-rose-600', animation: 'biology' },
  ];

  // Set tests for +2hrs, +1day, +3days
  const now = new Date();
  const tests: Test[] = [
    { id: "t1", subject: "Physics", chapter: "Mock Test 3", targetDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), difficulty: "Hard" },
    { id: "t2", subject: "Chemistry", chapter: "Periodic Table", targetDate: new Date(now.getTime() + 26 * 60 * 60 * 1000).toISOString(), difficulty: "Medium" },
    { id: "t3", subject: "Mathematics", chapter: "Algebra Basics", targetDate: new Date(now.getTime() + 74 * 60 * 60 * 1000).toISOString(), difficulty: "Easy" },
  ];

  const chatMessages: ChatMessage[] = [
    { id: "m1", text: "Sir, I didn't understand the third step in the derivation.", sender: "student", timestamp: "10:30 AM" },
    { id: "m2", text: "Sure Aryan, let's break it down. We are applying the chain rule there.", sender: "teacher", timestamp: "10:32 AM" },
    { id: "m3", text: "But why did we multiply by 2x?", sender: "student", timestamp: "10:33 AM" },
    { id: "m4", text: "Because the derivative of x^2 is 2x. Remember d/dx [f(g(x))] = f'(g(x)) * g'(x).", sender: "teacher", timestamp: "10:35 AM" },
    { id: "m5", text: "Oh, I see! So g(x) was x^2 in this case.", sender: "student", timestamp: "10:36 AM" },
    { id: "m6", text: "Exactly! Now try applying it to sin(x^2).", sender: "teacher", timestamp: "10:38 AM" },
  ];

  const performance: PerformanceData[] = [
    { name: "Week 1", score: 65 },
    { name: "Week 2", score: 72 },
    { name: "Week 3", score: 68 },
    { name: "Week 4", score: 80 },
  ];

  return {
    isLoading,
    user: { name: "Aryan", rank: 42, streak: 7, studyTime: "4h 32m", testsCompleted: "18/25" },
    courses,
    tests,
    chatMessages,
    performance
  };
}
