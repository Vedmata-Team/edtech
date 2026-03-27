'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const lectures = [
  { id: 1, title: 'Rotational Dynamics: Torque & Pure Rolling', teacher: 'Dr. RK Singh', duration: '55m', views: '1.2k', rating: 4.9, bg: 'from-blue-600/20 to-purple-600/20', accent: 'text-blue-600', path: '/thumbnails/physics.png' },
  { id: 2, title: 'Calculus II: Integration by Substitution', teacher: 'Prof. MS Khan', duration: '42m', views: '2.4k', rating: 4.7, bg: 'from-indigo-600/20 to-violet-600/20', accent: 'text-indigo-600', path: '/thumbnails/maths.png' },
  { id: 3, title: 'Organic Carbon Benzene Compounds', teacher: 'Dr. Neha Jha', duration: '1h 10m', views: '980', rating: 4.8, bg: 'from-emerald-600/20 to-teal-600/20', accent: 'text-emerald-600', path: '/thumbnails/chemistry.png' },
  { id: 4, title: 'Simple Harmonic Motion & Oscillations', teacher: 'Dr. RK Singh', duration: '48m', views: '3.1k', rating: 5.0, bg: 'from-blue-600/20 to-purple-600/20', accent: 'text-blue-700', path: '/thumbnails/physics.png' },
]

import DashboardLayout from '@/components/layout/DashboardLayout'

function Icon({ name, className }: { name: string, className?: string }) {
  return <i className={cn("bi", `bi-${name}`, className)}></i>
}

export default function VideoLecturesPage() {
  return (
    <DashboardLayout role="student" title="Student Video Library">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-12">
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
              <span className="w-12 h-12 bg-primary-100 text-primary-600 rounded-[20px] flex items-center justify-center shadow-inner">
                <Icon name="play-circle-fill" />
              </span>
              Video Library
            </h1>
            <p className="mt-2 text-slate-500 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-widest leading-relaxed">Global HD Lecture Engine & Sync-Playback Hub</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-[20px] text-[10px] font-extrabold uppercase tracking-widest text-slate-500 hover:text-slate-900 shadow-sm transition-all hover:shadow-xl w-full sm:w-auto">
             <Icon name="sliders" /> Filter Library
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
           {lectures.map((l) => (
             <motion.div
               key={l.id}
               whileHover={{ y: -10 }}
               className="group bg-white rounded-[32px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.15)] transition-all overflow-hidden flex flex-col"
             >
                <Link href={`/student/video/${l.id}`} className="block relative aspect-video overflow-hidden">
                   {/* Thumbnail Container */}
                   <div className={cn("w-full h-full bg-slate-100 transition-transform group-hover:scale-110 duration-700")}>
                      <img 
                        src={l.path} 
                        alt={l.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                      {/* Fallback Icon if image fails */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-20 transition-opacity -z-10">
                         <Icon name="camera-video-fill" className="text-6xl text-slate-900" />
                      </div>
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
                   </div>

                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-md text-primary-600 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-white/40 border border-white">
                         <Icon name="play-fill" className="ml-1" />
                      </div>
                   </div>

                   {/* Duration Badge */}
                   <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold rounded-lg tracking-widest border border-white/20">
                      {l.duration}
                   </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-extrabold text-primary-500 uppercase tracking-widest px-2 py-0.5 bg-primary-50 rounded-md border border-primary-100">Verified Node</span>
                      <div className="flex items-center gap-1">
                         <Icon name="star-fill" className="text-orange-400 text-[10px]" />
                         <span className="text-[10px] font-extrabold text-slate-900">{l.rating}</span>
                      </div>
                   </div>

                   <Link href={`/student/video/${l.id}`}>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                        {l.title}
                      </h3>
                   </Link>
                   
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                      <Icon name="person-circle" className="text-primary-400" />
                      {l.teacher}
                   </p>

                   <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Icon name="eye-fill" /> {l.views}</span>
                         <span className="flex items-center gap-1.5"><Icon name="calendar2-check-fill" /> Recent</span>
                      </div>
                      <button className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all flex items-center justify-center">
                         <Icon name="bookmark-plus" />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
