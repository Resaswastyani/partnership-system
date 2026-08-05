'use client'

import { useState } from 'react'
import { MOCK_PAYOUTS } from '@/lib/mock-data'
import { DataTable } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'

interface PayoutModal {
  visible: boolean
  type: 'approve' | 'reject' | 'process'
  payout: any
}

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS)
  const [modal, setModal] = useState<PayoutModal>({ visible: false, type: 'approve', payout: null })

  const stats = {
    pending: payouts.filter(p => p.status === 'pending').length,
    approved: payouts.filter(p => p.status === 'approved').length,
    processed: payouts.filter(p => p.status === 'processed').length,
    totalPending: payouts
      .filter(p => p.status === 'pending' || p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0),
    totalProcessed: payouts
      .filter(p => p.status === 'processed')
      .reduce((sum, p) => sum + p.amount, 0),
    averagePayout: payouts.length > 0
      ? payouts.reduce((sum, p) => sum + p.amount, 0) / payouts.length
      : 0
  }

  const handleAction = (type: 'approve' | 'reject' | 'process', payout: any) => {
    setModal({ visible: true, type, payout })
  }

  const confirmAction = () => {
    if (!modal.payout) return

    const newStatus = modal.type === 'approve' ? 'approved' : modal.type === 'process' ? 'processed' : 'failed'

    setPayouts(payouts.map(p =>
      p.id === modal.payout.id
        ? {
            ...p,
            status: newStatus,
            processedAt: ['approved', 'processed'].includes(newStatus) ? new Date() : p.processedAt
          }
        : p
    ))

    setModal({ visible: false, type: 'approve', payout: null })
  }

  const pendingPayouts = payouts.filter(p => ['pending', 'approved'].includes(p.status))
  const processedPayouts = payouts.filter(p => p.status === 'processed')

  const pendingColumns = [
    {
      key: 'affiliateName',
      label: 'Nama Affiliate',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Jumlah',
      render: (val: number) => `Rp ${val.toLocaleString('id-ID')}`,
      sortable: true
    },
    {
      key: 'commissions',
      label: 'Jumlah Komisi'
    },
    {
      key: 'bankName',
      label: 'Bank'
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    }
  ]

  const processedColumns = [
    {
      key: 'affiliateName',
      label: 'Nama Affiliate',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Jumlah',
      render: (val: number) => `Rp ${val.toLocaleString('id-ID')}`,
      sortable: true
    },
    {
      key: 'bankName',
      label: 'Bank'
    },
    {
      key: 'processedAt',
      label: 'Tanggal Diproses',
      render: (val: Date) => new Date(val).toLocaleDateString('id-ID')
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{stats.approved}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Processed</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{stats.processed}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Pending</p>
          <p className="text-lg font-bold text-cyan-400 mt-1">Rp {(stats.totalPending / 1_000_000).toFixed(1)}M</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Processed</p>
          <p className="text-lg font-bold text-green-400 mt-1">Rp {(stats.totalProcessed / 1_000_000).toFixed(1)}M</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Rata-rata Payout</p>
          <p className="text-lg font-bold text-purple-400 mt-1">Rp {(stats.averagePayout / 1_000_000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Pending Payouts */}
      <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
        <h2 className="text-lg font-bold mb-6">Payout Menunggu Proses</h2>
        <DataTable
          columns={pendingColumns}
          data={pendingPayouts}
          actions={[
            { label: 'Setujui', onClick: (p) => handleAction('approve', p) },
            { label: 'Proses', onClick: (p) => handleAction('process', p) }
          ]}
        />
      </div>

      {/* Processed Payouts */}
      <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
        <h2 className="text-lg font-bold mb-6">Payout Selesai</h2>
        <DataTable
          columns={processedColumns}
          data={processedPayouts}
        />
      </div>

      {/* Modal */}
      {modal.visible && modal.payout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2847] rounded-lg p-6 max-w-md w-full border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              {modal.type === 'approve' && 'Setujui Payout'}
              {modal.type === 'process' && 'Proses Payout'}
              {modal.type === 'reject' && 'Tolak Payout'}
            </h3>

            <div className="space-y-3 mb-6 p-4 rounded bg-white/5 border border-white/10">
              <p className="text-foreground">
                <strong>Affiliate:</strong> {modal.payout.affiliateName}
              </p>
              <p className="text-foreground">
                <strong>Jumlah:</strong> <span className="text-cyan-400 font-bold">Rp {modal.payout.amount.toLocaleString('id-ID')}</span>
              </p>
              <p className="text-foreground">
                <strong>Bank:</strong> {modal.payout.bankName}
              </p>
              <p className="text-foreground">
                <strong>Rekening:</strong> {modal.payout.accountNumber}
              </p>
              <p className="text-foreground">
                <strong>Jumlah Komisi:</strong> {modal.payout.commissions}
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {modal.type === 'approve' && 'Setujui payout ini untuk diproses ke sistem pembayaran?'}
              {modal.type === 'process' && 'Tandai payout ini sebagai selesai diproses?'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setModal({ visible: false, type: 'approve', payout: null })}
                className="flex-1 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-foreground"
              >
                Batal
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-medium"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
