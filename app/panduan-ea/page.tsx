'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

function EAGuideContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  
  const [orderInfo, setOrderInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order?orderId=${orderId}`)
        const data = await res.json()
        
        if (data.success) {
          if (data.order.product_id === 'prod-002') {
            setOrderInfo(data.order)
          } else {
            setError('Pesanan ini bukan untuk produk EA Robot.')
          }
        } else {
          setError(data.error || 'Pesanan tidak ditemukan atau belum selesai.')
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data')
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    } else {
      setError('ID Pesanan tidak valid')
      setLoading(false)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-2xl text-center max-w-md w-full">
          <h2 className="text-xl font-bold mb-2">Akses Ditolak</h2>
          <p className="mb-4">{error}</p>
          <Link href="/products" className="text-primary hover:underline">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-40 pb-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Panduan EA Robot FBL</h1>
        <p className="text-gray-400 mt-4 text-lg">Terima kasih atas pembelian Anda. Ikuti langkah-langkah di bawah ini untuk memulai.</p>
      </div>

      {/* License Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🔑</span> Lisensi Aktif Anda
            </h2>
            <div className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Active
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Kode Lisensi EA:</p>
              <div className="text-2xl md:text-3xl font-mono font-black text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                {orderInfo?.license_code || 'SEDANG DIPROSES...'}
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(orderInfo?.license_code || '')
                alert('Kode lisensi berhasil disalin!')
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all border border-white/10 whitespace-nowrap"
            >
              Copy Kode
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">📅</span>
              <span>Berlaku hingga: <strong className="text-white">{orderInfo?.license_expires_at ? new Date(orderInfo.license_expires_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</strong></span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20 self-center"></div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">ℹ️</span>
              <span>Komisi produk ini dibayar per bulan (subscription)</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Step 1: Daftar Broker */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-all group"
        >
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">1</div>
          <h3 className="text-xl font-bold text-white mb-3">Daftar Akun Exness</h3>
          <p className="text-gray-400 mb-6 line-clamp-3">
            Untuk menggunakan Robot EA FBL, Anda wajib mendaftar akun trading di broker Exness melalui tautan kemitraan kami.
          </p>
          <a 
            href="https://one.exnessonelink.com/a/p0xhj9ay9j"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#ffc800] to-[#ffb400] hover:opacity-90 text-black rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,200,0,0.2)]"
          >
            Daftar Exness Sekarang
          </a>
        </motion.div>

        {/* Step 2: Download MT5 & EA */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-all group"
        >
          <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">2</div>
          <h3 className="text-xl font-bold text-white mb-3">Download MT5 & Setup</h3>
          <p className="text-gray-400 mb-6">
            Unduh installer MetaTrader 5 khusus beserta file EA Robot FBL. Install di PC atau VPS Anda untuk mulai trading 24/7.
          </p>
          <a 
            href="/exnessetup.ex5"
            download
            className="w-full inline-flex items-center justify-center px-6 py-4 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-xl font-black transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download exnessetup.ex5
          </a>
        </motion.div>
      </div>

    </div>
  )
}

export default function EAGuidePage() {
  return (
    <main className="w-full min-h-screen bg-[#05070a] text-white selection:bg-primary/30 selection:text-white">
      <Header />
      <Suspense fallback={<div className="text-center py-40 text-gray-400">Loading guide...</div>}>
        <EAGuideContent />
      </Suspense>
      <Footer />
    </main>
  )
}
