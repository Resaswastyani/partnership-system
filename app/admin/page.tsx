'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { ActivityFeed } from '@/components/admin/ActivityFeed'
import { MOCK_DASHBOARD_STATS, MOCK_REVENUE_DATA, MOCK_ACTIVITIES, MOCK_ALL_MEMBERS, MOCK_PAYOUTS } from '@/lib/mock-data'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [timeRange] = useState('month')
  const [loading, setLoading] = useState(true)
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 0,
    recentTransactions: 0,
    pendingApprovals: 0,
    pendingPayouts: 0
  })
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalReferrals: 0,
    totalCommissionsPending: 0,
    totalRevenue: 0
  })
  const [activities, setActivities] = useState<any[]>([])

  // Fetch data
  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats)
          setActivities(data.activities)
          setLiveMetrics(prev => ({
            ...prev,
            activeUsers: Math.floor(Math.random() * 10) + 5,
            pendingPayouts: data.stats.totalCommissionsPending > 0 ? 1 : 0
          }))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

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
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden glow-effect">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">
              Dashboard Sistem <span className="text-gradient">FBL 🎯</span>
            </h2>
            <p className="text-gray-400 font-medium">Kelola semua aspek program afiliasi dari sini</p>
          </div>
          <div className="text-left md:text-right bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
              Rp {(stats.totalRevenue / 1_000_000).toFixed(1)}M
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Stats */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Members"
            value={stats.totalMembers}
            subtitle="Member terdaftar"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            color="cyan"
            trend={{ value: 15, direction: 'up' }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Referrals"
            value={stats.totalReferrals.toLocaleString()}
            subtitle="Dari link afiliasi"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
            color="green"
            trend={{ value: 22, direction: 'up' }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Komisi Pending"
            value={`Rp ${(stats.totalCommissionsPending / 1_000_000).toFixed(1)}M`}
            subtitle="Siap dibayar"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Conversion Rate"
            value={`${MOCK_DASHBOARD_STATS.conversionRate}%`}
            subtitle="Industry avg: 28%"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            color="pink"
            trend={{ value: 5, direction: 'up' }}
          />
        </motion.div>
      </motion.div>

      {/* Revenue & Commission Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Revenue Trend
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/30">Month</button>
              <button className="px-4 py-1.5 bg-white/5 text-gray-400 text-xs font-bold rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-colors">Year</button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3 h-64 flex flex-col justify-end relative z-10">
            <div className="flex items-end gap-3 h-full">
              {MOCK_REVENUE_DATA.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-t-lg transition-all hover:from-primary hover:to-primary/80 group hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] relative"
                    style={{
                      height: `${(data.revenue / Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue))) * 180}px`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold bg-white/10 px-2 py-1 rounded backdrop-blur-md">
                      {(data.revenue / 1_000_000).toFixed(0)}M
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2 font-medium">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg Monthly</p>
                <p className="text-white font-bold text-lg">Rp {(MOCK_REVENUE_DATA.reduce((a, b) => a + b.revenue, 0) / MOCK_REVENUE_DATA.length / 1_000_000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Peak Month</p>
                <p className="text-white font-bold text-lg">Rp {(Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue)) / 1_000_000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Year</p>
                <p className="text-white font-bold text-lg text-primary">Rp {(MOCK_REVENUE_DATA.reduce((a, b) => a + b.revenue, 0) / 1_000_000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commission Breakdown */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2 relative z-10">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            Commission Breakdown
          </h3>

          <div className="space-y-6 relative z-10">
            {/* EA Robot */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold group-hover:text-primary transition-colors">EA Robot Trading FBL</p>
                <p className="text-primary font-bold">35%</p>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '35%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)]" 
                />
              </div>
            </div>

            {/* Materi Trading */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold group-hover:text-accent transition-colors">Materi Profesional Trading</p>
                <p className="text-accent font-bold">28%</p>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '28%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                />
              </div>
            </div>

            {/* Jurnal Trading */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold group-hover:text-amber-400 transition-colors">Jurnal Trading</p>
                <p className="text-amber-400 font-bold">22%</p>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '22%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-500/80 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                />
              </div>
            </div>

            {/* Position Size Calculator */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold group-hover:text-pink-400 transition-colors">Position Size Calculator</p>
                <p className="text-pink-400 font-bold">15%</p>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '15%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-pink-500/80 to-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.3)]" 
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Top Product</p>
                <p className="text-white font-bold">{MOCK_DASHBOARD_STATS.topProduct}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Top Affiliate</p>
                <p className="text-white font-bold">{MOCK_DASHBOARD_STATS.topAffiliate}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Monitoring & Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Live Metrics */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 border-l-4 border-l-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-white font-bold text-xl">Live Metrics</h3>
            <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-accent font-bold uppercase tracking-wide">Aktif</span>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
              <p className="text-blue-300 text-xs uppercase tracking-wider font-semibold">Active Users (Now)</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{liveMetrics.activeUsers}</p>
            </div>

            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition-colors">
              <p className="text-sky-300 text-xs uppercase tracking-wider font-semibold">Transactions (Today)</p>
              <p className="text-3xl font-bold text-sky-400 mt-2">{liveMetrics.recentTransactions}</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
              <p className="text-amber-300 text-xs uppercase tracking-wider font-semibold">Pending Approvals</p>
              <p className="text-3xl font-bold text-amber-400 mt-2">{liveMetrics.pendingApprovals}</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
              <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold">Pending Payouts</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">{liveMetrics.pendingPayouts}</p>
            </div>
          </div>

          <button className="w-full mt-6 px-4 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent rounded-xl transition-all font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            View All Actions →
          </button>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-white font-bold text-xl flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Recent Activity
            </h3>
            <button className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-bold rounded-lg transition-colors">
              Refresh
            </button>
          </div>
          <div className="relative z-10">
            <ActivityFeed activities={activities} maxItems={8} />
          </div>
          <button className="w-full mt-6 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-bold text-sm relative z-10">
            View All Activities →
          </button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
        <motion.a variants={itemVariants} href="/admin/members" className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Kelola Members</h3>
          <p className="text-gray-400 text-sm font-medium">Lihat, edit, suspend members</p>
          <div className="mt-6 text-primary font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
            Buka Sekarang <span>→</span>
          </div>
        </motion.a>

        <motion.a variants={itemVariants} href="/admin/products" className="glass-card rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Kelola Produk</h3>
          <p className="text-gray-400 text-sm font-medium">Update harga, komisi, info produk</p>
          <div className="mt-6 text-accent font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
            Buka Sekarang <span>→</span>
          </div>
        </motion.a>

        <motion.a variants={itemVariants} href="/admin/payouts" className="glass-card rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Payouts</h3>
          <p className="text-gray-400 text-sm font-medium">Proses pembayaran komisi members</p>
          <div className="mt-6 text-pink-400 font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
            Buka Sekarang <span>→</span>
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
