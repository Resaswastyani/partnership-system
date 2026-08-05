'use client'

import { MOCK_REFERRALS } from '@/lib/mock-data'
import { motion } from 'framer-motion'

const statusColors = {
  converted: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]' },
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.2)]' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]' }
}

export function ReferralTable() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 right-[20%] w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />
      {/* Header */}
      <div className="p-8 border-b border-white/5 relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-white font-bold text-xl flex items-center gap-2">
            <span className="text-primary">📋</span> Aktivitas Referral Terbaru
          </h3>
          <p className="text-gray-400 text-sm mt-1">15 dari {MOCK_REFERRALS.length} referral</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10">
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Nama Pembeli</th>
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Email</th>
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Produk</th>
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Komisi</th>
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-left text-gray-400 text-xs font-bold uppercase tracking-wider">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_REFERRALS.map((referral, index) => {
              const statusColor = statusColors[referral.status as keyof typeof statusColors]
              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={referral.id} 
                  className="hover:bg-white/[0.02] transition-colors group cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                        {referral.refereeName.charAt(0)}
                      </div>
                      <p className="text-white font-semibold text-sm group-hover:text-primary transition-colors">{referral.refereeName}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-gray-400 text-sm">{referral.refereeEmail}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-gray-300 text-sm font-medium">{referral.productName}</p>
                  </td>
                  <td className="px-8 py-5">
                    {referral.status === 'converted' ? (
                      <p className="text-emerald-400 font-bold text-sm">
                        Rp {referral.commission.toLocaleString('id-ID')}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm font-medium">-</p>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border ${statusColor.bg} ${statusColor.text} ${statusColor.border} ${statusColor.glow}`}>
                      {referral.status === 'converted' && 'Berhasil'}
                      {referral.status === 'pending' && 'Menunggu'}
                      {referral.status === 'cancelled' && 'Dibatalkan'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-gray-400 text-sm">
                      {referral.createdAt.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 flex justify-between items-center relative z-10">
        <p className="text-gray-400 text-sm">Menampilkan <span className="text-white font-medium">5</span> dari <span className="text-white font-medium">{MOCK_REFERRALS.length}</span> referral</p>
        <button className="px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          Lihat Semua Data
        </button>
      </div>
    </div>
  )
}
