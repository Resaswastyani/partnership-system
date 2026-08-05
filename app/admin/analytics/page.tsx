'use client'

import { MOCK_REVENUE_DATA, MOCK_ALL_MEMBERS, PRODUCTS } from '@/lib/mock-data'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  const topAffiliates = [...MOCK_ALL_MEMBERS]
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5)

  const productPerformance = PRODUCTS.map((p, i) => ({
    name: p.name,
    sales: [45, 28, 22, 15][i] || 10,
    revenue: Math.floor([45, 28, 22, 15][i] || 10) * p.price
  }))

  const totalRevenue = MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0)
  const totalCommissions = MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.commissions, 0)
  const avgMonthlyRevenue = totalRevenue / MOCK_REVENUE_DATA.length
  const conversionData = [
    { name: 'Converted', value: 2456, color: 'bg-emerald-500', text: 'text-emerald-400' },
    { name: 'Pending', value: 456, color: 'bg-amber-500', text: 'text-amber-400' },
    { name: 'Cancelled', value: 333, color: 'bg-red-500', text: 'text-red-400' }
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
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-wide">Analytics</h1>
        <p className="text-gray-400">Analisis mendalam kinerja program afiliasi FBL</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-primary hover:border-primary/50 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold relative z-10">Total Revenue (12 Bulan)</p>
          <p className="text-3xl font-bold text-primary mt-2 relative z-10">Rp {(totalRevenue / 1_000_000_000).toFixed(1)}B</p>
          <p className="text-xs text-primary/60 mt-2 relative z-10 flex items-center gap-1">
            <span className="text-emerald-400">↑ 12%</span> from last year
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-amber-500 hover:border-amber-500/50 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold relative z-10">Total Komisi</p>
          <p className="text-3xl font-bold text-amber-400 mt-2 relative z-10">Rp {(totalCommissions / 1_000_000_000).toFixed(1)}B</p>
          <p className="text-xs text-amber-300/60 mt-2 relative z-10 flex items-center gap-1">
            <span className="text-emerald-400">↑ 8%</span> from last year
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-emerald-500 hover:border-emerald-500/50 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold relative z-10">Rata-rata Revenue/Bulan</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2 relative z-10">Rp {(avgMonthlyRevenue / 1_000_000).toFixed(0)}M</p>
          <p className="text-xs text-emerald-300/60 mt-2 relative z-10">Estimate dari data aktual</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 relative overflow-hidden border-l-4 border-l-blue-500 hover:border-blue-500/50 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold relative z-10">Conversion Rate</p>
          <p className="text-3xl font-bold text-blue-400 mt-2 relative z-10">34.5%</p>
          <p className="text-xs text-blue-300/60 mt-2 relative z-10 flex items-center gap-1">
            <span className="text-emerald-400">↑ 2.1%</span> from last month
          </p>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
            <span className="text-primary">📈</span> Revenue & Commission (12 Bulan)
          </h3>
          <div className="h-64 relative z-10">
            <svg viewBox="0 0 800 280" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {[0, 25, 50, 75, 100].map(i => (
                <line key={`grid-${i}`} x1="60" y1={260 - i * 2.3} x2="800" y2={260 - i * 2.3} stroke="white" strokeOpacity="0.04" />
              ))}

              {MOCK_REVENUE_DATA.map((data, idx) => {
                const maxRev = Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue))
                const revHeight = (data.revenue / maxRev) * 200
                const commHeight = (data.commissions / maxRev) * 200
                const x = 80 + idx * 55

                return (
                  <g key={idx}>
                    <rect x={x - 10} y={240 - revHeight} width="18" height={revHeight} fill="#fbbf24" fillOpacity="0.9" rx="3" />
                    <rect x={x + 10} y={240 - commHeight} width="18" height={commHeight} fill="#10b981" fillOpacity="0.9" rx="3" />
                    <text x={x} y="258" textAnchor="middle" fontSize="10" fill="white" fillOpacity="0.5">
                      {data.month.substring(0, 1)}
                    </text>
                  </g>
                )
              })}

              <line x1="60" y1="240" x2="800" y2="240" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex gap-6 mt-4 text-sm relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary"></div>
              <span className="text-gray-400 font-medium">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-400"></div>
              <span className="text-gray-400 font-medium">Commission</span>
            </div>
          </div>
        </motion.div>

        {/* Product Performance */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
            <span className="text-accent">📦</span> Performa Produk
          </h3>
          <div className="space-y-5 relative z-10">
            {productPerformance.map((prod, idx) => {
              const maxSales = Math.max(...productPerformance.map(p => p.sales))
              const percentage = (prod.sales / maxSales) * 100
              const colors = [
                'from-primary/80 to-primary shadow-[0_0_10px_rgba(251,191,36,0.2)]',
                'from-emerald-500/80 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
                'from-amber-500/80 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
                'from-pink-500/80 to-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
              ]

              return (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate pr-4">{prod.name}</span>
                    <span className="text-sm text-primary font-bold shrink-0">{prod.sales} sales</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${colors[idx]} rounded-full`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Affiliates & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Affiliates */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
            <span className="text-primary">🏆</span> Top 5 Affiliate
          </h3>
          <div className="space-y-3 relative z-10">
            {topAffiliates.map((aff, idx) => {
              const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']
              return (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{medals[idx]}</span>
                    <div>
                      <p className="font-semibold text-white group-hover:text-primary transition-colors">{aff.name}</p>
                      <p className="text-xs text-gray-400">{aff.totalReferrals} referrals</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">Rp {(aff.totalEarnings / 1_000_000).toFixed(1)}M</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
            <span className="text-emerald-400">🔄</span> Conversion Status
          </h3>
          <div className="space-y-5 relative z-10">
            {conversionData.map((item, idx) => {
              const total = conversionData.reduce((sum, d) => sum + d.value, 0)
              const percentage = (item.value / total) * 100

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${item.text}`}>{item.value.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 relative z-10">
            <p className="text-sm text-emerald-300">
              <strong>💡 Insight:</strong> 75.2% conversion rate menunjukkan affiliate network yang sangat sehat dan performa di atas rata-rata industri.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
