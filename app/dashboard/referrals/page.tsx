'use client'

import { ReferralTable } from '@/components/dashboard/ReferralTable'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { MOCK_REFERRALS } from '@/lib/mock-data'
import { motion } from 'framer-motion'

export default function ReferralsPage() {
  const convertedCount = MOCK_REFERRALS.filter(r => r.status === 'converted').length
  const pendingCount = MOCK_REFERRALS.filter(r => r.status === 'pending').length
  const totalCommission = MOCK_REFERRALS.filter(r => r.status === 'converted').reduce((sum, r) => sum + r.commission, 0)

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
        <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Referral Anda</h1>
        <p className="text-gray-400">Pantau semua referral link Anda dan conversion status</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Referral"
            value={MOCK_REFERRALS.length}
            subtitle="Sepanjang waktu"
            icon="🔗"
            color="cyan"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Berhasil Konversi"
            value={convertedCount}
            subtitle={`${((convertedCount / MOCK_REFERRALS.length) * 100).toFixed(1)}% conversion rate`}
            icon="✅"
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Komisi"
            value={`Rp ${(totalCommission / 1_000_000).toFixed(1)}M`}
            subtitle="Dari referral berhasil"
            icon="💰"
            color="orange"
          />
        </motion.div>
      </motion.div>

      {/* Filter */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div className="flex gap-2 flex-wrap">
            <button className="px-5 py-2.5 bg-primary/20 text-white border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] rounded-xl font-bold text-sm transition-all hover:bg-primary/30">
              Semua ({MOCK_REFERRALS.length})
            </button>
            <button className="px-5 py-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 hover:text-white transition-all">
              Berhasil ({convertedCount})
            </button>
            <button className="px-5 py-2.5 bg-white/5 text-gray-400 border border-white/10 rounded-xl font-medium text-sm hover:bg-white/10 hover:text-white transition-all">
              Pending ({pendingCount})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Referral Table */}
      <motion.div variants={itemVariants}>
        <ReferralTable />
      </motion.div>

      {/* Tips */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden border-l-4 border-l-primary">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> Tips Meningkatkan Konversi
          </h3>
          <ul className="text-gray-300 text-sm space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Bagikan link referral di media sosial yang relevan dengan audience trading</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Gunakan WhatsApp untuk personal outreach ke kontak Anda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Tulis review atau testimonial tentang produk FBL untuk meningkatkan trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Monitor referral Anda secara rutin dan follow-up dengan pending conversions</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
