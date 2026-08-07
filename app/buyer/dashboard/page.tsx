'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface PurchasedProduct {
  orderId: string
  orderDbId: number
  status: string
  amount: number
  purchasedAt: string
  product: {
    id: string
    name: string
    type: string
    description: string
    image: string
    category: string
    features: string[]
  }
}

export default function BuyerDashboard() {
  const router = useRouter()
  const [buyer, setBuyer] = useState<any>(null)
  const [purchases, setPurchases] = useState<PurchasedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('buyer_user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setBuyer(parsed)
      fetchPurchases(parsed.id)
    } else {
      router.push('/buyer/login')
    }
  }, [router])

  const fetchPurchases = async (userId: string) => {
    try {
      const res = await fetch(`/api/buyer/products?userId=${userId}`)
      const data = await res.json()
      if (data.success) {
        setPurchases(data.products)
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  // Map product category/id to the correct guide page
  const handleAccess = (purchase: PurchasedProduct) => {
    const cat = purchase.product.category?.toLowerCase() ?? ''
    const pid = purchase.product.id?.toLowerCase() ?? ''

    if (cat.includes('ea') || pid.includes('ea') || pid === 'prod-002') {
      router.push(`/panduan-ea?order=${purchase.orderId}`)
    } else {
      // All non-EA products → download page
      router.push(`/download?order=${purchase.orderId}`)
    }
  }

  const getAccessLabel = (product: PurchasedProduct['product']) => {
    const cat = product.category?.toLowerCase() ?? ''
    const pid = product.id?.toLowerCase() ?? ''

    if (cat.includes('ea') || pid.includes('ea') || pid === 'prod-002') return '🤖 Lihat Panduan EA'
    if (cat.includes('jurnal')) return '📒 Unduh Jurnal Trading'
    if (cat.includes('webinar')) return '🎥 Unduh Materi Webinar'
    if (cat.includes('materi')) return '📚 Unduh Materi'
    return '⬇️ Download Produk'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400 font-medium">Memuat data produk...</div>
      </div>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="glass-card rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Halo, <span className="text-gradient">{buyer?.name?.split(' ')[0]}!</span>
          </h1>
          <p className="text-gray-400">Selamat datang di member area. Berikut adalah produk yang sudah Anda beli.</p>
        </div>
      </motion.div>

      {/* Purchased Products */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-primary">📦</span> Koleksi Produk Saya
        </h2>
        
        {purchases.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border-dashed border-white/20">
            <p className="text-6xl mb-4">🛒</p>
            <h3 className="text-xl font-bold text-white mb-2">Belum Ada Produk</h3>
            <p className="text-gray-400 mb-6">Anda belum memiliki produk FBL. Yuk, jelajahi katalog kami!</p>
            <button onClick={() => router.push('/products')} className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Lihat Katalog Produk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((purchase) => (
              <motion.div
                key={purchase.orderId}
                variants={itemVariants}
                className="glass-card rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  {purchase.product.image ? (
                    <img 
                      src={purchase.product.image} 
                      alt={purchase.product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                      <span className="text-4xl text-gray-500">📦</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-gray-300 border border-white/10 font-semibold shadow-xl">
                      {purchase.product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 relative z-10">
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                    {purchase.product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                    {purchase.product.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400 p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-primary">📅</span>
                      Tgl Beli: {new Date(purchase.purchasedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>

                    <button
                      onClick={() => handleAccess(purchase)}
                      className="w-full px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all font-bold text-sm rounded-xl flex items-center justify-center gap-2"
                    >
                      {getAccessLabel(purchase.product)}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
