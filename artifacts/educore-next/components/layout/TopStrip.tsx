'use client'

import React from 'react'

export const TopStrip = () => {
  return (
    <div className="sticky top-0 z-[110] bg-slate-950 text-white border-b border-white/5 overflow-hidden py-1.5 px-4 text-center">
      <div className="relative z-10 flex items-center justify-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-slate-100 whitespace-nowrap">
          India&apos;s #1 Institutional OS
          <span className="mx-2 md:mx-4 text-white/10">|</span>
          <span className="text-primary-400">Trusted by 500+ Schools</span>
          <span className="mx-2 md:mx-4 text-white/10 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Made with ❤️ in Bharat</span>
        </p>
      </div>
    </div>
  )
}
