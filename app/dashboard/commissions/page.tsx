'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { CURRENT_USER, MOCK_REFERRALS } from '@/lib/mock-data'

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Tracking Komisi</h1>
        <p className="text-gray-400">Monitor komisi Anda per bulan dan status pembayaran</p>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Komisi Diterima"
          value={`Rp ${(CURRENT_USER.totalEarnings / 1_000_000).toFixed(1)}M`}
          subtitle="Semua waktu"
          icon="✅"
          color="green"
        />
        <StatsCard
          title="Komisi Pending"
          value={`Rp ${(CURRENT_USER.pendingCommissions / 1_000_000).toFixed(1)}M`}
          subtitle="Menunggu verifikasi"
          icon="⏳"
          color="orange"
        />
        <StatsCard
          title="Average Commission"
          value={`Rp ${(CURRENT_USER.totalEarnings / 5 / 1_000_000).toFixed(2)}M`}
          subtitle="Per referral"
          icon="📊"
          color="cyan"
        />
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-6">Komisi Bulanan</h3>
        
        <div className="space-y-3">
          {monthlyData.map((data, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 text-right">
                <p className="text-gray-400 text-sm font-semibold">{data.month}</p>
              </div>
              <div className="flex-1">
                <div className="h-8 bg-white/10 rounded-lg overflow-hidden flex items-center">
                  <div
                    className={`h-full flex items-center px-3 text-white font-bold text-sm transition-all ${
                      data.status === 'Paid'
                        ? 'bg-gradient-to-r from-[#10b981] to-[#059669]'
                        : 'bg-gradient-to-r from-[#f59e0b] to-[#d97706]'
                    }`}
                    style={{
                      width: `${(data.amount / 2_000_000) * 100}%`
                    }}
                  >
                    Rp {(data.amount / 1_000_000).toFixed(1)}M
                  </div>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className={`text-sm font-semibold ${
                  data.status === 'Paid' ? 'text-[#10b981]' : 'text-[#f59e0b]'
                }`}>
                  {data.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Schedule */}
      <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Jadwal Pembayaran</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="text-white font-semibold">Pembayaran Bulan Ini</p>
              <p className="text-gray-400 text-sm">Komisi yang sudah verified</p>
            </div>
            <p className="text-[#10b981] font-bold text-lg">Rp 2.4M</p>
          </div>
          
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div>
              <p className="text-white font-semibold">Tanggal Transfer</p>
              <p className="text-gray-400 text-sm">Setiap tanggal 5 bulan berikutnya</p>
            </div>
            <p className="text-[#00d9ff] font-bold">5 September</p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">Metode Pembayaran</p>
              <p className="text-gray-400 text-sm">Transfer ke rekening bank terdaftar</p>
            </div>
            <p className="text-gray-400 font-semibold">Bank BCA ****1234</p>
          </div>
        </div>
      </div>

      {/* Commission Details by Product */}
      <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Komisi Per Produk</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">EA Robot Trading FBL</p>
            <p className="text-white font-bold text-2xl mb-1">Rp 4.5M</p>
            <p className="text-green-400 text-sm">✓ 15 penjualan @ 5%</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Materi Profesional Trading</p>
            <p className="text-white font-bold text-2xl mb-1">Rp 1.2M</p>
            <p className="text-green-400 text-sm">✓ 12 penjualan @ 3%</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Jurnal Trading</p>
            <p className="text-white font-bold text-2xl mb-1">Rp 960K</p>
            <p className="text-green-400 text-sm">✓ 8 penjualan @ 3%</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Position Size Calculator</p>
            <p className="text-white font-bold text-2xl mb-1">Rp 298K</p>
            <p className="text-green-400 text-sm">✓ 2 penjualan @ 2%</p>
          </div>
        </div>
      </div>

      {/* Bank Account */}
      <div className="bg-gradient-to-r from-[#00d9ff]/10 to-transparent border border-[#00d9ff]/30 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Rekening Bank Penerima</h3>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Bank Account</p>
          <p className="text-white font-mono font-bold">BCA - Ahmad Trader - 1234567890</p>
          <button className="mt-4 px-4 py-2 bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/50 rounded-lg hover:bg-[#00d9ff]/30 transition-colors text-sm font-semibold">
            Update Rekening
          </button>
        </div>
      </div>
    </div>
  )
}
