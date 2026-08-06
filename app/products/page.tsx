'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

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
  // New: product type filter
  const [filter, setFilter] = useState<'all' | 'materi' | 'paket' | 'ea' | 'position-size' | 'jurnal'>('all')
  // Analytics helper
  const trackFilterUsage = useCallback((selected: string) => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'filter_click', filter: selected })
    })
    const existing = Number(localStorage.getItem('filter_' + selected) || '0')
    localStorage.setItem('filter_' + selected, String(existing + 1))
  }, [])
  
  // Checkout Modal State
  const [checkoutModal, setCheckoutModal] = useState({ isOpen: false, productId: '' })
  const [buyerInfo, setBuyerInfo] = useState({ name: '', email: '', phone: '' })
  const [refCode, setRefCode] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Parse ref from URL
    const params = new URLSearchParams(window.location.search)
    if (params.has('ref')) setRefCode(params.get('ref'))

    // Pre-fill user info if logged in
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setBuyerInfo(prev => ({ ...prev, name: parsed.name, email: parsed.email, phone: parsed.phone || '' }))
    }
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleBuy = (productId: string) => {
    setCheckoutModal({ isOpen: true, productId })
  }

  const submitCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload = {
        productId: checkoutModal.productId,
        name: buyerInfo.name,
        email: buyerInfo.email,
        phone: buyerInfo.phone,
        refCode
      }

      // Create payment
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()

      if (!data.success) {
        alert('Gagal membuat pembayaran: ' + data.error)
        setIsSubmitting(false)
        return
      }

      // Open Midtrans Snap popup
      const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'Mid-client-TmuKXgFh17kvdyDm'
      const snapScript = document.getElementById('midtrans-snap')
      if (!snapScript) {
        const script = document.createElement('script')
        script.id = 'midtrans-snap'
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.setAttribute('data-client-key', clientKey)
        document.head.appendChild(script)
        script.onload = () => {
          setCheckoutModal({ isOpen: false, productId: '' })
          openSnap(data.snapToken)
        }
      } else {
        setCheckoutModal({ isOpen: false, productId: '' })
        openSnap(data.snapToken)
      }
    } catch (err) {
      alert('Gagal melakukan pembayaran')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openSnap = (snapToken: string) => {
    // @ts-ignore
    window.snap.pay(snapToken, {
      onSuccess: (result: any) => {
        alert('✅ Pembayaran berhasil! Terima kasih.')
        window.location.href = '/dashboard?payment=success'
      },
      onPending: (result: any) => {
        alert('⏳ Pembayaran sedang diproses. Cek email Anda.')
      },
      onError: (result: any) => {
        alert('❌ Pembayaran gagal. Silakan coba lagi.')
      },
      onClose: () => {
        console.log('Snap closed without completing payment')
      }
    })
  }


  const BUNDLE_ID = 'bundle-001'
  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true
    if (filter === 'paket') return p.id === BUNDLE_ID
    if (filter === 'materi') return p.id !== BUNDLE_ID && !p.name.toLowerCase().includes('ea') && !p.name.toLowerCase().includes('position') && !p.name.toLowerCase().includes('jurnal')
    if (filter === 'ea') return p.name.toLowerCase().includes('ea')
    if (filter === 'position-size') return p.name.toLowerCase().includes('position')
    if (filter === 'jurnal') return p.name.toLowerCase().includes('jurnal')
    return true
  })
  const bundleProduct = products.find(p => p.id === BUNDLE_ID)
  const individualProducts = filteredProducts.filter(p => p.id !== BUNDLE_ID)
  
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

        {/* ── FILTER TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {[
            { key: 'all', label: 'Semua', icon: '🏷️' },
            { key: 'materi', label: 'Materi Trading', icon: '📚' },
            { key: 'paket', label: 'Paket Bundle', icon: '🎁' },
            { key: 'ea', label: 'Expert Advisor', icon: '🤖' },
            { key: 'position-size', label: 'Position Size Calc', icon: '📐' },
            { key: 'jurnal', label: 'Jurnal Trading', icon: '📒' },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              id={`filter-${key}`}
              aria-pressed={filter === key}
              onClick={() => { setFilter(key as any); trackFilterUsage(key) }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
                filter === key
                  ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.07] hover:text-white hover:border-white/20'
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </motion.div>

        {/* ── MAIN LAYOUT: Bundle Left (sticky) + Products Right ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-40">

          {/* ── LEFT: STICKY BUNDLE CARD ── */}
          <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24">
            {bundleProduct && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-purple-500/40 bg-gradient-to-b from-[#1a0a2e] to-[#0d1525]"
              >
                {/* HOT DEAL Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black tracking-wide">
                    🔥 HOT DEAL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold">73% OFF</span>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-indigo-900/20 pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 p-6 pt-16">
                  <h3 className="text-2xl font-black text-white mb-1 leading-tight">ULTIMATE TRADING BUNDLE</h3>
                  <p className="text-purple-300 text-sm font-semibold mb-4">Includes {bundleProduct.features?.length || 23} Courses:</p>

                  {/* Course list */}
                  <div className="space-y-1.5 mb-6 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
                    {(bundleProduct.features || []).map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-purple-400 font-bold mt-0.5 shrink-0">{i + 1}.</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="border-t border-white/10 pt-4 mb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gray-500 line-through text-sm">Rp 748.550</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">HEMAT 73%</span>
                    </div>
                    <div className="text-3xl font-black text-white">Rp 199.000</div>
                    <div className="text-emerald-400 text-xs font-semibold mt-1">
                      ≈ Komisi Rp {Math.floor((bundleProduct.price || 199000) * (bundleProduct.commission_rate || bundleProduct.commissionRate || 5) / 100).toLocaleString()} / penjualan
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(bundleProduct.id)}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                  >
                    🛒 ADD TO CART
                  </button>
                  <Link
                    href="/register"
                    className="block w-full mt-2 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold rounded-xl text-sm text-center transition-all duration-300 border border-white/10"
                  >
                    Mulai Jual (Daftar)
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: INDIVIDUAL PRODUCTS LIST ── */}
          <div className="flex-1 space-y-4">
            {loading ? (
              <div className="text-center text-gray-400 py-20 animate-pulse">Memuat produk dari database...</div>
            ) : individualProducts.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-semibold text-lg">Tidak ada produk untuk kategori ini.</p>
              </div>
            ) : (
              individualProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group relative flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.045] hover:border-white/10 transition-all duration-300 backdrop-blur-md"
                >
                  {/* Left: Index number */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-sm">
                    {index + 1}
                  </div>

                  {/* Middle: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-base leading-snug">{product.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        product.price === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'
                      }`}>
                        {product.price === 0 ? '✓ Gratis' : `Rp ${(product.price / 1000).toLocaleString()}K`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">📚 1 Lessons</span>
                      <span className="flex items-center gap-1">⏱ 15 min</span>
                      <span className="flex items-center gap-1">📈 All Levels</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">
                    <div className="text-right">
                      {product.price === 0 ? (
                        <span className="text-emerald-400 font-black text-lg">Free</span>
                      ) : (
                        <span className="text-white font-black text-lg">Rp {(product.price / 1000).toLocaleString()}K</span>
                      )}
                      {product.commission_rate > 0 && (
                        <div className="text-primary text-xs font-semibold mt-0.5">{product.commission_rate}% komisi</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBuy(product.id)}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-xl text-xs font-bold transition-all duration-300"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleBuy(product.id)}
                        className="px-4 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
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

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0a0f16] border border-white/10 p-8 rounded-3xl relative"
            >
              <button
                onClick={() => setCheckoutModal({ isOpen: false, productId: '' })}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">Checkout Detail</h3>
              <p className="text-gray-400 text-sm mb-6">Silakan isi data Anda untuk melanjutkan pembayaran.</p>

              <form onSubmit={submitCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    value={buyerInfo.name}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Akses</label>
                  <input
                    required
                    type="email"
                    value={buyerInfo.email}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="nama@email.com"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Produk akan dikirim ke email ini.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">No. WhatsApp</label>
                  <input
                    required
                    type="tel"
                    value={buyerInfo.phone}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="0812xxxxxx"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold rounded-xl disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
