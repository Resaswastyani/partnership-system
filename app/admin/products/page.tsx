'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatRupiah } from '@/lib/utils'

interface Product {
  id: string
  name: string
  type: 'download' | 'credentials'
  price: number
  commissionRate: number
  description: string
  features: string[]
  image: string
  category: string
  active: boolean
}

const CATEGORIES = [
  { label: 'Semua', value: 'all', icon: '🗂️' },
  { label: 'EA Robot', value: 'EA Robot', icon: '🤖' },
  { label: 'Jurnal Trading', value: 'Jurnal Trading', icon: '📓' },
  { label: 'Materi Trading', value: 'Materi Trading', icon: '📚' },
  { label: 'Webinar', value: 'Webinar', icon: '🎥' },
  { label: 'Tools', value: 'Tools', icon: '🔧' },
  { label: 'Lainnya', value: 'Lainnya', icon: '📦' },
]

const EMPTY_FORM = {
  id: '',
  name: '',
  type: 'download' as 'download' | 'credentials',
  price: 0,
  commissionRate: 20,
  description: '',
  features: [''],
  image: '',
  category: 'EA Robot',
  active: true,
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [modal, setModal] = useState<{ type: 'create' | 'edit' | 'delete' | null; product?: Product }>({ type: null })
  const [formData, setFormData] = useState({ ...EMPTY_FORM })
  const [featuresInput, setFeaturesInput] = useState<string[]>([''])
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchProducts = () => {
    setLoading(true)
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(data => {
        if (data.success) setProducts(data.products)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const filtered = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab)

  const stats = {
    total: products.length,
    active: products.filter(p => p.active).length,
    totalRevenue: products.reduce((s, p) => s + p.price * 10, 0),
    categories: new Set(products.map(p => p.category)).size,
  }

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM })
    setFeaturesInput([''])
    setModal({ type: 'create' })
  }

  const openEdit = (p: Product) => {
    setFormData({
      id: p.id, name: p.name, type: p.type, price: p.price,
      commissionRate: p.commissionRate, description: p.description,
      image: p.image, category: p.category, active: p.active,
      features: p.features,
    })
    setFeaturesInput(p.features.length > 0 ? p.features : [''])
    setModal({ type: 'edit', product: p })
  }

  const closeModal = () => setModal({ type: null })

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      showToast('Nama dan harga harus diisi', 'error'); return
    }
    setSaving(true)
    const cleanFeatures = featuresInput.filter(f => f.trim() !== '')
    const payload = { ...formData, features: cleanFeatures }

    try {
      const method = modal.type === 'create' ? 'POST' : 'PUT'
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        showToast(modal.type === 'create' ? 'Produk berhasil ditambahkan!' : 'Produk berhasil diperbarui!')
        fetchProducts()
        closeModal()
      } else {
        showToast(data.error || 'Gagal menyimpan', 'error')
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error')
    }
    setSaving(false)
  }

  const handleDelete = async (p: Product) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/products?id=${p.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast(data.softDeleted ? 'Produk dinonaktifkan (ada transaksi terkait)' : 'Produk berhasil dihapus!')
        fetchProducts()
        closeModal()
      } else {
        showToast(data.error || 'Gagal menghapus', 'error')
      }
    } catch {
      showToast('Gagal terhubung ke server', 'error')
    }
    setSaving(false)
  }

  const handleToggleActive = async (p: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, active: !p.active }),
      })
      const data = await res.json()
      if (data.success) {
        setProducts(prev => prev.map(x => x.id === p.id ? { ...x, active: !x.active } : x))
        showToast(p.active ? 'Produk dinonaktifkan' : 'Produk diaktifkan')
      }
    } catch {
      showToast('Gagal mengubah status', 'error')
    }
  }

  const addFeature = () => setFeaturesInput(prev => [...prev, ''])
  const removeFeature = (i: number) => setFeaturesInput(prev => prev.filter((_, idx) => idx !== i))
  const updateFeature = (i: number, val: string) => setFeaturesInput(prev => prev.map((f, idx) => idx === i ? val : f))

  const catInfo = CATEGORIES.find(c => c.value === (products.find(p => p.id === modal.product?.id)?.category || formData.category))

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className={`fixed top-6 right-6 z-[999] px-6 py-3 rounded-2xl font-semibold text-sm shadow-2xl border backdrop-blur-xl flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}
          >
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Produk</h1>
          <p className="text-gray-400 mt-1">Tambah, edit, dan kelola semua produk dengan kategori</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 hover:border-primary/60 text-primary rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]"
        >
          <span className="text-lg">➕</span> Tambah Produk
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Produk', value: stats.total, color: 'text-primary', icon: '📦', glow: 'rgba(251,191,36,0.05)' },
          { label: 'Aktif', value: stats.active, color: 'text-emerald-400', icon: '✅', glow: 'rgba(16,185,129,0.05)' },
          { label: 'Est. Revenue', value: formatRupiah(stats.totalRevenue), color: 'text-amber-400', icon: '💰', glow: 'rgba(245,158,11,0.05)' },
          { label: 'Kategori', value: stats.categories, color: 'text-sky-400', icon: '🗂️', glow: 'rgba(14,165,233,0.05)' },
        ].map((card, idx) => (
          <motion.div key={idx} variants={itemVariants}
            className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all relative overflow-hidden group"
            style={{ boxShadow: `inset 0 0 30px ${card.glow}` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveTab(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              activeTab === cat.value
                ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-md ${
              activeTab === cat.value ? 'bg-primary/20 text-primary' : 'bg-white/10 text-gray-500'
            }`}>
              {cat.value === 'all' ? products.length : products.filter(p => p.category === cat.value).length}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Memuat produk...</div>
      ) : filtered.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-20 glass-card rounded-2xl">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-400 text-lg font-medium">Belum ada produk di kategori ini</p>
          <p className="text-gray-600 text-sm mt-2 mb-6">Klik tombol "Tambah Produk" untuk memulai</p>
          <button onClick={openCreate} className="px-6 py-3 bg-primary/20 text-primary border border-primary/30 rounded-xl font-bold hover:bg-primary/30 transition-all">
            ➕ Tambah Produk Pertama
          </button>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(product => {
            const catObj = CATEGORIES.find(c => c.value === product.category) || CATEGORIES[CATEGORIES.length - 1]
            return (
              <motion.div key={product.id} variants={itemVariants}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 group relative flex flex-col ${
                  product.active ? 'hover:border-primary/30' : 'opacity-60 hover:border-red-500/20'
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 flex-shrink-0">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center">
                      <span className="text-5xl">{catObj.icon}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-bold backdrop-blur-sm ${
                      product.active
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border-red-500/30'
                    }`}>
                      {product.active ? '● Aktif' : '● Nonaktif'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-gray-300 border border-white/10 font-medium">
                      {catObj.icon} {catObj.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 border border-white/10">
                      {product.type === 'download' ? '📥 Download' : '🔑 Credentials'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-base text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description}</p>

                  {/* Price & Commission */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Harga</p>
                      <p className="font-bold text-primary text-sm">{formatRupiah(product.price)}</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Komisi</p>
                      <p className="font-bold text-amber-400 text-sm">{product.commissionRate}%</p>
                    </div>
                  </div>

                  {/* Features preview */}
                  {product.features.length > 0 && (
                    <div className="mb-4 space-y-1">
                      {product.features.slice(0, 2).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="text-primary">✓</span> {f}
                        </div>
                      ))}
                      {product.features.length > 2 && (
                        <p className="text-xs text-gray-600">+{product.features.length - 2} fitur lainnya</p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 px-3 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 hover:border-primary/40 transition-all font-bold text-xs"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(product)}
                      className={`px-3 py-2.5 rounded-xl font-bold text-xs transition-all border ${
                        product.active
                          ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                      }`}
                      title={product.active ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      {product.active ? '🚫' : '✅'}
                    </button>
                    <button
                      onClick={() => setModal({ type: 'delete', product })}
                      className="px-3 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all font-bold text-xs"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {(modal.type === 'create' || modal.type === 'edit') && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0f0a1e]/90 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-primary">{modal.type === 'create' ? '➕' : '✏️'}</span>
                  {modal.type === 'create' ? 'Tambah Produk Baru' : `Edit ${modal.product?.name}`}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors text-2xl leading-none">×</button>
              </div>

              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Nama Produk *</label>
                  <input type="text" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: EA Robot FBL Pro v2"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Category & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Kategori</label>
                    <select value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    >
                      {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                        <option key={c.value} value={c.value} className="bg-[#1a0f3c]">{c.icon} {c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Tipe Produk</label>
                    <select value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as 'download' | 'credentials' })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    >
                      <option value="download" className="bg-[#1a0f3c]">📥 File Download</option>
                      <option value="credentials" className="bg-[#1a0f3c]">🔑 Web Credentials</option>
                    </select>
                  </div>
                </div>

                {/* Price & Commission */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Harga (Rp) *</label>
                    <input type="number" value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                    {formData.price > 0 && <p className="text-xs text-gray-500 mt-1">{formatRupiah(formData.price)}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Komisi (%)</label>
                    <input type="number" value={formData.commissionRate} min="0" max="100" step="1"
                      onChange={e => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                    {formData.price > 0 && formData.commissionRate > 0 && (
                      <p className="text-xs text-emerald-400 mt-1">
                        = {formatRupiah(Math.floor(formData.price * formData.commissionRate / 100))} per penjualan
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Deskripsi</label>
                  <textarea value={formData.description} rows={3}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Deskripsi singkat produk..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">URL Gambar</label>
                  <input type="url" value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="preview" className="mt-2 h-20 w-full object-cover rounded-lg border border-white/10" />
                  )}
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Fitur Produk</label>
                    <button onClick={addFeature} className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-1">
                      ➕ Tambah Fitur
                    </button>
                  </div>
                  <div className="space-y-2">
                    {featuresInput.map((f, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <span className="text-primary text-sm">✓</span>
                        <input type="text" value={f}
                          onChange={e => updateFeature(i, e.target.value)}
                          placeholder={`Fitur ${i + 1}...`}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                        />
                        {featuresInput.length > 1 && (
                          <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300 text-lg leading-none">×</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="text-white text-sm font-semibold">Status Produk</p>
                    <p className="text-gray-500 text-xs mt-0.5">Produk nonaktif tidak akan tampil di halaman pembelian</p>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${formData.active ? 'bg-emerald-500' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${formData.active ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {/* ID (edit mode only) */}
                {modal.type === 'edit' && (
                  <p className="text-xs text-gray-600">Product ID: <span className="font-mono text-gray-500">{formData.id}</span></p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#0f0a1e]/90 backdrop-blur-xl border-t border-white/10 p-6 flex gap-3">
                <button onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium transition-all text-sm"
                >
                  Batal
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/80 to-amber-500/80 hover:from-primary hover:to-amber-500 border border-primary/30 text-black font-bold transition-all text-sm shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-50"
                >
                  {saving ? '⏳ Menyimpan...' : modal.type === 'create' ? '✅ Tambah Produk' : '💾 Simpan Perubahan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {modal.type === 'delete' && modal.product && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-2xl p-8 max-w-sm w-full text-center border-red-500/20"
            >
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-white mb-2">Hapus Produk?</h3>
              <p className="text-gray-400 text-sm mb-2">
                Anda akan menghapus produk:
              </p>
              <p className="text-white font-semibold mb-1">"{modal.product.name}"</p>
              <p className="text-gray-500 text-xs mb-6">
                Jika ada transaksi terkait, produk hanya akan dinonaktifkan.
              </p>
              <div className="flex gap-3">
                <button onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all font-medium"
                >
                  Batal
                </button>
                <button onClick={() => handleDelete(modal.product!)} disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all font-bold disabled:opacity-50"
                >
                  {saving ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
