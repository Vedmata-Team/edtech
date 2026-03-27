import { Layout } from "@/components/layout/Layout";
import { useAppData } from "@/hooks/use-app-data";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Paperclip, Send, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const SUBJECTS = [
  { id: "1", name: "Physics", teacher: "Mr. Sharma", unread: 2 },
  { id: "2", name: "Mathematics", teacher: "Mrs. Gupta", unread: 0 },
  { id: "3", name: "Chemistry", teacher: "Dr. Verma", unread: 5 },
  { id: "4", name: "Biology", teacher: "Ms. Das", unread: 0 },
];

export default function Doubts() {
  const { chatMessages } = useAppData();
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0].id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const isMobile = useIsMobile();
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMobile || showChat) {
      scrollToBottom();
    }
  }, [messages, isTyping, showChat, isMobile]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: input,
      sender: "student" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    
    // Simulate teacher reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I see your doubt. Give me a moment to explain.",
        sender: "teacher",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2500);
  };

  const activeTeacher = SUBJECTS.find(s => s.id === activeSubject)?.teacher;
  const activeSubjectName = SUBJECTS.find(s => s.id === activeSubject)?.name;

  return (
    <Layout>
      <div className="flex h-screen md:h-[calc(100vh-2rem)] md:m-4 bg-card md:rounded-3xl md:border border-border md:shadow-sm overflow-hidden relative">
        
        {/* Left Panel - Subjects List */}
        <div className={cn(
          "flex-col w-full md:w-[320px] md:border-r border-border bg-background/50 absolute md:static inset-0 z-10 md:z-auto transition-transform duration-300 bg-card",
          (isMobile && showChat) ? "-translate-x-full md:translate-x-0" : "translate-x-0",
          "md:flex"
        )}>
          <div className="p-4 md:p-6 border-b border-border mt-safe md:mt-0">
            <h2 className="text-2xl font-bold text-foreground mb-4">Doubts</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search subject or teacher..." 
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 md:pb-4">
            {SUBJECTS.map((subject) => (
              <div 
                key={subject.id}
                onClick={() => {
                  setActiveSubject(subject.id);
                  if (isMobile) setShowChat(true);
                }}
                className={cn(
                  "p-4 rounded-2xl cursor-pointer transition-all duration-200 border active:scale-95",
                  activeSubject === subject.id 
                    ? "bg-primary text-primary-foreground border-primary shadow-md" 
                    : "bg-card border-transparent hover:border-border hover:bg-secondary"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold">{subject.name}</h3>
                  {subject.unread > 0 && (
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full",
                      activeSubject === subject.id ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                    )}>
                      {subject.unread}
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm",
                  activeSubject === subject.id ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {subject.teacher}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-background/30 absolute md:static inset-0 z-20 md:z-auto transition-transform duration-300",
          (isMobile && !showChat) ? "translate-x-full md:translate-x-0" : "translate-x-0"
        )}>
          {/* Chat Header */}
          <div className="h-20 flex items-center justify-between px-4 md:px-6 border-b border-border bg-card mt-safe md:mt-0 shrink-0">
            <div className="flex items-center gap-3 md:gap-4">
              {isMobile && (
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg shrink-0">
                {activeTeacher?.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-foreground truncate">{activeSubjectName} - {activeTeacher}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-muted-foreground font-medium">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-3 shrink-0">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors hidden sm:block active:scale-95">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors hidden sm:block active:scale-95">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors active:scale-95">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-24 md:pb-6">
            <div className="text-center my-4">
              <span className="bg-secondary text-muted-foreground text-xs px-3 py-1 rounded-full font-medium border border-border">
                Today, 10:24 AM
              </span>
            </div>
            
            {messages.map((msg, i) => {
              const isStudent = msg.sender === "student";
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn("flex flex-col max-w-[85%] md:max-w-[75%]", isStudent ? "ml-auto items-end" : "mr-auto items-start")}
                >
                  <div className={cn(
                    "px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-sm text-[14px] md:text-[15px] leading-relaxed",
                    isStudent 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-muted-foreground mt-1.5 px-1 font-medium">{msg.timestamp}</span>
                </motion.div>
              );
            })}
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex max-w-[75%] mr-auto"
              >
                <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-card border border-border shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/40 typing-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-primary/60 typing-dot"></span>
                  <span className="w-2 h-2 rounded-full bg-primary/80 typing-dot"></span>
                </div>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 bg-card border-t border-border shrink-0 pb-safe">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <button className="p-2 md:p-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors active:scale-95">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your doubt..." 
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 md:py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 md:p-3.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
