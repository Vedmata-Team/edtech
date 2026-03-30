'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Form fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [instituteType, setInstituteType] = useState('Coaching Center')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('educore_popup_seen')) {
        setIsOpen(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('educore_popup_seen', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic phone validation
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    setIsSubmitting(true)

    try {
      const body = new URLSearchParams({
        'form-name': 'educore-demo-request',
        'bot-field': '',
        name,
        phone,
        institute_type: instituteType,
      })

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (!res.ok) throw new Error('Network error')

      // localStorage backup so leads aren't lost
      try {
        const leads = JSON.parse(localStorage.getItem('educore_leads') || '[]')
        leads.push({ name, phone, instituteType, time: new Date().toISOString() })
        localStorage.setItem('educore_leads', JSON.stringify(leads))
      } catch {}

      sessionStorage.setItem('educore_popup_seen', 'true')
      setIsSubmitted(true)
      setTimeout(handleClose, 3000)
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto scrollbar-hide bg-white rounded-[32px] md:rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-all z-20"
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-sm" />
            </button>

            {/* Banner */}
            <div className="relative h-32 md:h-48 overflow-hidden bg-slate-900 p-6 md:p-8 flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 pointer-events-none">
                <i className="bi bi-patch-check-fill text-[120px] text-primary-400" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-widest">
                    Live Offer: Save 20% Today
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                  Transform Your Institute<br />
                  Into a <span className="text-primary-400">Digital Powerhouse.</span>
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 md:py-10 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl">
                    <i className="bi bi-check-lg" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                    Request Received! 🎉
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 font-bold">
                    Our team will contact you on WhatsApp shortly.
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-slate-500 text-xs md:text-sm font-bold mb-5 leading-relaxed">
                    Get a <span className="text-slate-900">Custom Automation Audit</span> and
                    14-day free trial of EduCore OS.
                  </p>

                  {/*
                    IMPORTANT: The hidden form below is NOT for Netlify detection
                    (that's handled by /public/netlify-forms.html).
                    The actual submission goes via fetch() above.
                  */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    name="educore-demo-request"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* Required hidden fields for Netlify */}
                    <input type="hidden" name="form-name" value="educore-demo-request" />
                    <input type="hidden" name="bot-field" />

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                        <i className="bi bi-person-fill" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name / Institute Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-12 pr-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] md:text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <i className="bi bi-whatsapp" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="WhatsApp Number (10 digits)"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                          setError('')
                        }}
                        required
                        className="w-full pl-12 pr-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] md:text-sm font-bold placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                        <i className="bi bi-building" />
                      </div>
                      <select
                        name="institute_type"
                        value={instituteType}
                        onChange={(e) => setInstituteType(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 md:py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] md:text-sm font-bold appearance-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900"
                      >
                        <option>Coaching Center</option>
                        <option>K-12 School</option>
                        <option>Tuition Center</option>
                        <option>Online Educator</option>
                        <option>Test Series Platform</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <i className="bi bi-chevron-down text-[10px]" />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs font-bold px-1">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'w-full py-4 md:py-5 bg-slate-950 text-white font-extrabold uppercase tracking-[0.2em] text-[10px] md:text-[11px] rounded-2xl shadow-xl transition-all btn-glow shadow-slate-900/20 relative overflow-hidden mt-2',
                        isSubmitting ? 'bg-slate-800 cursor-not-allowed' : 'hover:bg-primary-600 hover:shadow-primary-500/30'
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        'Get My Free Demo'
                      )}
                    </button>

                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center">
                      <i className="bi bi-shield-fill-check text-emerald-500 mr-2" />
                      No credit card required · Zero implementation fee
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
