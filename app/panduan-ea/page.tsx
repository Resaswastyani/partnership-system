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
    <div className="max-w-4xl mx-auto space-y-12 pt-40 pb-20 px-4" id="baca-online">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">PANDUAN EA<br /><span className="text-primary">FBL</span></h1>
        <div className="inline-block bg-white/[0.05] border border-white/10 px-6 py-3 rounded-full mt-2 mb-8">
          <p className="text-white font-mono font-bold text-lg">"EA_FBL_1 XAUUSD M1/M5 – Cent Exness"</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-2">
          <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Panduan
          </a>
          <a href="#baca-online" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2">
            Baca Online
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
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

      {/* 2. Persiapan Sebelum Instalasi */}
      <div className="space-y-6 pt-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">2. Persiapan Sebelum Instalasi</h2>
          <p className="text-gray-400">Langkah pra-instalasi untuk memastikan kelancaran trading.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">1</div>
            <h3 className="text-xl font-bold text-white mb-3">Download MT5</h3>
            <p className="text-gray-400 mb-6 line-clamp-3">
              Unduh platform trading MetaTrader 5 resmi dari Exness untuk PC Anda.
            </p>
            <a
              href="/exnessetup.exe"
              download
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-xl font-black transition-all"
            >
              Unduh MT5
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">2</div>
            <h3 className="text-xl font-bold text-white mb-3">Buka Akun Exness</h3>
            <p className="text-gray-400 mb-6">
              Daftar dan buat akun Cent di Exness untuk persyaratan minimum margin yang aman.
            </p>
            <a
              href="https://one.exnessonelink.com/a/p0xhj9ay9j"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#ffc800] to-[#ffb400] hover:opacity-90 text-black rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,200,0,0.2)]"
            >
              Daftar Exness
            </a>
          </motion.div>
        </div>

        {/* Requirements Table */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 mt-8">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-4 text-gray-400 font-medium">Platform</td>
                <td className="py-4 text-white font-bold">MetaTrader 5 Desktop (terbaru)</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-400 font-medium">Broker</td>
                <td className="py-4 text-white font-bold">Akun Cent Exness (disetujui FBL)</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-400 font-medium">Instrumen</td>
                <td className="py-4 text-white font-bold text-primary">XAUUSD / XAUUSDc</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-400 font-medium">Timeframe</td>
                <td className="py-4 text-white font-bold">M1 atau M5</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-400 font-medium">Modal</td>
                <td className="py-4 text-white font-bold text-emerald-400">Min 50.000 USC</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-400 font-medium">Koneksi</td>
                <td className="py-4 text-white font-bold">Internet stabil / VPS aktif</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 text-sm">
            <strong>⚠️ Penting untuk akun Cent:</strong> 50.000 USC setara dengan USD 500. Pastikan Anda tidak salah membaca angka balance akun Cent sebagai saldo dalam USD penuh.
          </div>
        </div>
      </div>

      {/* 3. Cara Memasang EA */}
      <div className="space-y-6 pt-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">3. Cara Memasang EA ke MT5</h2>
          <p className="text-gray-400">Ikuti langkah-langkah berikut untuk mengaktifkan EA di MetaTrader 5 Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Buka Data Folder', desc: 'MT5 > File > Open Data Folder' },
            { step: '2', title: 'Masuk MQL5', desc: 'Buka folder MQL5 > Experts' },
            { step: '3', title: 'Salin File', desc: 'Paste file .ex5 ke folder Experts' },
            { step: '4', title: 'Refresh', desc: 'Klik kanan di Navigator > Refresh' },
            { step: '5', title: 'Buka Chart', desc: 'Chart XAUUSD timeframe M1/M5' },
            { step: '6', title: 'Pasang EA', desc: 'Drag EA dari Navigator ke Chart' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-white mb-4">
                {item.step}
              </div>
              <h4 className="font-bold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disiplin Penggunaan */}
      <div className="space-y-6 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Disiplin Penggunaan</h2>
          <p className="text-gray-400">Hal yang Boleh dan Tidak Boleh Dilakukan selama Trial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YANG BOLEH */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="text-emerald-400 font-black text-xl mb-6 flex items-center gap-2 relative z-10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              YANG BOLEH DILAKUKAN
            </h3>
            <ul className="space-y-4 relative z-10">
              {[
                'Menggunakan preset yang diberikan FBL.',
                'Melakukan backtest dan forward test pada akun khusus.',
                'Mengirim report lengkap untuk evaluasi.',
                'Mengikuti prosedur keamanan Jumat–Senin.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* YANG TIDAK BOLEH */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-red-500/20 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="text-red-400 font-black text-xl mb-6 flex items-center gap-2 relative z-10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              YANG TIDAK BOLEH DILAKUKAN
            </h3>
            <ul className="space-y-4 relative z-10">
              {[
                'Mengubah parameter tanpa persetujuan FBL.',
                'Menggabungkan EA dengan manual trade di akun yang sama.',
                'Menilai hasil hanya dari profit tanpa melihat drawdown.',
                'Membagikan License Code atau file EA kepada pihak lain.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* VPS Contabo */}
      <div className="pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Butuh VPS yang Handal?</h3>
            <p className="text-gray-400 max-w-lg">
              EA wajib menyala 24/5 tanpa henti. Kami merekomendasikan penggunaan VPS dari Contabo untuk stabilitas maksimal.
            </p>
          </div>
          <a
            href="https://contabo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all whitespace-nowrap text-center shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Sewa VPS Contabo
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
