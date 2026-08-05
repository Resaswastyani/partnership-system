'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'DAFTAR GRATIS',
    description: 'Buat akun affiliate FBL dalam hitungan menit tanpa biaya pendaftaran.',
    color: '#00d2ff',
    glow: 'rgba(0, 210, 255, 0.4)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="22" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'DAPATKAN LINK',
    description: 'Sistem menghasilkan link referral unik milik Anda untuk pelacakan komisi.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <path d="M24 40l-8 8M40 24l8-8M29 35l6-6M20 44l-4 4M44 16l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 26a10 10 0 010 14l-4 4a10 10 0 01-14 0v0a10 10 0 010-14l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 38a10 10 0 010-14l4-4a10 10 0 0114 0v0a10 10 0 010 14l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'PROMOSIKAN',
    description: 'Bagikan ke komunitas atau media sosial menggunakan materi promosi kami.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="12" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="52" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="52" cy="48" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M18 29l28-10M18 35l28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'TERIMA KOMISI',
    description: 'Dapatkan komisi hingga 5% yang cair otomatis setiap bulannya.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 28h48" stroke="currentColor" strokeWidth="2" />
        <path d="M20 40h8M36 40h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 8v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 12l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0], index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-3xl p-8 h-full border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden flex flex-col justify-between"
    >
      {/* Hover Background Glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${step.glow}, transparent 60%)`,
        }}
      />

      {/* Giant Background Number Watermark */}
      <div 
        className="absolute -right-6 -bottom-10 text-[8rem] font-black leading-none pointer-events-none select-none transition-transform duration-500 group-hover:scale-110"
        style={{
          WebkitTextStroke: `1px ${step.color}20`,
          color: 'transparent',
        }}
      >
        {step.number}
      </div>

      <div className="relative z-10">
        {/* Icon Container */}
        <motion.div
          animate={{ 
            y: hovered ? -5 : 0,
            scale: hovered ? 1.05 : 1,
            color: hovered ? '#fff' : step.color
          }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 rounded-2xl inline-flex"
          style={{ 
            backgroundColor: `${step.color}15`,
            color: step.color 
          }}
        >
          {step.icon}
        </motion.div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-3">
          {step.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Progress Line */}
      <div className="relative z-10 w-full h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: step.color }}
        />
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-[#080b14] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Langkah Mudah
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6"
          >
            BAGAIMANA CARA KERJANYA?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Mulai hasilkan pendapatan tambahan hanya dengan 4 langkah sederhana. Bergabunglah dengan ratusan affiliate sukses lainnya.
          </motion.p>
        </div>

        {/* Grid of Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-20 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          
          {STEPS.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden rounded-full bg-primary text-white font-bold px-10 py-5 text-lg"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                Daftar Sekarang — Gratis
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
