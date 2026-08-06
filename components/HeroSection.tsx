'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => { setMounted(true) }, [])

  const stars = mounted ? Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.6 + 0.2,
  })) : []

  const partners = ['MetaTrader 4', 'MT5 Pro', 'TradingView', 'IC Markets', 'XM Global', 'Exness', 'Vantage FX']

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#080b14] pt-28 pb-16 px-4 sm:px-6 lg:px-8">

      {/* ── Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* ── Stars ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.div key={s.id}
            animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          />
        ))}
      </div>

      {/* ── Ambient Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.25) 0%, transparent 70%)' }}
        />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(100,60,255,0.2) 0%, transparent 70%)' }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto">

        {/* ── Badge ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[#00d2ff] text-sm font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
            🚀 Platform Afiliasi Terdepan FBL
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-5xl mx-auto">
          Hasilkan Komisi{' '}
          <span className="relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d2ff] via-[#7c3aed] to-[#00d2ff] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
              Tanpa Batas
            </span>
          </span>
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Bergabunglah dengan ribuan affiliate partner FBL. Dapatkan link referral otomatis, dashboard real-time, dan komisi langsung ke rekening Anda.
        </motion.p>

        {/* ── CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/register"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-[0_0_40px_rgba(0,210,255,0.3)] hover:shadow-[0_0_60px_rgba(0,210,255,0.5)] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Mulai Gratis</span>
            <span className="relative group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="/admin"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#00d2ff] border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.05)] hover:bg-[rgba(0,210,255,0.1)] transition-all duration-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Coba Demo Admin
          </Link>
        </motion.div>

        {/* ── 3 Phone Mockups ── */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
          className="relative flex justify-center items-end gap-4 md:gap-6 mb-20 h-[420px] md:h-[500px]">

          {/* Left Phone */}
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative hidden md:block w-[180px] shrink-0" style={{ transform: 'perspective(1000px) rotateY(15deg)' }}>
            <div className="absolute -inset-1 rounded-[2rem] blur-lg opacity-30"
              style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)' }} />
            <div className="relative border-[8px] border-gray-800 bg-[#09090b] rounded-[2rem] h-[360px] overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-4 bg-gray-900 rounded-b-xl w-16 mx-auto" />
              <div className="flex flex-col p-3 pt-8 h-full bg-[#080b14]">
                <p className="text-[8px] text-gray-500 mb-1">Referral Link</p>
                <div className="bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] rounded-lg p-2 mb-3">
                  <p className="text-[8px] text-[#00d2ff] font-mono truncate">fbl.id/ref/Reza123</p>
                </div>
                <p className="text-[8px] text-gray-500 mb-1">Statistik Bulan Ini</p>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {[{ l: 'Klik', v: '1,284' }, { l: 'Daftar', v: '47' }, { l: 'Beli', v: '23' }, { l: 'Rate', v: '48.9%' }].map(x => (
                    <div key={x.l} className="bg-white/5 rounded-lg p-2">
                      <p className="text-[7px] text-gray-400">{x.l}</p>
                      <p className="text-[10px] font-bold text-white">{x.v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex items-end gap-0.5 px-1">
                  {[30, 60, 40, 80, 55, 90, 70].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
                      className="flex-1 rounded-t-sm" style={{ background: i === 5 ? '#00d2ff' : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Phone (Main) */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20 w-[230px] md:w-[260px] shrink-0">
            <div className="absolute -inset-2 rounded-[2.5rem] blur-2xl opacity-50"
              style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)' }} />
            <div className="relative border-[10px] border-gray-700 bg-[#09090b] rounded-[2.5rem] h-[440px] md:h-[480px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-24 mx-auto z-10" />
              {/* Screen */}
              <div className="flex flex-col h-full bg-[#080b14] overflow-hidden">
                {/* Balance */}
                <div className="pt-8 px-5 pb-4" style={{ background: 'linear-gradient(180deg, rgba(0,210,255,0.15) 0%, transparent 100%)' }}>
                  <p className="text-[10px] text-gray-400 mb-1">Total Komisi Anda</p>
                  <h2 className="text-3xl font-bold text-white">Rp 12.500.000</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">▲ +18.5%</span>
                    <span className="text-[10px] text-gray-500">dari bulan lalu</span>
                  </div>
                </div>
                {/* Chart */}
                <div className="px-4 py-3">
                  <div className="h-28 flex items-end gap-1">
                    {[35, 55, 40, 75, 50, 88, 65, 95, 80, 100].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 1.2 + i * 0.08 }}
                        className="flex-1 rounded-t"
                        style={{ background: i === 9 ? 'linear-gradient(to top, #00d2ff, #7c3aed)' : 'rgba(255,255,255,0.07)' }} />
                    ))}
                  </div>
                </div>
                {/* Activity */}
                <div className="flex-1 px-4 py-4 rounded-t-3xl border-t border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] font-bold text-gray-300 mb-3 uppercase tracking-wider">Transaksi Terbaru</p>
                  <div className="space-y-2.5">
                    {[
                      { icon: '🛒', title: 'EA Robot Trading', amount: '+Rp 250.000', color: '#00d2ff' },
                      { icon: '👥', title: 'Referral Aktif Baru', amount: '+3 Member', color: '#7c3aed' },
                      { icon: '📤', title: 'Penarikan Berhasil', amount: '-Rp 1.000.000', color: '#ef4444' },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.8 + i * 0.15 }}
                        className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-sm shrink-0">{item.icon}</div>
                          <p className="text-[10px] text-gray-300">{item.title}</p>
                        </div>
                        <p className="text-[10px] font-bold" style={{ color: item.color }}>{item.amount}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floor glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 blur-2xl rounded-full"
              style={{ background: 'rgba(0,210,255,0.4)' }} />
          </motion.div>

          {/* Right Phone */}
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="relative hidden md:block w-[180px] shrink-0" style={{ transform: 'perspective(1000px) rotateY(-15deg)' }}>
            <div className="absolute -inset-1 rounded-[2rem] blur-lg opacity-30"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #00d2ff)' }} />
            <div className="relative border-[8px] border-gray-800 bg-[#09090b] rounded-[2rem] h-[360px] overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-4 bg-gray-900 rounded-b-xl w-16 mx-auto" />
              <div className="flex flex-col p-3 pt-8 h-full bg-[#080b14] gap-2">
                <p className="text-[8px] text-gray-500">Produk Terlaris</p>
                {[
                  { name: 'EA Robot', pct: 90, color: '#00d2ff' },
                  { name: 'Materi Pro', pct: 70, color: '#7c3aed' },
                  { name: 'Jurnal', pct: 50, color: '#f59e0b' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5">
                      <p className="text-[8px] text-gray-300">{p.name}</p>
                      <p className="text-[8px] font-bold" style={{ color: p.color }}>{p.pct}%</p>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }}
                        transition={{ duration: 1, delay: 1.5 + i * 0.2 }}
                        className="h-full rounded-full" style={{ background: p.color }} />
                    </div>
                  </div>
                ))}
                <p className="text-[8px] text-gray-500 mt-2">Komisi Pending</p>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
                  <p className="text-[10px] font-bold text-amber-400">Rp 3.200.000</p>
                  <p className="text-[7px] text-gray-500">Cair tanggal 1</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Badges */}
          <motion.div animate={{ y: [-12, 12, -12], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-2 md:left-[8%] top-[15%] z-30 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10"
            style={{ background: 'rgba(0,210,255,0.12)' }}>
            <span className="text-lg">📈</span>
            <div>
              <p className="text-[9px] text-gray-400">Profit Rate</p>
              <p className="text-sm font-bold text-[#00d2ff]">+24.8%</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [12, -12, 12], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute right-2 md:right-[8%] top-[10%] z-30 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10"
            style={{ background: 'rgba(124,58,237,0.15)' }}>
            <span className="text-lg">💰</span>
            <div>
              <p className="text-[9px] text-gray-400">Komisi Hari Ini</p>
              <p className="text-sm font-bold text-purple-400">Rp 850K</p>
            </div>
          </motion.div>

          <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-4 md:right-[15%] bottom-[15%] z-30 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border border-emerald-500/20"
            style={{ background: 'rgba(16,185,129,0.1)' }}>
            <span className="text-lg">🏆</span>
            <div>
              <p className="text-[9px] text-gray-400">Top Affiliate</p>
              <p className="text-xs font-bold text-emerald-400">Reza_FBL</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Partner Ticker ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="relative overflow-hidden">
          <p className="text-center text-[11px] text-gray-600 uppercase tracking-widest font-semibold mb-5">
            Platform Trading Partner Kami
          </p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="flex gap-8 shrink-0">
              {[...partners, ...partners].map((p, i) => (
                <div key={i} className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-white/5 bg-white/[0.03] hover:text-white hover:border-white/10 transition-colors whitespace-nowrap">
                  {p}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  )
}
