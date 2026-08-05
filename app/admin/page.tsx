'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { ActivityFeed } from '@/components/admin/ActivityFeed'
import { MOCK_DASHBOARD_STATS, MOCK_REVENUE_DATA, MOCK_ACTIVITIES, MOCK_ALL_MEMBERS, MOCK_PAYOUTS } from '@/lib/mock-data'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [timeRange] = useState('month')
  const [activities, setActivities] = useState(MOCK_ACTIVITIES)
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 12,
    recentTransactions: 5,
    pendingApprovals: MOCK_ALL_MEMBERS.filter(m => m.status === 'pending').length,
    pendingPayouts: MOCK_PAYOUTS.filter(p => p.status === 'pending' || p.status === 'approved').length
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: Math.max(8, Math.min(20, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1))),
        recentTransactions: prev.recentTransactions + Math.floor(Math.random() * 2),
        pendingApprovals: prev.pendingApprovals,
        pendingPayouts: prev.pendingPayouts
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const revenueThisMonth = MOCK_REVENUE_DATA[MOCK_REVENUE_DATA.length - 1]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/30 rounded-xl p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Dashboard Sistem FBL Partnership 🎯
            </h2>
            <p className="text-gray-400">Kelola semua aspek program afiliasi dari sini</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Revenue Bulan Ini</p>
            <p className="text-3xl font-bold text-[#10b981]">Rp {(revenueThisMonth.revenue / 1_000_000).toFixed(1)}M</p>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Members"
          value={MOCK_DASHBOARD_STATS.totalMembers}
          subtitle={`Dari ${MOCK_DASHBOARD_STATS.totalUsers} users`}
          icon="👥"
          color="cyan"
          trend={{ value: 15, direction: 'up' }}
        />
        <StatsCard
          title="Total Referrals"
          value={MOCK_DASHBOARD_STATS.totalReferrals.toLocaleString()}
          subtitle="Semua waktu"
          icon="🔗"
          color="green"
          trend={{ value: 22, direction: 'up' }}
        />
        <StatsCard
          title="Komisi Pending"
          value={`Rp ${(MOCK_DASHBOARD_STATS.totalCommissionsPending / 1_000_000).toFixed(1)}M`}
          subtitle="Siap dibayar"
          icon="💳"
          color="orange"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${MOCK_DASHBOARD_STATS.conversionRate}%`}
          subtitle="Industry avg: 28%"
          icon="📈"
          color="pink"
          trend={{ value: 5, direction: 'up' }}
        />
      </div>

      {/* Revenue & Commission Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold text-lg">Revenue Trend</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#00d9ff]/20 text-[#00d9ff] text-xs font-semibold rounded-lg">Month</button>
              <button className="px-3 py-1 text-gray-400 text-xs font-semibold rounded-lg hover:bg-white/10">Year</button>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3 h-64 flex flex-col justify-end">
            <div className="flex items-end gap-2 h-full">
              {MOCK_REVENUE_DATA.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-[#00d9ff] to-[#00bfff] rounded-t-lg transition-all hover:from-[#00bfff] hover:to-[#00d9ff] group"
                    style={{
                      height: `${(data.revenue / Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue))) * 180}px`,
                      cursor: 'pointer'
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold pb-1 text-center">
                      {(data.revenue / 1_000_000).toFixed(0)}M
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm">Avg Monthly</p>
                <p className="text-white font-bold">Rp {(MOCK_REVENUE_DATA.reduce((a, b) => a + b.revenue, 0) / MOCK_REVENUE_DATA.length / 1_000_000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Peak Month</p>
                <p className="text-white font-bold">Rp {(Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue)) / 1_000_000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Year</p>
                <p className="text-white font-bold">Rp {(MOCK_REVENUE_DATA.reduce((a, b) => a + b.revenue, 0) / 1_000_000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Breakdown */}
        <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-6">Commission Breakdown</h3>

          <div className="space-y-4">
            {/* EA Robot */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold">EA Robot Trading FBL</p>
                <p className="text-[#10b981] font-bold">35%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full"></div>
              </div>
            </div>

            {/* Materi Trading */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold">Materi Profesional Trading</p>
                <p className="text-[#00d9ff] font-bold">28%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[28%] bg-gradient-to-r from-[#00d9ff] to-[#00bfff] rounded-full"></div>
              </div>
            </div>

            {/* Jurnal Trading */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold">Jurnal Trading</p>
                <p className="text-[#f59e0b] font-bold">22%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[22%] bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-full"></div>
              </div>
            </div>

            {/* Position Size Calculator */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white text-sm font-semibold">Position Size Calculator</p>
                <p className="text-[#ec4899] font-bold">15%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-gradient-to-r from-[#ec4899] to-[#be185d] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Top Product</p>
                <p className="text-white font-bold">{MOCK_DASHBOARD_STATS.topProduct}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Top Affiliate</p>
                <p className="text-white font-bold">{MOCK_DASHBOARD_STATS.topAffiliate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Monitoring & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Metrics */}
        <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Live Metrics</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Aktif</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-300 text-sm font-semibold">Active Users (Now)</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">{liveMetrics.activeUsers}</p>
            </div>

            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-cyan-300 text-sm font-semibold">Transactions (Today)</p>
              <p className="text-3xl font-bold text-cyan-400 mt-1">{liveMetrics.recentTransactions}</p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-300 text-sm font-semibold">Pending Approvals</p>
              <p className="text-3xl font-bold text-yellow-400 mt-1">{liveMetrics.pendingApprovals}</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-purple-300 text-sm font-semibold">Pending Payouts</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">{liveMetrics.pendingPayouts}</p>
            </div>
          </div>

          <button className="w-full mt-6 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors font-medium text-sm">
            View All Actions →
          </button>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Recent Activity (Real-time)</h3>
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors">
              Refresh
            </button>
          </div>
          <ActivityFeed activities={activities} maxItems={8} />
          <button className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm">
            View All Activities →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <a href="/admin/members" className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6 hover:border-[#00d9ff]/50 transition-colors cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
          <h3 className="text-white font-bold text-lg mb-2">Kelola Members</h3>
          <p className="text-gray-400 text-sm">Lihat, edit, suspend members</p>
          <div className="mt-4 text-[#00d9ff] font-semibold text-sm">Buka →</div>
        </a>

        <a href="/admin/products" className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6 hover:border-[#10b981]/50 transition-colors cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📦</div>
          <h3 className="text-white font-bold text-lg mb-2">Kelola Produk</h3>
          <p className="text-gray-400 text-sm">Update harga, komisi, info produk</p>
          <div className="mt-4 text-[#10b981] font-semibold text-sm">Buka →</div>
        </a>

        <a href="/admin/payouts" className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6 hover:border-[#f59e0b]/50 transition-colors cursor-pointer group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💳</div>
          <h3 className="text-white font-bold text-lg mb-2">Payouts</h3>
          <p className="text-gray-400 text-sm">Proses pembayaran komisi members</p>
          <div className="mt-4 text-[#f59e0b] font-semibold text-sm">Buka →</div>
        </a>
      </div>
    </div>
  )
}
