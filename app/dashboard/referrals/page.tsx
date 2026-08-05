'use client'

import { ReferralTable } from '@/components/dashboard/ReferralTable'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { MOCK_REFERRALS } from '@/lib/mock-data'

export default function ReferralsPage() {
  const convertedCount = MOCK_REFERRALS.filter(r => r.status === 'converted').length
  const pendingCount = MOCK_REFERRALS.filter(r => r.status === 'pending').length
  const totalCommission = MOCK_REFERRALS.filter(r => r.status === 'converted').reduce((sum, r) => sum + r.commission, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Kelola Referral Anda</h1>
        <p className="text-gray-400">Pantau semua referral link Anda dan conversion status</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Referral"
          value={MOCK_REFERRALS.length}
          subtitle="Sepanjang waktu"
          icon="🔗"
          color="cyan"
        />
        <StatsCard
          title="Berhasil Konversi"
          value={convertedCount}
          subtitle={`${((convertedCount / MOCK_REFERRALS.length) * 100).toFixed(1)}% conversion rate`}
          icon="✅"
          color="green"
        />
        <StatsCard
          title="Total Komisi"
          value={`Rp ${(totalCommission / 1_000_000).toFixed(1)}M`}
          subtitle="Dari referral berhasil"
          icon="💰"
          color="orange"
        />
      </div>

      {/* Filter & Export */}
      <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/50 rounded-lg font-semibold text-sm hover:bg-[#00d9ff]/30 transition-colors">
              Semua ({MOCK_REFERRALS.length})
            </button>
            <button className="px-4 py-2 text-gray-400 border border-white/20 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
              Berhasil ({convertedCount})
            </button>
            <button className="px-4 py-2 text-gray-400 border border-white/20 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors">
              Pending ({pendingCount})
            </button>
          </div>
          <button className="px-4 py-2 border border-[#00d9ff]/50 text-[#00d9ff] rounded-lg font-semibold text-sm hover:bg-[#00d9ff]/10 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Referral Table */}
      <ReferralTable />

      {/* Tips */}
      <div className="bg-gradient-to-r from-[#00d9ff]/20 to-transparent border border-[#00d9ff]/30 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-3">💡 Tips Meningkatkan Konversi</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>✓ Bagikan link referral di media sosial yang relevan dengan audience trading</li>
          <li>✓ Gunakan WhatsApp untuk personal outreach ke kontak Anda</li>
          <li>✓ Tulis review atau testimonial tentang produk FBL untuk meningkatkan trust</li>
          <li>✓ Monitor referral Anda secara rutin dan follow-up dengan pending conversions</li>
        </ul>
      </div>
    </div>
  )
}
