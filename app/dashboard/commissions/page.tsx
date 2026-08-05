'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { CURRENT_USER } from '@/lib/mock-data'
import { motion } from 'framer-motion'

export default function CommissionsPage() {
  const monthlyData = [
    { month: 'Jan', amount: 850_000, status: 'Paid' },
    { month: 'Feb', amount: 1_120_000, status: 'Paid' },
    { month: 'Mar', amount: 950_000, status: 'Paid' },
    { month: 'Apr', amount: 1_450_000, status: 'Paid' },
    { month: 'May', amount: 1_290_000, status: 'Paid' },
    { month: 'Jun', amount: 1_680_000, status: 'Paid' },
    { month: 'Jul', amount: 890_000, status: 'Pending' },
    { month: 'Aug', amount: 1_220_000, status: 'Pending' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

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
            value={`Rp ${(CURRENT_USER.totalEarnings / 1_000_000).toFixed(1)}M`}
            subtitle="Semua waktu"
            icon="✅"
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Komisi Pending"
            value={`Rp ${(CURRENT_USER.pendingCommissions / 1_000_000).toFixed(1)}M`}
            subtitle="Menunggu verifikasi"
            icon="⏳"
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Average Commission"
            value={`Rp ${(CURRENT_USER.totalEarnings / 5 / 1_000_000).toFixed(2)}M`}
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
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 text-right">
                  <p className="text-gray-400 text-sm font-semibold group-hover:text-white transition-colors">{data.month}</p>
                </div>
                <div className="flex-1">
                  <div className="h-10 bg-white/5 rounded-xl overflow-hidden flex items-center border border-white/5 group-hover:border-white/10 transition-colors">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(data.amount / 2_000_000) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full flex items-center px-4 text-white font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.2)] ${
                        data.status === 'Paid'
                          ? 'bg-gradient-to-r from-emerald-500/80 to-emerald-400'
                          : 'bg-gradient-to-r from-amber-500/80 to-amber-400'
                      }`}
                    >
                      Rp {(data.amount / 1_000_000).toFixed(1)}M
                    </motion.div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    data.status === 'Paid' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {data.status === 'Paid' ? 'Berhasil' : 'Menunggu'}
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
                <p className="text-emerald-400 font-bold text-xl">Rp 2.4M</p>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-semibold">Tanggal Transfer</p>
                  <p className="text-gray-400 text-sm mt-0.5">Setiap tanggal 5 bulan berikutnya</p>
                </div>
                <p className="text-accent font-bold">5 September</p>
              </div>

              <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="text-white font-semibold">Metode Pembayaran</p>
                  <p className="text-gray-400 text-sm mt-0.5">Transfer ke rekening terdaftar</p>
                </div>
                <p className="text-gray-300 font-semibold bg-white/10 px-3 py-1 rounded-lg">BCA ****1234</p>
              </div>
            </div>
          </motion.div>

          {/* Bank Account */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden border-l-4 border-l-primary">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2 relative z-10">
              <span className="text-primary">🏦</span> Rekening Bank Penerima
            </h3>
            <div className="bg-background/50 rounded-xl p-5 border border-white/10 relative z-10">
              <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-medium">Bank Account</p>
              <p className="text-white font-mono font-bold text-lg tracking-wide">BCA - Ahmad Trader - 1234567890</p>
              <button className="mt-6 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl hover:bg-primary/20 hover:border-primary/50 transition-all text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Update Rekening
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
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <p className="text-gray-400 text-sm mb-3 h-10 font-medium">EA Robot Trading FBL</p>
            <p className="text-white font-bold text-3xl mb-2">Rp 4.5M</p>
            <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              <span>✓</span> 15 penjualan @ 5%
            </p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <p className="text-gray-400 text-sm mb-3 h-10 font-medium">Materi Profesional Trading</p>
            <p className="text-white font-bold text-3xl mb-2">Rp 1.2M</p>
            <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              <span>✓</span> 12 penjualan @ 3%
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <p className="text-gray-400 text-sm mb-3 h-10 font-medium">Jurnal Trading</p>
            <p className="text-white font-bold text-3xl mb-2">Rp 960K</p>
            <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              <span>✓</span> 8 penjualan @ 3%
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
            <p className="text-gray-400 text-sm mb-3 h-10 font-medium">Position Size Calculator</p>
            <p className="text-white font-bold text-3xl mb-2">Rp 298K</p>
            <p className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              <span>✓</span> 2 penjualan @ 2%
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
