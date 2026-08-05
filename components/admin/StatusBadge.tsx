'use client'

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'suspended' | 'success' | 'failed' | 'approved' | 'processed'
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusStyles = {
    active: 'bg-green-500/20 text-green-300 border border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    suspended: 'bg-red-500/20 text-red-300 border border-red-500/30',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    failed: 'bg-red-500/20 text-red-300 border border-red-500/30',
    approved: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    processed: 'bg-green-500/20 text-green-300 border border-green-500/30'
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

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {label || statusLabels[status]}
    </span>
  )
}
