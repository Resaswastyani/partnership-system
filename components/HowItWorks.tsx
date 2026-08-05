'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'DAFTAR GRATIS',
    subtitle: 'Create Your Account',
    description: 'Buat akun affiliate FBL dalam hitungan menit. Tidak ada biaya pendaftaran, tidak ada komitmen. Cukup email dan password.',
    color: '#00d2ff',
    glow: 'rgba(0, 210, 255, 0.25)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="22" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'DAPATKAN LINK',
    subtitle: 'Get Your Referral Code',
    description: 'Sistem kami otomatis menghasilkan link referral unik milik Anda. Satu link, tracking semua — klik, daftar, dan konversi.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path d="M24 40l-8 8M40 24l8-8M29 35l6-6M20 44l-4 4M44 16l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 26a10 10 0 010 14l-4 4a10 10 0 01-14 0v0a10 10 0 010-14l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 38a10 10 0 010-14l4-4a10 10 0 0114 0v0a10 10 0 010 14l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'BAGIKAN & PROMOSI',
    subtitle: 'Share & Promote',
    description: 'Bagikan ke komunitas trading, media sosial, atau WhatsApp group. Materi promosi sudah tersedia di dashboard Anda.',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.25)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
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
    subtitle: 'Earn Real Money',
    description: 'Setiap pembelian lewat link Anda menghasilkan komisi hingga 5%. Cair otomatis ke rekening bank Anda setiap tanggal 1.',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="8" y="20" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 28h48" stroke="currentColor" strokeWidth="2" />
        <path d="M20 40h8M36 40h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 8v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 12l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ── Cursor Glow Component ─────────────────────────────────────────
function CursorGlow({ color }: { color: string }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    >
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </motion.div>
  )
}

// ── Single Step Panel ─────────────────────────────────────────────
function StepPanel({ step, index, isActive }: { step: typeof STEPS[0]; index: number; isActive: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-screen flex items-center justify-center sticky top-0"
    >
      {/* Full panel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Giant number + text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {/* Step number */}
          <div className="relative mb-6 select-none">
            <span
              className="text-[8rem] sm:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter"
              style={{
                WebkitTextStroke: `2px ${step.color}30`,
                color: 'transparent',
              }}
            >
              {step.number}
            </span>
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 text-[8rem] sm:text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${step.color}, ${step.color}80)`,
                WebkitBackgroundClip: 'text',
              }}
            >
              {step.number}
            </motion.span>
          </div>

          {/* Subtitle */}
          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-3" style={{ color: step.color }}>
            — {step.subtitle}
          </p>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase leading-none tracking-tight mb-6">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            {step.description}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 mt-10">
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === index ? 40 : 8,
                  opacity: i === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full"
                style={{ background: step.color }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right: Interactive icon card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed opacity-20"
            style={{ borderColor: step.color }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-6 rounded-full border border-dashed opacity-10"
            style={{ borderColor: step.color }}
          />

          {/* Main card */}
          <motion.div
            animate={{
              y: hovered ? -12 : 0,
              scale: hovered ? 1.04 : 1,
              boxShadow: hovered
                ? `0 40px 100px ${step.glow}, 0 0 60px ${step.glow}`
                : `0 20px 60px ${step.glow}40`,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl flex items-center justify-center border"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${step.glow}40, #0c0f1d)`,
              borderColor: `${step.color}20`,
            }}
          >
            {/* Glowing orb background */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background: `radial-gradient(circle at center, ${step.glow}, transparent 70%)`,
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: hovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28"
              style={{ color: step.color }}
            >
              {step.icon}
            </motion.div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg opacity-50" style={{ borderColor: step.color }} />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg opacity-50" style={{ borderColor: step.color }} />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg opacity-50" style={{ borderColor: step.color }} />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 rounded-br-lg opacity-50" style={{ borderColor: step.color }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${step.glow}15, transparent)`,
        }}
      />
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Map scroll to step index
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, STEPS.length - 1])

  useEffect(() => {
    const unsub = stepProgress.on('change', (v) => {
      setActiveStep(Math.min(Math.floor(v), STEPS.length - 1))
    })
    return unsub
  }, [stepProgress])

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-[#080b14]"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* ── Section Label (fixed while scrolling through steps) ── */}
      <div className="sticky top-0 z-50 pointer-events-none">
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/5 bg-[rgba(255,255,255,0.03)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: STEPS[activeStep].color }} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Cara Kerja — Langkah {activeStep + 1} / {STEPS.length}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Cursor glow follows active step color ── */}
      <CursorGlow color={STEPS[activeStep].color} />

      {/* ── Sticky Steps ── */}
      <div className="relative">
        {STEPS.map((step, index) => (
          <StepPanel
            key={step.number}
            step={step}
            index={index}
            isActive={activeStep === index}
          />
        ))}
      </div>

      {/* ── Scroll hint (only on first step) ── */}
      <AnimatePresence>
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-gray-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
