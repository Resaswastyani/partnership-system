'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#080b14]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden p-[1px]"
          style={{ background: 'linear-gradient(135deg, rgba(0,210,255,0.4) 0%, rgba(124,58,237,0.4) 50%, rgba(0,210,255,0.4) 100%)' }}
        >
          {/* Inner card */}
          <div className="relative rounded-3xl bg-[#0c0f1d] overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[120px]"
                style={{ background: 'rgba(0,210,255,0.15)' }} />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-[120px]"
                style={{ background: 'rgba(124,58,237,0.15)' }} />
              {/* Grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-10 md:p-16">
              {/* Left Text */}
              <div>
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[#00d2ff] text-xs font-bold uppercase tracking-widest mb-6">
                  🎯 Mulai Sekarang
                </motion.span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Siap Hasilkan{' '}
                  <span className="bg-clip-text text-transparent"
                    style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Komisi Jutaan
                  </span>
                  {' '}Rupiah?
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Bergabunglah dengan 5.800+ affiliate FBL dan mulai hasilkan komisi nyata hari ini. Gratis, mudah, dan transparan.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base overflow-hidden shadow-[0_0_40px_rgba(0,210,255,0.3)] hover:shadow-[0_0_60px_rgba(0,210,255,0.5)] transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #7c3aed 100%)' }}>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative">Daftar Gratis Sekarang</span>
                    <span className="relative group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link href="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300">
                    Sudah Punya Akun?
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {['✅ Gratis Bergabung', '⚡ Komisi Real-time', '🔒 100% Aman'].map((badge) => (
                    <span key={badge} className="text-xs text-gray-400 font-medium">{badge}</span>
                  ))}
                </div>
              </div>

              {/* Right — App Mockup (Phone) */}
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-40"
                    style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)' }} />

                  {/* Phone */}
                  <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative border-[10px] border-gray-700 bg-[#09090b] rounded-[2.5rem] w-[260px] h-[480px] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 rounded-b-2xl w-24 mx-auto z-10" />
                    <div className="flex flex-col h-full bg-[#080b14]">
                      {/* App Header */}
                      <div className="px-5 pt-8 pb-4" style={{ background: 'linear-gradient(180deg, rgba(0,210,255,0.12) 0%, transparent 100%)' }}>
                        <p className="text-[9px] text-gray-500 mb-1">Selamat datang,</p>
                        <p className="text-sm font-bold text-white">Affiliate FBL 👋</p>
                        <div className="mt-3 p-3 rounded-xl border border-[rgba(0,210,255,0.2)] bg-[rgba(0,210,255,0.07)]">
                          <p className="text-[9px] text-gray-400">Total Komisi Bulan Ini</p>
                          <p className="text-xl font-bold text-[#00d2ff]">Rp 4.250.000</p>
                        </div>
                      </div>
                      {/* Steps */}
                      <div className="px-4 py-4 flex-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-3">Cara Mulai</p>
                        {[
                          { step: '01', title: 'Daftar Gratis', done: true },
                          { step: '02', title: 'Dapat Kode Referral', done: true },
                          { step: '03', title: 'Bagikan Link', done: false },
                          { step: '04', title: 'Terima Komisi', done: false },
                        ].map((s) => (
                          <div key={s.step} className="flex items-center gap-3 mb-3">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${s.done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                              {s.done ? '✓' : s.step}
                            </div>
                            <p className={`text-[10px] ${s.done ? 'text-white font-semibold' : 'text-gray-500'}`}>{s.title}</p>
                          </div>
                        ))}
                      </div>
                      {/* Bottom CTA */}
                      <div className="px-4 pb-6">
                        <div className="w-full py-3 rounded-2xl text-center text-xs font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)' }}>
                          Bagikan Sekarang →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Floor glow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 blur-2xl rounded-full"
                    style={{ background: 'rgba(0,210,255,0.5)' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
