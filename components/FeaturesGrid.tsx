'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function FeaturesGrid() {
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#080b14]">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 60%, rgba(0,210,255,0.05) 0%, transparent 60%),
            radial-gradient(circle at 70% 20%, rgba(124,58,237,0.08) 0%, transparent 60%)`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[#00d2ff] text-xs font-bold uppercase tracking-widest mb-6">
            ⚡ Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Semua yang Anda Butuhkan{' '}
            <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ada di Sini
            </span>
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
        >
          {/* CARD 1 — Large: Real-time Dashboard */}
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2 row-span-2 group relative rounded-2xl border border-white/5 bg-[rgba(0,210,255,0.04)] hover:border-[rgba(0,210,255,0.25)] overflow-hidden transition-all duration-500 p-7 flex flex-col justify-between min-h-[300px]">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,210,255,0.08) 0%, transparent 70%)' }} />
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 border border-[rgba(0,210,255,0.2)]"
                style={{ background: 'rgba(0,210,255,0.1)' }}>📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Dashboard</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Pantau semua referral, konversi, dan komisi Anda secara langsung (live) tanpa perlu refresh halaman.</p>
            </div>
            {/* Mini chart preview */}
            <div className="mt-6 h-24 flex items-end gap-1.5">
              {[30,55,40,70,55,85,65,90,75,100].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.07 }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i === 9 ? 'linear-gradient(to top, #00d2ff, #7c3aed)' : 'rgba(255,255,255,0.07)' }}
                />
              ))}
            </div>
          </motion.div>

          {/* CARD 2 — Link Otomatis */}
          <motion.div variants={item} className="group relative rounded-2xl border border-white/5 bg-[rgba(124,58,237,0.05)] hover:border-[rgba(124,58,237,0.3)] overflow-hidden transition-all duration-500 p-6 flex flex-col gap-4">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 70% 70%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border border-purple-500/20"
              style={{ background: 'rgba(124,58,237,0.15)' }}>🔗</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Link Referral Otomatis</h3>
              <p className="text-gray-400 text-sm">Link unik Anda dibuat otomatis. Cukup share dan sistem kami yang tracking.</p>
            </div>
            <div className="mt-auto bg-white/5 border border-white/5 rounded-xl p-3 font-mono text-xs text-purple-400 truncate">
              fbl.id/ref/<span className="text-white">YourCode123</span>
            </div>
          </motion.div>

          {/* CARD 3 — Komisi Tinggi */}
          <motion.div variants={item} className="group relative rounded-2xl border border-white/5 bg-[rgba(251,191,36,0.03)] hover:border-[rgba(251,191,36,0.25)] overflow-hidden transition-all duration-500 p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border border-amber-500/20"
              style={{ background: 'rgba(251,191,36,0.1)' }}>💎</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Komisi s/d 5%</h3>
              <p className="text-gray-400 text-sm">Komisi kompetitif per produk, makin banyak jual makin besar penghasilan.</p>
            </div>
            <div className="flex items-end gap-1 mt-auto h-12">
              {[4,5,4.5,5,3.5,5,4.8].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-amber-400/30" style={{ height: `${h / 5 * 100}%` }} />
              ))}
            </div>
          </motion.div>

          {/* CARD 4 — Withdrawal Instant */}
          <motion.div variants={item} className="group relative rounded-2xl border border-white/5 bg-[rgba(16,185,129,0.03)] hover:border-[rgba(16,185,129,0.25)] overflow-hidden transition-all duration-500 p-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border border-emerald-500/20"
              style={{ background: 'rgba(16,185,129,0.1)' }}>🏦</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Pembayaran Tepat Waktu</h3>
              <p className="text-gray-400 text-sm">Penarikan otomatis setiap bulan langsung ke rekening bank Anda.</p>
            </div>
            <div className="mt-auto flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold">Cair Otomatis Tgl 1</span>
            </div>
          </motion.div>

          {/* CARD 5 — Statistik Lebar */}
          <motion.div variants={item} className="md:col-span-2 lg:col-span-2 group relative rounded-2xl border border-white/5 bg-[rgba(0,210,255,0.03)] hover:border-[rgba(0,210,255,0.2)] overflow-hidden transition-all duration-500 p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border border-[rgba(0,210,255,0.2)] mb-4"
              style={{ background: 'rgba(0,210,255,0.08)' }}>📢</div>
            <h3 className="text-lg font-bold text-white mb-1">Materi Marketing Siap Pakai</h3>
            <p className="text-gray-400 text-sm mb-4">Akses banner, caption, dan template konten siap pakai untuk promosi produk FBL di sosial media Anda.</p>
            <div className="grid grid-cols-3 gap-3">
              {['Banner IG', 'Caption WA', 'Template FB'].map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-xl py-3 text-center text-xs font-medium text-gray-400 hover:text-[#00d2ff] hover:border-[rgba(0,210,255,0.3)] transition-all">
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARD 6 — Support 24/7 */}
          <motion.div variants={item} className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[rgba(0,210,255,0.2)] overflow-hidden transition-all duration-500 p-6 flex flex-col gap-3 items-center text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}>🤝</div>
            <h3 className="text-lg font-bold text-white">Support 24/7</h3>
            <p className="text-gray-400 text-sm">Tim kami siap membantu kapan pun lewat chat & email.</p>
            <Link href="#" className="mt-2 text-xs text-[#00d2ff] font-semibold hover:underline">Hubungi Kami →</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
