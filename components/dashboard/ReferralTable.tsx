'use client'

import { MOCK_REFERRALS } from '@/lib/mock-data'

const statusColors = {
  converted: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
}

export function ReferralTable() {
  return (
    <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-white font-bold text-lg">Aktivitas Referral Terbaru</h3>
        <p className="text-gray-400 text-sm mt-1">15 dari {MOCK_REFERRALS.length} referral</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Nama Pembeli</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Produk</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Komisi</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-gray-400 text-sm font-semibold">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REFERRALS.map((referral) => {
              const statusColor = statusColors[referral.status as keyof typeof statusColors]
              return (
                <tr key={referral.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{referral.refereeName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm">{referral.refereeEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white text-sm">{referral.productName}</p>
                  </td>
                  <td className="px-6 py-4">
                    {referral.status === 'converted' ? (
                      <p className="text-green-400 font-semibold text-sm">
                        Rp {referral.commission.toLocaleString('id-ID')}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm">-</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                      {referral.status === 'converted' && 'Berhasil'}
                      {referral.status === 'pending' && 'Menunggu'}
                      {referral.status === 'cancelled' && 'Dibatalkan'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm">
                      {referral.createdAt.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
        <p className="text-gray-400 text-sm">Menampilkan 5 dari {MOCK_REFERRALS.length} referral</p>
        <button className="px-4 py-2 bg-[#00d9ff]/20 border border-[#00d9ff]/50 text-[#00d9ff] rounded-lg hover:bg-[#00d9ff]/30 transition-colors text-sm font-semibold">
          Lihat Semua
        </button>
      </div>
    </div>
  )
}
