'use client'

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'suspended' | 'success' | 'failed' | 'approved' | 'processed'
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusStyles = {
    active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
    pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
    suspended: 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
    failed: 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]',
    approved: 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.15)]',
    processed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]'
  }

  const statusLabels = {
    active: 'Aktif',
    pending: 'Menunggu',
    suspended: 'Ditangguhkan',
    success: 'Berhasil',
    failed: 'Gagal',
    approved: 'Disetujui',
    processed: 'Diproses'
  }

  const statusDots = {
    active: 'bg-emerald-400',
    pending: 'bg-amber-400',
    suspended: 'bg-red-400',
    success: 'bg-emerald-400',
    failed: 'bg-red-400',
    approved: 'bg-blue-400',
    processed: 'bg-emerald-400'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusStyles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${statusDots[status]}`} />
      {label || statusLabels[status]}
    </span>
  )
}
