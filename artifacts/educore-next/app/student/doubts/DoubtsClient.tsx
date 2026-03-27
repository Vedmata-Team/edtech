'use client'

import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Search, ChevronRight, BookOpen, Clock, CheckCircle } from 'lucide-react'

const conversations = [
  { id: 1, subject: 'Physics', teacher: 'Rahul Sir', lastMsg: 'The velocity is the derivative of...', time: '2m', unread: 1, avatar: 'RS' },
  { id: 2, subject: 'Mathematics', teacher: 'Priya Ma\'am', lastMsg: 'Great question! For integration...', time: '1h', unread: 0, avatar: 'PM' },
  { id: 3, subject: 'Chemistry', teacher: 'Vikram Sir', lastMsg: 'Answered your doubt about bonding', time: '3h', unread: 2, avatar: 'VS' },
  { id: 4, subject: 'Biology', teacher: 'Sneha Ma\'am', lastMsg: 'Check the diagram I shared', time: 'Yesterday', unread: 0, avatar: 'SM' },
]

const initialMessages = [
  { id: 1, from: 'student', text: 'Sir, I have a doubt in Kinematics. If a ball is thrown vertically upward with initial velocity 20 m/s, what will be its velocity after 1.5 seconds?', time: '10:30 AM' },
  { id: 2, from: 'teacher', text: 'Great question Arjun! Let\'s solve this step by step. We know: u = 20 m/s (upward), g = -10 m/s² (downward), t = 1.5s', time: '10:32 AM' },
  { id: 3, from: 'teacher', text: 'Using v = u + at → v = 20 + (-10)(1.5) = 20 - 15 = 5 m/s upward. At 1.5 seconds, the ball is still moving upward but slowing down. It reaches max height at t = 2s.', time: '10:32 AM' },
  { id: 4, from: 'student', text: 'Thank you sir! What if I need to find the maximum height reached?', time: '10:35 AM' },
  { id: 5, from: 'teacher', text: 'For max height, use v² = u² + 2as. At max height, v=0. So: 0 = 400 + 2(-10)h → h = 400/20 = 20 meters. The ball reaches 20m above the starting point!', time: '10:36 AM' },
]

export default function DoubtsClient() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeConv, setActiveConv] = useState(1)
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), from: 'student' as const, text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    await new Promise((res) => setTimeout(res, 2000))
    setTyping(false)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        from: 'teacher',
        text: 'That\'s an excellent doubt! Keep questioning — that\'s the best way to master Physics. I\'ll explain in detail: the key concept here relates to equations of motion...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  const filtered = conversations.filter((c) =>
    c.subject.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout role="student" title="Doubt Solving">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className="w-72 border-r border-slate-100 flex flex-col hidden sm:flex">
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doubts..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConv(c.id)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 text-left ${activeConv === c.id ? 'bg-primary-50 border-l-2 border-l-primary-600' : ''}`}
                >
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-foreground">{c.subject}</p>
                      <span className="text-xs text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{c.teacher}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-slate-100">
              <button className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-xl text-sm hover:bg-primary-800 transition-colors">
                + Ask New Doubt
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                RS
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Rahul Sir</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-xs text-emerald-600">Online · Physics Expert</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  Avg. reply: 5 min
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  92% resolved
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-center">
                <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today · Physics · Kinematics</span>
              </div>

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.from === 'student' ? 'justify-end' : 'justify-start'} gap-2`}
                  >
                    {msg.from === 'teacher' && (
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 self-end">
                        RS
                      </div>
                    )}
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.from === 'student'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-slate-100 text-foreground rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1.5 ${msg.from === 'student' ? 'text-blue-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">RS</div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [-3, 3, -3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-end gap-3 bg-slate-50 rounded-2xl p-3">
                <button className="text-slate-400 hover:text-primary-600 transition-colors self-end pb-0.5">
                  <Paperclip className="w-5 h-5" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  placeholder="Type your doubt here... (Enter to send)"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-slate-400 focus:outline-none resize-none max-h-28"
                  rows={1}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-primary-600 hover:bg-primary-800 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
