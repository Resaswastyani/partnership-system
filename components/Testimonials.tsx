'use client'

import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Reza Pratama', role: 'Affiliate Gold', earnings: 'Rp 45.2M', avatar: '👨‍💼', rating: 5, text: 'Sistem FBL sangat mudah digunakan. Dalam 3 bulan pertama saya sudah bisa menghasilkan lebih dari 15 juta rupiah hanya dari sharing link!' },
  { name: 'Siti Rahayu', role: 'Top Affiliate', earnings: 'Rp 78.5M', avatar: '👩‍💻', rating: 5, text: 'Dashboard-nya sangat informatif. Saya bisa lihat semua aktivitas referral secara real-time. Pembayaran juga selalu tepat waktu.' },
  { name: 'Ahmad Fauzi', role: 'Affiliate Silver', earnings: 'Rp 22.8M', avatar: '👨‍🦱', rating: 5, text: 'Komisi yang ditawarkan sangat kompetitif. EA Robot Trading FBL sangat mudah dipromosikan karena produknya memang berkualitas.' },
  { name: 'Dewi Lestari', role: 'Affiliate Platinum', earnings: 'Rp 120M+', avatar: '👩‍🦰', rating: 5, text: 'Saya bergabung FBL karena produknya terbukti. Sekarang sudah 2 tahun bergabung dan penghasilan affiliate saya terus tumbuh setiap bulan.' },
  { name: 'Budi Santoso', role: 'Affiliate Gold', earnings: 'Rp 31.6M', avatar: '🧑‍💼', rating: 5, text: 'Maternya sangat membantu dalam promosi. Sudah disediakan banner, konten, dan script. Tinggal share dan komisi masuk!' },
  { name: 'Rani Wijaya', role: 'Affiliate Silver', earnings: 'Rp 18.4M', avatar: '👩‍🦳', rating: 5, text: 'Platform yang sangat transparan. Semua laporan bisa diakses kapan saja dan pembayaran dijamin tepat waktu setiap bulannya.' },
]

export function Testimonials() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#080b14]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            🏆 Kisah Sukses
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Bergabung dengan{' '}
            <span className="bg-clip-text text-transparent"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ribuan Affiliate Sukses
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">Mereka sudah buktikan sendiri. Sekarang giliran Anda.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[rgba(0,210,255,0.2)] hover:bg-[rgba(0,210,255,0.03)] transition-all duration-500 p-6 flex flex-col gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(0,210,255,0.06) 0%, transparent 60%)' }} />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">Total Komisi</p>
                  <p className="text-sm font-bold text-[#00d2ff]">{t.earnings}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '5.800+', label: 'Affiliate Aktif', icon: '👥' },
            { value: 'Rp 28M+', label: 'Total Komisi / Bln', icon: '💰' },
            { value: '98.5%', label: 'Kepuasan Member', icon: '⭐' },
            { value: '<24 Jam', label: 'Waktu Cair', icon: '⚡' },
          ].map((s, i) => (
            <div key={i} className="text-center p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[rgba(0,210,255,0.2)] transition-all">
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
