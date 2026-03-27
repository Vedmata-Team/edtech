'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play, Pause, Volume2, Maximize, BookmarkPlus, MessageCircle,
  ChevronRight, ChevronDown, Clock, CheckCircle, Download, Share2,
  SkipBack, SkipForward, Settings
} from 'lucide-react'
import Link from 'next/link'

const chapters = [
  { title: 'Introduction to Kinematics', duration: '12:30', done: true },
  { title: 'Distance vs Displacement', duration: '18:45', done: true },
  { title: 'Speed, Velocity, Acceleration', duration: '22:10', done: false, active: true },
  { title: 'Equations of Motion', duration: '28:50', done: false },
  { title: 'Projectile Motion', duration: '31:20', done: false },
  { title: 'Relative Motion', duration: '19:40', done: false },
]

const relatedVideos = [
  { title: 'Newton\'s Laws of Motion', subject: 'Physics', duration: '34m', thumbnail: 'bg-blue-400' },
  { title: 'Work, Energy & Power', subject: 'Physics', duration: '28m', thumbnail: 'bg-indigo-400' },
  { title: 'Integration Basics', subject: 'Mathematics', duration: '25m', thumbnail: 'bg-violet-400' },
]

interface VideoClientProps { videoId: string }

export default function VideoClient({ videoId }: VideoClientProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(37)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <DashboardLayout role="student" title="Video Lecture">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main video area */}
        <div className="lg:col-span-2 space-y-5">
          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Video area */}
            <div
              className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center cursor-pointer group"
              onClick={() => setPlaying(!playing)}
            >
              {/* Chapter tag */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                📐 Kinematics — Chapter 3
              </div>

              {/* Resume badge */}
              <div className="absolute top-4 right-4 bg-primary-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Resume at 14:22
              </div>

              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  playing ? 'bg-white/20' : 'bg-white'
                }`}
              >
                {playing ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-primary-600 translate-x-0.5" />
                )}
              </motion.div>

              {/* Video title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-semibold">Speed, Velocity & Acceleration</p>
                <p className="text-slate-300 text-xs">Rahul Sir · JEE Physics</p>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-3">
              {/* Progress bar */}
              <div className="space-y-1">
                <div
                  className="relative h-1.5 bg-slate-700 rounded-full cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const pct = ((e.clientX - rect.left) / rect.width) * 100
                    setProgress(Math.max(0, Math.min(100, pct)))
                  }}
                >
                  <motion.div
                    style={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full shadow-lg transition-opacity"
                    style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>14:22</span>
                  <span>22:10</span>
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg"
                  >
                    {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white translate-x-0.5" />}
                  </button>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span className="text-slate-400 text-xs">1x</span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">Speed, Velocity & Acceleration</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-slate-500">Rahul Sir · Physics</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-sm text-slate-500">22:10</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-sm text-slate-500">4,280 views</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    bookmarked ? 'bg-primary-50 text-primary-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
                <Link
                  href="/student/doubts"
                  className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask Doubt
                </Link>
                <button className="p-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '37%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary-600 to-accent rounded-full"
              />
            </div>
            <p className="text-xs text-slate-400">37% complete · 7:48 remaining</p>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Chapter list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Course Content</h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">2/6 done</span>
            </div>
            <div className="space-y-2">
              {chapters.map((ch, i) => (
                <div
                  key={ch.title}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                    ch.active ? 'bg-primary-50 border border-primary-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    ch.done ? 'bg-emerald-100 text-emerald-600' : ch.active ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {ch.done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold leading-tight ${
                      ch.active ? 'text-primary-700' : ch.done ? 'text-slate-400 line-through' : 'text-foreground'
                    }`}>
                      {ch.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{ch.duration}</p>
                  </div>
                  {ch.active && <Play className="w-4 h-4 text-primary-600 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related videos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <h3 className="font-bold text-foreground mb-4">Up Next</h3>
            <div className="space-y-3">
              {relatedVideos.map((v) => (
                <div key={v.title} className="flex gap-3 cursor-pointer group">
                  <div className={`w-20 h-14 ${v.thumbnail} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{v.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{v.subject} · {v.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Float doubt button - visible on mobile */}
          <Link
            href="/student/doubts"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl text-white shadow-lg"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Got a doubt?</p>
              <p className="text-xs text-blue-200">Ask teacher instantly</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto opacity-70" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
