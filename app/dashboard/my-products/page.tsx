'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MyProductsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userStr = localStorage.getItem('auth_user')
        if (!userStr) {
          window.location.href = '/login'
          return
        }
        
        const user = JSON.parse(userStr)
        const res = await fetch(`/api/my-products?userId=${user.id}`)
        const data = await res.json()
        
        if (data.success) {
          setOrders(data.orders)
        } else {
          setError(data.error || 'Gagal memuat produk')
        }
      } catch (err) {
        setError('Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Produk Saya</h1>
          <p className="text-gray-400 mt-1">Akses produk yang telah Anda beli.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-white mb-2">Belum Ada Produk</h2>
          <p className="text-gray-400 mb-6">Anda belum melakukan pembelian produk apa pun.</p>
          <Link 
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-bold transition-all"
          >
            Lihat Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.order_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 flex flex-col"
            >
              <div 
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${order.product_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'})` }}
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white leading-tight">{order.product_name}</h3>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                  {order.product_description}
                </p>

                {order.product_id === 'prod-002' ? (
                  <Link
                    href={`/dashboard/ea-guide?order=${order.order_id}`}
                    className="w-full block text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
                  >
                    Lihat Panduan & Lisensi
                  </Link>
                ) : (
                  <button
                    onClick={() => alert('Fitur download akan segera tersedia!')}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Akses
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
