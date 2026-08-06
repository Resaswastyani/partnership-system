'use client'

import { useState, useEffect } from 'react'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  type: string
  price: number
  commissionRate: number
  description: string
  features: string[]
  image: string
  active?: boolean
}

interface EditModal {
  visible: boolean
  product: Product | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])
  const [editModal, setEditModal] = useState<EditModal>({ visible: false, product: null })
  const [formData, setFormData] = useState({
    price: 0,
    commissionRate: 0
  })

  const stats = {
    total: products.length,
    active: products.filter(p => p.active).length,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * 10), 0),
    avgCommission: (products.reduce((sum, p) => sum + p.commissionRate, 0) / products.length).toFixed(1)
  }

  const openEditModal = (product: Product) => {
    setEditModal({ visible: true, product })
    setFormData({
      price: product.price,
      commissionRate: product.commissionRate
    })
  }

  const saveChanges = async () => {
    if (!editModal.product) return

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editModal.product.id,
          price: formData.price,
          commissionRate: formData.commissionRate
        })
      })
      const data = await res.json()
      if (data.success) {
        setProducts(products.map(p =>
          p.id === editModal.product?.id
            ? { ...p, price: formData.price, commissionRate: formData.commissionRate }
            : p
        ))
      } else {
        alert('Gagal menyimpan: ' + data.error)
      }
    } catch (error) {
      alert('Gagal menyimpan perubahan')
    }

    setEditModal({ visible: false, product: null })
  }

  const toggleActive = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, active: !p.active } : p
    ))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const statCards = [
    { label: 'Total Produk', value: stats.total, color: 'text-primary', icon: '📦' },
    { label: 'Aktif', value: stats.active, color: 'text-emerald-400', icon: '✅' },
    { label: 'Estimasi Revenue', value: `Rp ${(stats.totalRevenue / 1_000_000).toFixed(0)}M`, color: 'text-amber-400', icon: '💰' },
    { label: 'Rata-rata Komisi', value: `${stats.avgCommission}%`, color: 'text-sky-400', icon: '📊' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Produk</h1>
        <p className="text-gray-400">Update harga, komisi, dan status produk</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Products Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className="glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group relative"
          >
            <div className="relative overflow-hidden h-52">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <StatusBadge status={product.active ? 'active' : 'suspended'} />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 border border-white/10 font-medium">
                  {product.type === 'download' ? '📥 File Download' : '🔑 Web Credentials'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg text-white mb-4 group-hover:text-primary transition-colors">{product.name}</h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Harga</p>
                  <p className="font-bold text-primary text-lg">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Komisi</p>
                  <p className="font-bold text-amber-400 text-lg">{product.commissionRate}%</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all font-bold text-sm shadow-[0_0_15px_rgba(251,191,36,0.05)] hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                >
                  ✏️ Edit Harga & Komisi
                </button>
                <button
                  onClick={() => toggleActive(product.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                    product.active
                      ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  }`}
                >
                  {product.active ? '🚫' : '✅'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Edit Modal */}
      {editModal.visible && editModal.product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="text-primary">✏️</span> Edit {editModal.product.name}
            </h3>

            <div className="space-y-5 mb-8">
              <div>
                <label className="text-sm text-gray-400 font-semibold uppercase tracking-wider block mb-2">Harga (Rp)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 font-semibold uppercase tracking-wider block mb-2">Komisi (%)</label>
                <input
                  type="number"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditModal({ visible: false, product: null })}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-300 hover:text-white font-medium"
              >
                Batal
              </button>
              <button
                onClick={saveChanges}
                className="flex-1 px-4 py-3 rounded-xl bg-primary/80 hover:bg-primary border border-primary/30 transition-all text-background font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
