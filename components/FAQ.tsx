'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const faqs = [
  {
    q: 'Bagaimana cara kerja program afiliasi FBL?',
    a: 'Anda mendaftar gratis, mendapatkan kode referral unik, kemudian membagikan link referral tersebut. Setiap kali seseorang mendaftar dan membeli produk FBL menggunakan link Anda, Anda otomatis mendapat komisi yang langsung terekam di dashboard.'
  },
  {
    q: 'Berapa besar komisi yang bisa saya dapatkan?',
    a: 'Komisi bervariasi tergantung produk, mulai dari 3% hingga 5% per transaksi. Tidak ada batas maksimum penghasilan — semakin banyak referral yang berhasil, semakin besar komisi Anda.'
  },
  {
    q: 'Kapan komisi akan dicairkan ke rekening saya?',
    a: 'Komisi dicairkan otomatis setiap tanggal 1 setiap bulannya. Minimum penarikan adalah Rp 100.000. Dana langsung ditransfer ke rekening bank yang Anda daftarkan saat registrasi.'
  },
  {
    q: 'Apakah ada biaya untuk bergabung menjadi affiliate?',
    a: 'Tidak sama sekali! Program afiliasi FBL 100% gratis. Anda hanya perlu mendaftar, dan semua fitur dashboard, tracking, dan penarikan bisa langsung Anda gunakan tanpa biaya apapun.'
  },
  {
    q: 'Produk apa saja yang bisa saya promosikan?',
    a: 'Ada 4 produk unggulan FBL: (1) Materi Profesional Trading, (2) EA Robot Trading FBL, (3) Jurnal Trading Digital, dan (4) Position Size Calculator Pro. Semua tersedia di dashboard affiliate Anda.'
  },
  {
    q: 'Bagaimana cara melacak referral dan penghasilan saya?',
    a: 'Dashboard affiliate kami menampilkan data real-time: jumlah klik link, pendaftaran baru, konversi pembelian, dan total komisi — semuanya diperbarui secara langsung tanpa perlu me-refresh halaman.'
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#080b14]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 50%, rgba(0,210,255,0.05) 0%, transparent 50%)' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[#00d2ff] text-xs font-bold uppercase tracking-widest mb-6">
            💬 FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Pertanyaan yang{' '}
            <span className="bg-clip-text text-transparent"
              style={{ background: 'linear-gradient(135deg, #00d2ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Sering Ditanyakan
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.05)]'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={`font-semibold text-sm md:text-base transition-colors ${openIndex === i ? 'text-[#00d2ff]' : 'text-white'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                    openIndex === i
                      ? 'border-[rgba(0,210,255,0.4)] bg-[rgba(0,210,255,0.1)] text-[#00d2ff]'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
