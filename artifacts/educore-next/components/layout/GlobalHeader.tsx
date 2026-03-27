'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const NavItem = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: string }) => (
  <Link 
    href={href} 
    className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-3 py-2 rounded-xl hover:bg-primary-50"
  >
    {icon && <i className={`bi bi-${icon} text-xs`} />}
    {children}
  </Link>
)

export const GlobalHeader = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-[32px] w-full z-[100] transition-all duration-500 px-6 py-4",
      scrolled ? "bg-white/95 backdrop-blur-3xl shadow-2xl shadow-slate-200/50 py-3 mt-[-32px]" : "bg-white/80 backdrop-blur-md border-b border-slate-50"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
           <motion.div 
             whileHover={{ rotate: 15, scale: 1.1 }}
             className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/40"
           >
              <i className="bi bi-mortarboard-fill text-white text-xl" />
           </motion.div>
           <div className="flex flex-col text-slate-900">
             <span className="font-extrabold text-xl tracking-tight uppercase leading-none">Edu<span className="text-primary-600">Core</span></span>
             <span className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Built by IITians</span>
           </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavItem href="/#features" icon="bounding-box">Capabilities</NavItem>
          <NavItem href="/#why-different" icon="stars">Why Us</NavItem>
          <NavItem href="/#automation" icon="lightning-charge-fill">Automation</NavItem>
          <NavItem href="/#demo-zone" icon="app-indicator">Demos</NavItem>
          <NavItem href="/#pricing" icon="patch-check-fill">Pricing</NavItem>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/login" className="hidden sm:flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
            <i className="bi bi-person-lock text-xs" />
            Client Portal
          </Link>
          <Link 
            href="https://wa.me/919506933715" 
            className="px-4 py-2 md:px-6 md:py-2.5 bg-slate-950 text-white text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary-500/30 transition-all shadow-xl shadow-slate-200"
          >
            Launch My ERP
          </Link>
        </div>
      </div>
    </header>
  )
}
