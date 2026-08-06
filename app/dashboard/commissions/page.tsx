'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CommissionsPage() {
  const [data, setData] = useState<any>({
    stats: { totalEarnings: 0, pendingCommissions: 0, averageCommission: 0 },
    monthlyData: [],
    productCommissions: []
  })
  const [user, setUser] = useState<any>(null)
  const [thisMonthPaid, setThisMonthPaid] = useState(0)
  const [loading, setLoading] = useState(true)
  const [bankForm, setBankForm] = useState({ bankName: '', accountNumber: '', accountName: '' })
  const [savingBank, setSavingBank] = useState(false)
  const [bankSaved, setBankSaved] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setUser(parsed)

      // Pre-fill bank form from stored user data
      setBankForm({
        bankName: parsed.bankName || parsed.bank_name || '',
        accountNumber: parsed.accountNumber || parsed.account_number || '',
        accountName: parsed.accountName || parsed.account_name || parsed.name || ''
      })

      Promise.all([
        fetch(`/api/dashboard/commissions?userId=${parsed.id}`).then(r => r.json()),
        fetch(`/api/dashboard/stats?userId=${parsed.id}`).then(r => r.json()),
      ]).then(([commissionsData, statsData]) => {
        if (commissionsData.success) {
          setData(commissionsData)

          // Calculate this month's paid commissions from monthlyData
          const now = new Date()
          const currentMonthShort = now.toLocaleString('en-US', { month: 'short' })
          const currentEntry = commissionsData.monthlyData?.find(
            (m: any) => m.month === currentMonthShort
          )
          setThisMonthPaid(currentEntry?.amount || 0)
        }
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [])

  const handleSaveBank = async () => {
    if (!user) return
    setSavingBank(true)
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          bankName: bankForm.bankName,
          accountNumber: bankForm.accountNumber,
          accountName: bankForm.accountName
        })
      })
      const result = await res.json()
      if (result.success) {
        // Update localStorage
        const updatedUser = { ...user, ...bankForm }
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setBankSaved(true)
        setTimeout(() => setBankSaved(false), 3000)
      }
    } catch (err) {
      console.error('Failed to save bank info', err)
    } finally {
      setSavingBank(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  // Next payment date: 5th of next month
  const now = new Date()
  const nextPaymentDate = new Date(now.getFullYear(), now.getMonth() + 1, 5)
  const nextPaymentStr = nextPaymentDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })

  // Format bank display
  const bankDisplay = bankForm.bankName && bankForm.accountNumber
    ? `${bankForm.bankName} ****${bankForm.accountNumber.slice(-4)}`
    : 'Belum diatur'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-wide">Tracking Komisi</h1>
        <p className="text-gray-400">Monitor komisi Anda per bulan dan status pembayaran</p>
      </motion.div>

      {/* Main Stats */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Komisi Diterima"
            value={loading ? 'Loading...' : `Rp ${(data.stats.totalEarnings / 1_000_000).toFixed(1)}M`}
            subtitle="Semua waktu"
            icon="✅"
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Komisi Pending"
            value={loading ? 'Loading...' : `Rp ${(data.stats.pendingCommissions / 1_000_000).toFixed(1)}M`}
            subtitle="Menunggu verifikasi"
            icon="⏳"
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Average Commission"
            value={loading ? 'Loading...' : `Rp ${(data.stats.averageCommission / 1_000_000).toFixed(2)}M`}
            subtitle="Per referral"
            icon="📊"
            color="cyan"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Monthly Breakdown */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
            <span className="text-primary">📈</span> Komisi Bulanan
          </h3>
          
          <div className="space-y-4 relative z-10">
            {loading ? (
              <div className="text-gray-400 text-sm animate-pulse">Memuat data komisi...</div>
            ) : data.monthlyData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-3">📊</p>
                <p className="text-sm">Belum ada komisi bulan ini</p>
                <p className="text-xs mt-1">Komisi akan muncul setelah referral Anda melakukan pembelian</p>
              </div>
            ) : data.monthlyData.map((mData: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 text-right">
                  <p className="text-gray-400 text-sm font-semibold group-hover:text-white transition-colors">{mData.month}</p>
                </div>
                <div className="flex-1">
                  <div className="h-10 bg-white/5 rounded-xl overflow-hidden flex items-center border border-white/5 group-hover:border-white/10 transition-colors">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((mData.amount / 2_000_000) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full flex items-center px-4 text-white font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] ${
                        mData.status === 'Paid'
                          ? 'bg-gradient-to-r from-emerald-500/80 to-emerald-400'
                          : 'bg-gradient-to-r from-amber-500/80 to-amber-400'
                      }`}
                    >
                      Rp {(mData.amount / 1_000_000).toFixed(1)}M
                    </motion.div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    mData.status === 'Paid' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {mData.status === 'Paid' ? 'Berhasil' : 'Menunggu'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Payout Schedule */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
              <span className="text-accent">📅</span> Jadwal Pembayaran
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-semibold">Pembayaran Bulan Ini</p>
                  <p className="text-gray-400 text-sm mt-0.5">Komisi yang sudah verified</p>
                </div>
                <p className="text-emerald-400 font-bold text-xl">
                  {loading ? '...' : `Rp ${(thisMonthPaid / 1_000_000).toFixed(1)}M`}
                </p>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-semibold">Tanggal Transfer</p>
                  <p className="text-gray-400 text-sm mt-0.5">Setiap tanggal 5 bulan berikutnya</p>
                </div>
                <p className="text-accent font-bold">{nextPaymentStr}</p>
              </div>

              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-semibold">Metode Pembayaran</p>
                  <p className="text-gray-400 text-sm mt-0.5">Transfer ke rekening terdaftar</p>
                </div>
                <p className={`font-semibold bg-white/10 px-3 py-1 rounded-lg text-sm ${
                  bankForm.bankName ? 'text-gray-300' : 'text-amber-400'
                }`}>
                  {bankDisplay}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bank Account */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden border-l-4 border-l-primary">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2 relative z-10">
              <span className="text-primary">🏦</span> Rekening Bank Penerima
            </h3>
            <div className="space-y-3 relative z-10">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider font-medium block mb-1.5">Nama Bank</label>
                <input
                  type="text"
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  placeholder="Contoh: BCA, BNI, Mandiri"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider font-medium block mb-1.5">Nomor Rekening</label>
                <input
                  type="text"
                  value={bankForm.accountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  placeholder="Nomor rekening Anda"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider font-medium block mb-1.5">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={bankForm.accountName}
                  onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                  placeholder="Nama sesuai buku tabungan"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button
                onClick={handleSaveBank}
                disabled={savingBank}
                className={`mt-2 w-full px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  bankSaved
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50'
                }`}
              >
                {savingBank ? 'Menyimpan...' : bankSaved ? '✓ Tersimpan!' : 'Simpan Rekening'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Commission Details by Product */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
          <span className="text-amber-400">🏆</span> Komisi Per Produk
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 text-center py-8 text-gray-400 animate-pulse">Memuat data...</div>
          ) : data.productCommissions.length === 0 ? (
            <div className="col-span-4 text-center py-8">
              <p className="text-4xl mb-3">🏆</p>
              <p className="text-gray-500 text-sm">Belum ada komisi per produk</p>
              <p className="text-gray-600 text-xs mt-1">Bagikan link referral Anda untuk mulai mendapatkan komisi</p>
            </div>
          ) : data.productCommissions.map((p: any, idx: number) => (
            <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
              <p className="text-gray-400 text-sm mb-3 h-10 font-medium">{p.name}</p>
              <p className="text-white font-bold text-3xl mb-2">Rp {(p.totalCommission / 1_000_000).toFixed(1)}M</p>
              <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
                <span>✓</span> {p.salesCount} penjualan
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
