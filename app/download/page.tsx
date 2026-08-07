'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

function DownloadContent() {
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
          setOrderInfo(data.order)
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
          <p className="mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition-all">
              Kembali ke Produk
            </Link>
            <Link href="/buyer/dashboard" className="px-5 py-2.5 bg-primary/20 border border-primary/30 text-primary rounded-xl text-sm font-semibold transition-all">
              👤 Dashboard Saya
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pt-40 pb-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Unduh Produk Anda</h1>
        <p className="text-gray-400 mt-4 text-lg">Terima kasih atas pembelian Anda. Silakan unduh produk Anda di bawah ini.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
      >
        <div 
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${orderInfo?.product_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'})` }}
        />
        <div className="p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{orderInfo?.product_name}</h2>
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider">
              {orderInfo?.product_type || 'Download'}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {orderInfo?.product_description}
          </p>

          <div className="bg-black/40 border border-white/5 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">ID Pesanan:</p>
              <p className="text-white font-mono">{orderInfo?.order_id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tanggal Akses:</p>
              <p className="text-white">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <button
            onClick={() => {
              // TODO: Replace with actual download URL from product
              if (orderInfo?.download_url) {
                window.open(orderInfo.download_url, '_blank')
              } else {
                window.open(`/api/order/download?orderId=${orderId}`, '_blank')
              }
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-black text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Sekarang
          </button>
        </div>
      </motion.div>

      {/* Dashboard Access Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-emerald-900/40 to-teal-900/30 border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎉</span>
            <p className="text-emerald-400 font-bold text-lg">Pembelian Berhasil!</p>
          </div>
          <p className="text-gray-300 text-sm">Produk ini sudah tersimpan di akun Anda. Akses kapan saja dari Dashboard Member Anda.</p>
        </div>
        <Link
          href="/buyer/dashboard"
          className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] text-sm"
        >
          <span>👤</span> Lihat Dashboard Saya →
        </Link>
      </motion.div>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <main className="w-full min-h-screen bg-[#05070a] text-white selection:bg-primary/30 selection:text-white">
      <Header />
      <Suspense fallback={<div className="text-center py-40 text-gray-400">Loading order...</div>}>
        <DownloadContent />
      </Suspense>
      <Footer />
    </main>
  )
}
