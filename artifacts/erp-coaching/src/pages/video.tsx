import { Layout } from "@/components/layout/Layout";
import { useLocation } from "wouter";
import { ArrowLeft, Play, MessageCircle, FileText, ChevronDown, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SubjectAnimation } from "@/components/dashboard/SubjectAnimation";
import { useAppData } from "@/hooks/use-app-data";

export default function VideoPlayer() {
  const [, setLocation] = useLocation();
  const [showNotes, setShowNotes] = useState(false);
  const { courses } = useAppData();

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto w-full flex flex-col h-full bg-background"
      >
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        
        {/* Header */}
        <div className="p-4 md:p-6 flex items-center gap-4 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10 mt-safe md:mt-0">
          <button 
            onClick={() => setLocation("/student/dashboard")}
            className="p-2 bg-secondary rounded-full hover:bg-border transition-colors text-foreground active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="overflow-hidden">
            <h1 className="font-bold text-lg md:text-xl text-foreground line-clamp-1">Motion in One Dimension - Lecture 3</h1>
            <p className="text-sm text-muted-foreground">Physics • Chapter 4</p>
          </div>
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {/* Video Player Area */}
          <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group border border-border/20">
            {/* Watermark animation background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <SubjectAnimation animation="physics" />
            </div>

            {/* Play Button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground ml-2" />
              </div>
            </div>
            
            {/* Mock progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
              <div className="h-full w-[65%] bg-accent relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-md">
              12:32 / 45:00
            </div>

            {/* FABs inside video area */}
            <div className="absolute bottom-6 right-4 md:right-6 flex flex-col gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation("/student/doubts");
                }}
                className="w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-accent-foreground transition-all group/fab active:scale-95"
                title="Ask Doubt"
              >
                <MessageCircle className="w-6 h-6 text-primary group-hover/fab:text-accent-foreground" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotes(!showNotes);
                }}
                className="w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-accent-foreground transition-all group/fab active:scale-95"
                title="Notes"
              >
                <FileText className="w-6 h-6 text-primary group-hover/fab:text-accent-foreground" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-foreground">Lecture Progress</h2>
              <span className="text-sm font-bold text-accent-foreground bg-accent px-3 py-1 rounded-full">65%</span>
            </div>
            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-8">
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className="w-full flex items-center justify-between p-4 bg-card rounded-2xl border border-border font-bold text-lg text-foreground hover:bg-secondary/50 transition-colors active:scale-95"
            >
              Notes for this lecture
              <ChevronDown className={`w-5 h-5 transition-transform ${showNotes ? "rotate-180" : ""}`} />
            </button>
            
            {showNotes && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-6 bg-card rounded-2xl border border-border prose dark:prose-invert max-w-none"
              >
                <h3>1. Introduction to Kinematics</h3>
                <p>Kinematics is the branch of mechanics that describes the motion of points, bodies (objects), and systems of bodies without considering the forces that cause them to move.</p>
                <ul>
                  <li><strong>Distance:</strong> Total path covered (Scalar)</li>
                  <li><strong>Displacement:</strong> Shortest distance between initial and final position (Vector)</li>
                </ul>
                <h3>2. Speed and Velocity</h3>
                <p>Velocity is the rate of change of position with respect to time, whereas speed is the rate of change of distance.</p>
              </motion.div>
            )}
          </div>

          {/* Recommended Videos */}
          <div className="mt-10 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Recommended Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.slice(1, 4).map((course, i) => (
                <div key={course.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer active:scale-95" onClick={() => setLocation(`/student/video/${course.id}`)}>
                  <div className={`h-24 relative bg-gradient-to-br ${course.color} overflow-hidden`}>
                    <SubjectAnimation animation={course.animation} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-foreground text-sm line-clamp-1">{course.subject}</h4>
                    <p className="text-xs text-muted-foreground truncate">{course.chapter}</p>
                    <div className="mt-2 text-xs font-semibold text-primary">{Math.floor(Math.random() * 20 + 20)}:00</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
