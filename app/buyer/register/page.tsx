'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BuyerRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, referralCode: '' }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Pendaftaran gagal')
        setLoading(false)
        return
      }

      // Auto-login
      localStorage.setItem('buyer_user', JSON.stringify(data.user))
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      router.push('/buyer/dashboard')
    } catch {
      setError('Gagal terhubung ke server')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-accent/15 rounded-full blur-[150px]"
        />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-primary/10 rounded-full blur-[150px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-black text-xl shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              F
            </div>
            <div className="text-left">
              <p className="font-black text-white text-xl leading-tight">FBL</p>
              <p className="text-accent text-xs font-semibold tracking-wide">DAFTAR SEKARANG</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Buat Akun Member</h1>
          <p className="text-gray-400 text-sm mt-1">Akses semua produk FBL setelah daftar</p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Nama Lengkap</label>
              <input
                type="text" required autoComplete="name"
                value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Nama lengkap Anda"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Email</label>
              <input
                type="email" required autoComplete="email"
                value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="email@contoh.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">No. WhatsApp</label>
              <input
                type="tel" required autoComplete="tel"
                value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Password</label>
              <input
                type="password" required autoComplete="new-password"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Min. 6 karakter"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-accent to-primary hover:opacity-90 text-black font-black rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] disabled:opacity-60 mt-2"
            >
              {loading ? '⏳ Mendaftar...' : '🚀 Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-500 text-sm">
              Sudah punya akun?{' '}
              <Link href="/buyer/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Masuk
              </Link>
            </p>
            <div className="border-t border-white/10 pt-3">
              <p className="text-gray-600 text-xs">
                Ingin jadi afiliasi?{' '}
                <Link href="/register" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                  Daftar sebagai Partner →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          <Link href="/products" className="hover:text-gray-400 transition-colors">← Kembali ke Halaman Produk</Link>
        </p>
      </motion.div>
    </div>
  )
}
