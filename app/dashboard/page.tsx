'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { ReferralCard } from '@/components/dashboard/ReferralCard'
import { ReferralTable } from '@/components/dashboard/ReferralTable'
import { CURRENT_USER, MOCK_REFERRALS } from '@/lib/mock-data'

export default function DashboardPage() {
  const convertedReferrals = MOCK_REFERRALS.filter(r => r.status === 'converted')
  const pendingReferrals = MOCK_REFERRALS.filter(r => r.status === 'pending')

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/30 rounded-xl p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Selamat datang kembali, Ahmad! 👋
            </h2>
            <p className="text-gray-400">Berikut ringkasan performa afiliasi Anda minggu ini</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Komisi Bulan Ini</p>
            <p className="text-3xl font-bold text-[#00d9ff]">Rp 2.5M</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`Rp ${(CURRENT_USER.totalEarnings / 1_000_000).toFixed(1)}M`}
          subtitle="Dari semua referral"
          icon="💰"
          color="cyan"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Pending Komisi"
          value={`Rp ${(CURRENT_USER.pendingCommissions / 1_000_000).toFixed(1)}M`}
          subtitle="Menunggu verifikasi"
          icon="⏳"
          color="orange"
        />
        <StatsCard
          title="Total Referral"
          value={CURRENT_USER.totalReferrals}
          subtitle={`${convertedReferrals.length} converted`}
          icon="🔗"
          color="green"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Conversion Rate"
          value="34.5%"
          subtitle="Rata-rata industri 28%"
          icon="📊"
          color="pink"
          trend={{ value: 3, direction: 'up' }}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Referral Card */}
        <div className="lg:col-span-2">
          <ReferralCard />
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Produk Terlaris</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm font-semibold">EA Robot</p>
                  <p className="text-gray-400 text-xs">15 penjualan</p>
                </div>
                <p className="text-[#10b981] font-bold">Rp 4.5M</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm font-semibold">Materi Trading</p>
                  <p className="text-gray-400 text-xs">12 penjualan</p>
                </div>
                <p className="text-[#00d9ff] font-bold">Rp 1.2M</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm font-semibold">Jurnal Trading</p>
                  <p className="text-gray-400 text-xs">8 penjualan</p>
                </div>
                <p className="text-[#f59e0b] font-bold">Rp 960K</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start pb-3 border-b border-white/10">
                <div className="text-xl">📈</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Referral berhasil</p>
                  <p className="text-gray-400 text-xs">Eka Prasetya beli Materi Trading</p>
                  <p className="text-gray-500 text-xs mt-1">2 jam lalu</p>
                </div>
              </div>
              <div className="flex gap-3 items-start pb-3 border-b border-white/10">
                <div className="text-xl">✅</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Komisi diterima</p>
                  <p className="text-gray-400 text-xs">Rp 8,970 dari referral</p>
                  <p className="text-gray-500 text-xs mt-1">1 hari lalu</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-xl">🎉</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Milestone tercapai</p>
                  <p className="text-gray-400 text-xs">Anda mencapai 45 referral!</p>
                  <p className="text-gray-500 text-xs mt-1">5 hari lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Table */}
      <ReferralTable />

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#00d9ff] to-[#00bfff] rounded-xl p-8 text-[#0f172a]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Tingkatkan Earning Anda!</h3>
            <p className="text-[#0f172a]/80">Bagikan referral link Anda ke lebih banyak orang dan raih komisi lebih besar.</p>
          </div>
          <button className="px-6 py-3 bg-[#0f172a] text-[#00d9ff] font-bold rounded-lg hover:bg-[#1a2847] transition-colors">
            Share Sekarang →
          </button>
        </div>
      </div>
    </div>
  )
}
