'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/mock-data'
import { StatusBadge } from '@/components/admin/StatusBadge'

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
  const [products, setProducts] = useState<Product[]>(
    PRODUCTS.map(p => ({ ...p, active: true }))
  )
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

  const saveChanges = () => {
    if (!editModal.product) return

    setProducts(products.map(p =>
      p.id === editModal.product?.id
        ? { ...p, price: formData.price, commissionRate: formData.commissionRate }
        : p
    ))

    setEditModal({ visible: false, product: null })
  }

  const toggleActive = (productId: string) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, active: !p.active } : p
    ))
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Produk</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{stats.total}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Aktif</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{stats.active}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Revenue (Estimate)</p>
          <p className="text-lg font-bold text-yellow-400 mt-1">Rp {(stats.totalRevenue / 1_000_000).toFixed(0)}M</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Rata-rata Komisi</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{stats.avgCommission}%</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-[#1a2847] rounded-lg overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.type === 'download' ? 'File Download' : 'Web Credentials'}
                  </p>
                </div>
                <StatusBadge status={product.active ? 'active' : 'suspended'} />
              </div>

              <div className="space-y-2 mb-4 p-3 bg-white/5 rounded">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Harga:</span>
                  <span className="font-bold text-cyan-400">Rp {product.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Komisi:</span>
                  <span className="font-bold text-yellow-400">{product.commissionRate}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="w-full px-4 py-2 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors font-medium text-sm"
                >
                  Edit Harga & Komisi
                </button>
                <button
                  onClick={() => toggleActive(product.id)}
                  className={`w-full px-4 py-2 rounded font-medium text-sm transition-colors ${
                    product.active
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                  }`}
                >
                  {product.active ? 'Deaktifkan' : 'Aktifkan'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal.visible && editModal.product && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2847] rounded-lg p-6 max-w-md w-full border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-foreground">Edit {editModal.product.name}</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground">Harga (Rp)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full mt-2 px-4 py-2 bg-white/5 border border-white/10 rounded text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Komisi (%)</label>
                <input
                  type="number"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full mt-2 px-4 py-2 bg-white/5 border border-white/10 rounded text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditModal({ visible: false, product: null })}
                className="flex-1 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-foreground"
              >
                Batal
              </button>
              <button
                onClick={saveChanges}
                className="flex-1 px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-medium"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
