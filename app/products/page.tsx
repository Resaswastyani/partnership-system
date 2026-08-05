'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function ProductsPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSimulateBuy = async (productId: string) => {
    try {
      const userStr = localStorage.getItem('auth_user')
      if (!userStr) {
        alert('Harap login terlebih dahulu untuk mensimulasikan pembelian.')
        return
      }
      const user = JSON.parse(userStr)
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerId: user.id, productId })
      })
      const data = await res.json()
      if (data.success) {
        alert('✅ Pembelian Berhasil! ' + data.message)
      } else {
        alert('❌ Error: ' + data.error)
      }
    } catch (err) {
      alert('Gagal melakukan transaksi')
    }
  }

  const faqs = [
    {
      q: 'Bagaimana cara mendapatkan akses produk setelah membeli?',
      a: 'Untuk produk tipe download, Anda akan mendapat link download langsung setelah checkout. Untuk produk tipe web access, Anda akan menerima login credentials via email.'
    },
    {
      q: 'Apakah produk ini mendapat update gratis?',
      a: 'Ya! Semua produk FBL mendapatkan update gratis seumur hidup (lifetime access) tanpa biaya tambahan.'
    },
    {
      q: 'Bagaimana jika saya tidak puas dengan produknya?',
      a: 'Kami menawarkan garansi uang kembali 100% selama 30 hari jika Anda tidak puas dengan produk kami. Kepuasan Anda adalah prioritas.'
    }
  ]

  return (
    <main className="w-full min-h-screen bg-[#05070a] text-white overflow-hidden relative selection:bg-primary/30 selection:text-white" ref={containerRef}>
      <Header />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[20%] bg-indigo-500/10 rounded-[100%] blur-[100px]" />
      </div>

      <div className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* ── HERO SECTION ── */}
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-32 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-gray-300 text-xs font-bold tracking-[0.2em] uppercase">Premium Trading Assets</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            PRODUK <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">FBL</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">&amp; HARGA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            Jelajahi koleksi produk trading profesional. Jual produk ini dan nikmati komisi <strong className="text-white font-bold">hingga 20%</strong>.
          </motion.p>
        </motion.div>

        {/* ── PRODUCTS GRID ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 py-10 animate-pulse">Memuat produk dari database...</div>
          ) : products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              key={product.id}
              className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col hover:bg-white/[0.04] transition-colors duration-500"
            >
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-primary/10 to-transparent transition-opacity duration-500 z-0" />

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden z-10">
                <Image
                  src={product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className={product.type === 'download' ? 'text-primary' : 'text-accent'}>
                    {product.type === 'download' ? '📥' : '🔑'}
                  </span>
                  {product.type === 'download' ? 'Download' : 'Web Access'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 relative z-10">
                <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {product.features?.slice(0, 3).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6 group-hover:border-primary/20 transition-colors duration-500">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Harga</span>
                    <span className="text-2xl font-black">Rp {(product.price / 1000).toLocaleString()}K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary text-xs uppercase tracking-wider font-bold">Komisi Affiliate</span>
                    <span className="text-primary font-black text-lg">{product.commission_rate}%</span>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-emerald-400 text-xs font-semibold">
                      ≈ Rp {Math.floor(product.price * product.commission_rate / 100).toLocaleString()} / penjualan
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleSimulateBuy(product.id)}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-xl text-center transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-sm"
                  >
                    🛒 Simulasi Beli
                  </button>
                  <Link
                    href="/register"
                    className="w-full py-3 bg-white/10 hover:bg-primary text-white font-bold rounded-xl text-center transition-colors duration-300 text-sm"
                  >
                    Mulai Jual (Daftar)
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── COMPARISON TABLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black">Perbandingan Produk</h2>
            <p className="text-gray-400">Pilih produk yang paling sesuai untuk audiens Anda.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-1 overflow-x-auto backdrop-blur-xl">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-6 text-gray-500 font-semibold uppercase tracking-wider text-xs">Fitur / Produk</th>
                  {products.map((p: any) => (
                    <th key={p.id} className="p-6 text-center">
                      <div className="font-bold text-lg">{p.name}</div>
                      <div className="text-primary text-sm mt-1">{p.commission_rate}% Komisi</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-6 text-gray-300 font-medium">Harga Dasar</td>
                  {products.map((p: any) => (
                    <td key={p.id} className="p-6 text-center font-bold text-xl">
                      Rp {(p.price / 1000).toLocaleString()}K
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-gray-300 font-medium">Komisi Per Sale</td>
                  {products.map((p: any) => (
                    <td key={p.id} className="p-6 text-center text-emerald-400 font-bold">
                      Rp {Math.floor(p.price * p.commission_rate / 100).toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-gray-300 font-medium">Tipe Akses</td>
                  {products.map((p: any) => (
                    <td key={p.id} className="p-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${p.type === 'download' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                        {p.type === 'download' ? '📥 Download' : '🔑 Web Access'}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-gray-300 font-medium">Dukungan Support</td>
                  {products.map((p: any) => (
                    <td key={p.id} className="p-6 text-center">
                      <svg className="w-5 h-5 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-gray-300 font-medium">Lifetime Update</td>
                  {products.map((p: any) => (
                    <td key={p.id} className="p-6 text-center">
                      <svg className="w-5 h-5 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── FAQ SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-20"
          id="faq"
        >
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black">Pertanyaan Umum</h2>
            <p className="text-gray-400">Jawaban untuk pertanyaan yang sering diajukan pembeli.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div
                  key={idx}
                  className={`border ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-white/5 bg-white/[0.02]'} rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className={`font-bold text-lg ${isOpen ? 'text-primary' : 'text-white'}`}>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border ${isOpen ? 'border-primary text-primary' : 'border-white/10 text-gray-400'} flex items-center justify-center shrink-0 transition-all duration-300`}>
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </motion.svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>

      <Footer />
    </main>
  )
}
