'use client'

import { MOCK_REVENUE_DATA, MOCK_ALL_MEMBERS, PRODUCTS } from '@/lib/mock-data'

export default function AnalyticsPage() {
  const topAffiliates = [...MOCK_ALL_MEMBERS]
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5)

  const productPerformance = PRODUCTS.map(p => ({
    name: p.name,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 100000000) + 50000000
  }))

  const totalRevenue = MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0)
  const totalCommissions = MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.commissions, 0)
  const avgMonthlyRevenue = totalRevenue / MOCK_REVENUE_DATA.length
  const conversionData = [
    { name: 'Converted', value: 2456 },
    { name: 'Pending', value: 456 },
    { name: 'Cancelled', value: 333 }
  ]

  const chartHeight = 300

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
          <p className="text-sm text-muted-foreground">Total Revenue (12 bulan)</p>
          <p className="text-3xl font-bold text-cyan-400 mt-2">Rp {(totalRevenue / 1_000_000_000).toFixed(1)}B</p>
          <p className="text-xs text-cyan-300/60 mt-2">↑ 12% from last year</p>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30">
          <p className="text-sm text-muted-foreground">Total Komisi</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">Rp {(totalCommissions / 1_000_000_000).toFixed(1)}B</p>
          <p className="text-xs text-yellow-300/60 mt-2">↑ 8% from last year</p>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
          <p className="text-sm text-muted-foreground">Rata-rata Revenue/Bulan</p>
          <p className="text-3xl font-bold text-green-400 mt-2">Rp {(avgMonthlyRevenue / 1_000_000).toFixed(0)}M</p>
          <p className="text-xs text-green-300/60 mt-2">Estimate</p>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">34.5%</p>
          <p className="text-xs text-blue-300/60 mt-2">↑ 2.1% from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold text-foreground mb-6">Revenue & Commission Trend (12 Bulan)</h3>
          <div style={{ height: chartHeight }} className="relative">
            <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(i => (
                <line key={`grid-${i}`} x1="60" y1={300 - i * 2.5} x2="800" y2={300 - i * 2.5} stroke="white" strokeOpacity="0.05" />
              ))}

              {/* Bars */}
              {MOCK_REVENUE_DATA.map((data, idx) => {
                const maxRev = Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue))
                const revHeight = (data.revenue / maxRev) * 200
                const commHeight = (data.commissions / maxRev) * 200
                const x = 80 + idx * 55

                return (
                  <g key={idx}>
                    {/* Revenue bar */}
                    <rect x={x - 8} y={280 - revHeight} width="16" height={revHeight} fill="#00d9ff" fillOpacity="0.8" rx="2" />
                    {/* Commission bar */}
                    <rect x={x + 8} y={280 - commHeight} width="16" height={commHeight} fill="#fbbf24" fillOpacity="0.8" rx="2" />
                    {/* Month label */}
                    <text x={x} y="295" textAnchor="middle" fontSize="10" fill="white" fillOpacity="0.6">
                      {data.month.substring(0, 1)}
                    </text>
                  </g>
                )
              })}

              {/* Axes */}
              <line x1="60" y1="280" x2="800" y2="280" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="60" y1="80" x2="60" y2="280" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-400"></div>
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-400"></div>
              <span className="text-muted-foreground">Commission</span>
            </div>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold text-foreground mb-6">Performa Produk</h3>
          <div className="space-y-4">
            {productPerformance.map((prod, idx) => {
              const maxSales = Math.max(...productPerformance.map(p => p.sales))
              const percentage = (prod.sales / maxSales) * 100

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{prod.name}</span>
                    <span className="text-sm text-cyan-400 font-bold">{prod.sales} sales</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Affiliates & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Affiliates */}
        <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold text-foreground mb-6">Top 5 Affiliate</h3>
          <div className="space-y-3">
            {topAffiliates.map((aff, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{idx + 1}. {aff.name}</p>
                  <p className="text-xs text-muted-foreground">{aff.totalReferrals} referrals</p>
                </div>
                <p className="text-sm font-bold text-cyan-400">Rp {(aff.totalEarnings / 1_000_000).toFixed(1)}M</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-bold text-foreground mb-6">Conversion Status</h3>
          <div className="space-y-4">
            {conversionData.map((item, idx) => {
              const total = conversionData.reduce((sum, d) => sum + d.value, 0)
              const percentage = (item.value / total) * 100
              const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500']

              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.value} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${colors[idx]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>💡 Insight:</strong> 75.2% conversion rate menunjukkan affiliate network yang sehat
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
