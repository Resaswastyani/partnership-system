'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatRupiah } from '@/lib/utils'

const BANK_LIST = [
  'BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB Niaga', 'Danamon', 'Permata Bank',
  'Bank Syariah Indonesia', 'OVO', 'GoPay', 'DANA', 'ShopeePay'
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  processed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  rejected: 'text-red-400 bg-red-400/10 border-red-400/20'
}

const STATUS_LABELS: Record<string, string> = {
  pending: '⏳ Menunggu',
  processed: '✅ Diproses',
  rejected: '❌ Ditolak'
}

export default function PayoutPage() {
  const [user, setUser] = useState<any>(null)
  const [balance, setBalance] = useState(0)
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    amount: ''
  })

  useEffect(() => {
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setUser(parsed)

      // Fetch balance and payouts
      Promise.all([
        fetch(`/api/dashboard/stats?userId=${parsed.id}`).then(r => r.json()),
        fetch(`/api/payout/list?affiliateId=${parsed.id}`).then(r => r.json())
      ]).then(([stats, payoutData]) => {
        if (stats.success) setBalance(stats.stats.balance || 0)
        if (payoutData.success) setPayouts(payoutData.payouts)
        setLoading(false)
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const amount = parseInt(form.amount)
    if (!form.bankName || !form.accountNumber || !form.accountName || !amount) {
      setError('Semua field harus diisi')
      return
    }
    if (amount < 50000) {
      setError('Minimum penarikan Rp 50.000')
      return
    }
    if (amount > balance) {
      setError(`Saldo tidak mencukupi (Saldo: Rp ${balance.toLocaleString()})`)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/payout/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          affiliateId: user.id,
          amount,
          bankName: form.bankName,
          accountNumber: form.accountNumber,
          accountName: form.accountName
        })
      })
      const data = await res.json()

      if (data.success) {
        setSuccess(data.message)
        setBalance(prev => prev - amount)
        setPayouts(prev => [data.payout, ...prev])
        setForm({ bankName: '', accountNumber: '', accountName: '', amount: '' })
      } else {
        setError(data.error)
      }
    } catch {
      setError('Gagal terhubung ke server')
    } finally {
      setSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

      {/* Header */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden glow-effect">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">💸 Penarikan Komisi</h1>
            <p className="text-gray-400">Cairkan komisi Anda ke rekening bank atau e-wallet pilihan</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-right">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Saldo Tersedia</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Rp {balance.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Request Form */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-sm">₿</span>
            Ajukan Penarikan
          </h2>

          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                ✅ {success}
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                ❌ {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bank */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Bank / E-Wallet</label>
              <select
                value={form.bankName}
                onChange={e => setForm(p => ({ ...p, bankName: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary transition-all text-sm"
              >
                <option value="" className="bg-[#0d1117]">Pilih bank / e-wallet</option>
                {BANK_LIST.map(b => (
                  <option key={b} value={b} className="bg-[#0d1117]">{b}</option>
                ))}
              </select>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nomor Rekening / Akun</label>
              <input
                type="text"
                value={form.accountNumber}
                onChange={e => setForm(p => ({ ...p, accountNumber: e.target.value }))}
                placeholder="08xx / 1234567890"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all text-sm"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nama Pemilik Rekening</label>
              <input
                type="text"
                value={form.accountName}
                onChange={e => setForm(p => ({ ...p, accountName: e.target.value }))}
                placeholder="Sesuai nama di rekening"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all text-sm"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Jumlah Penarikan
                <span className="ml-2 normal-case text-emerald-400">(Saldo: Rp {balance.toLocaleString()})</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">Rp</span>
                <input
                  type="number"
                  value={form.amount}
                  onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                  placeholder="Minimum 50.000"
                  min={50000}
                  max={balance}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all text-sm"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[50000, 100000, 500000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, amount: String(Math.min(amt, balance)) }))}
                    className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-primary/50 transition-all"
                  >
                    {formatRupiah(amt)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setForm(p => ({ ...p, amount: String(balance) }))}
                  className="px-3 py-1 text-xs bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all"
                >
                  Semua
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || balance === 0}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2"
            >
              {submitting ? '⏳ Memproses...' : '💸 Ajukan Penarikan'}
            </button>

            <p className="text-gray-500 text-xs text-center">Penarikan diproses dalam 1–3 hari kerja</p>
          </form>
        </motion.div>

        {/* Payout History */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm">📋</span>
            Riwayat Penarikan
          </h2>

          {payouts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">💰</div>
              <p className="font-medium">Belum ada riwayat penarikan</p>
              <p className="text-sm mt-1">Ajukan penarikan pertama Anda!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payouts.map((payout: any, idx: number) => (
                <motion.div
                  key={payout.id || idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold text-sm">{payout.bank_name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${STATUS_COLORS[payout.status] || 'text-gray-400 bg-white/5 border-white/10'}`}>
                        {STATUS_LABELS[payout.status] || payout.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">{payout.account_number} • {payout.account_name}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(payout.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-emerald-400 font-bold text-lg">
                    Rp {parseInt(payout.amount).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>

      {/* Info Box */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5">
        <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
          <span>⚠️</span> Informasi Penarikan
        </h3>
        <ul className="text-gray-400 text-sm space-y-1.5">
          <li>• Minimum penarikan: <span className="text-white font-semibold">Rp 50.000</span></li>
          <li>• Penarikan diproses admin dalam <span className="text-white font-semibold">1–3 hari kerja</span></li>
          <li>• Pastikan nomor rekening dan nama sesuai untuk menghindari kegagalan transfer</li>
          <li>• Komisi dari transaksi Midtrans akan otomatis masuk ke saldo Anda</li>
        </ul>
      </motion.div>

    </motion.div>
  )
}
