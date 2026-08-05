'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate random stars
  const stars = mounted ? Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  })) : []

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`
            }}
          />
        ))}

        {/* Ambient Gradient Orbs */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-accent/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Sistem Afiliasi Terdepan FBL</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            We Create <br className="hidden lg:block" />
            <span className="text-gradient">Digital Magical</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-xl mb-10"
          >
            Bergabunglah dengan ribuan affiliate partner FBL. Dapatkan referral link otomatis, track earnings real-time, dan terima komisi fantastis langsung dari genggaman Anda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center justify-center gap-2">
                Mulai Sekarang <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur-md transition-all duration-300 text-center"
            >
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </div>

        {/* Right Content - 3D Smartphone & Trading Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="relative h-[600px] w-full max-w-[400px] mx-auto perspective-1000 mt-10 lg:mt-0"
        >
          {/* Floating Trading Elements */}
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] -left-12 z-20 glass-card p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-2"
          >
            <span className="text-2xl">📈</span>
            <div>
              <p className="text-[10px] text-gray-400">Profit</p>
              <p className="text-sm font-bold text-emerald-400">+12.5%</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] -right-8 z-20 glass-card p-3 rounded-xl border border-primary/30 bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.2)] flex items-center gap-2"
          >
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-[10px] text-gray-400">Komisi</p>
              <p className="text-sm font-bold text-primary">Rp 2.5M</p>
            </div>
          </motion.div>

          {/* Smartphone Mockup */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto border-gray-800 dark:border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[550px] w-[270px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 overflow-hidden"
          >
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-2xl w-32 mx-auto z-30" />
            
            {/* Phone Screen App UI */}
            <div className="absolute inset-0 bg-[#09090b] text-white overflow-hidden flex flex-col">
              {/* Header */}
              <div className="pt-8 pb-4 px-5 bg-gradient-to-b from-primary/20 to-transparent">
                <p className="text-[10px] text-gray-400">Total Saldo</p>
                <h3 className="text-2xl font-bold text-white">Rp 12.500.000</h3>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">+5.2% bulan ini</span>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="px-4 py-2">
                <div className="h-32 w-full flex items-end justify-between gap-1">
                  {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                      className={`w-full rounded-t-sm ${i === 7 ? 'bg-primary' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="flex-1 px-4 py-4 mt-2 bg-white/[0.02] rounded-t-3xl border-t border-white/5">
                <p className="text-xs font-semibold mb-4 text-gray-300">Aktivitas Terbaru</p>
                <div className="space-y-3">
                  {[
                    { icon: '🛒', title: 'Penjualan EA Robot', amount: '+Rp 250.000', color: 'text-emerald-400' },
                    { icon: '👥', title: 'Referral Baru', amount: 'Member Aktif', color: 'text-primary' },
                    { icon: '📤', title: 'Penarikan Dana', amount: '-Rp 1.000.000', color: 'text-red-400' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 + (i * 0.2) }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm">{item.icon}</div>
                        <span className="text-[11px] text-gray-300">{item.title}</span>
                      </div>
                      <span className={`text-[11px] font-bold ${item.color}`}>{item.amount}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-40 transform -skew-x-12" />
          </motion.div>
          
          {/* Floor Reflection */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-primary/30 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </div>
  )
}
