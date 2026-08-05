'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-purple-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-gray-300">Sistem Afiliasi Terdepan FBL</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          We Create <br className="hidden md:block" />
          <span className="text-gradient">Digital Magical</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          Bergabunglah dengan ribuan affiliate partner FBL. Dapatkan referral link otomatis, track earnings real-time, dan terima komisi fantastis.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
        >
          <Link
            href="/register"
            className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-full overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Mulai Sekarang <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur-md transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </Link>
        </motion.div>

        {/* Floating Cards (3D Effect) */}
        <div className="w-full relative h-[400px] md:h-[500px] mt-10 perspective-1000">
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="absolute inset-0 flex justify-center"
          >
            {/* Center Main Card */}
            <div className="w-[300px] md:w-[400px] h-[350px] glass-card rounded-2xl p-6 flex flex-col justify-between absolute z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-2xl">🤖</div>
                <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">+5% Komisi</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">EA Robot Trading</h3>
                <p className="text-gray-400 text-sm">Automasi trading cerdas dengan algoritma yang teruji.</p>
              </div>
            </div>

            {/* Left Card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex w-[280px] h-[280px] glass-card rounded-2xl p-6 flex-col justify-between absolute -left-10 md:left-[10%] top-20 z-10 opacity-60 hover:opacity-100 hover:z-30 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent text-xl">📈</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Materi Trading</h3>
                <p className="text-gray-400 text-xs">Edukasi premium untuk semua level.</p>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex w-[280px] h-[280px] glass-card rounded-2xl p-6 flex-col justify-between absolute -right-10 md:right-[10%] top-10 z-10 opacity-60 hover:opacity-100 hover:z-30 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 text-xl">📓</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Jurnal Trading</h3>
                <p className="text-gray-400 text-xs">Analisa dan evaluasi trading Anda.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
