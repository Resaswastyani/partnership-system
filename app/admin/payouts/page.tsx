'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { motion } from 'framer-motion'
import { formatRupiah } from '@/lib/utils'

interface PayoutModal {
  visible: boolean
  type: 'approve' | 'reject' | 'process'
  payout: any
}

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<PayoutModal>({ visible: false, type: 'approve', payout: null })

  useEffect(() => {
    fetchPayouts()
  }, [])

  const fetchPayouts = async () => {
    try {
      const res = await fetch('/api/admin/payouts?status=all')
      const data = await res.json()
      if (data.success) {
        setPayouts(data.payouts)
      }
    } catch (error) {
      console.error('Failed to fetch payouts', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    pending: payouts.filter(p => p.status === 'pending').length,
    approved: payouts.filter(p => p.status === 'approved').length,
    processed: payouts.filter(p => p.status === 'processed').length,
    totalPending: payouts
      .filter(p => p.status === 'pending' || p.status === 'approved')
      .reduce((sum, p) => sum + Number(p.amount), 0),
    totalProcessed: payouts
      .filter(p => p.status === 'processed')
      .reduce((sum, p) => sum + Number(p.amount), 0),
    averagePayout: payouts.length > 0
      ? payouts.reduce((sum, p) => sum + Number(p.amount), 0) / payouts.length
      : 0
  }

  const handleAction = (type: 'approve' | 'reject' | 'process', payout: any) => {
    setModal({ visible: true, type, payout })
  }

  const confirmAction = async () => {
    if (!modal.payout) return

    const newStatus = modal.type === 'approve' ? 'approved' : modal.type === 'process' ? 'processed' : 'rejected'
    
    // For process we do local update, wait, the API has only approve/reject logic, but approve sets it to processed?
    // Let's check the API: if action === 'approve', it sets status to 'processed'.
    // If action === 'reject', it sets status to 'rejected'.
    const apiAction = (modal.type === 'approve' || modal.type === 'process') ? 'approve' : 'reject'

    try {
      const res = await fetch('/api/admin/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payoutId: modal.payout.id,
          action: apiAction
        })
      })
      
      if (res.ok) {
        setPayouts(payouts.map(p =>
          p.id === modal.payout.id
            ? {
                ...p,
                status: apiAction === 'approve' ? 'processed' : 'rejected',
                processed_at: new Date()
              }
            : p
        ))
      }
    } catch (error) {
      console.error('Action failed', error)
    }

    setModal({ visible: false, type: 'approve', payout: null })
  }

  const pendingPayouts = payouts.filter(p => ['pending', 'approved'].includes(p.status))
  const processedPayouts = payouts.filter(p => p.status === 'processed')

  const pendingColumns = [
    {
      key: 'affiliate_name',
      label: 'Nama Affiliate',
      render: (val: string) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
            {val ? val.charAt(0) : '?'}
          </div>
          <span className="text-white font-semibold">{val}</span>
        </div>
      ),
      sortable: true
    },
    {
      key: 'amount',
      label: 'Jumlah',
      render: (val: any) => (
        <span className="text-primary font-bold">Rp {Number(val).toLocaleString('id-ID')}</span>
      ),
      sortable: true
    },
    {
      key: 'commissions',
      label: 'Jumlah Komisi'
    },
    {
      key: 'bank_name',
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
      key: 'affiliate_name',
      label: 'Nama Affiliate',
      render: (val: string) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            {val ? val.charAt(0) : '?'}
          </div>
          <span className="text-white font-semibold">{val}</span>
        </div>
      ),
      sortable: true
    },
    {
      key: 'amount',
      label: 'Jumlah',
      render: (val: any) => (
        <span className="text-emerald-400 font-bold">Rp {Number(val).toLocaleString('id-ID')}</span>
      ),
      sortable: true
    },
    {
      key: 'bank_name',
      label: 'Bank'
    },
    {
      key: 'processed_at',
      label: 'Tanggal Diproses',
      render: (val: Date) => val ? new Date(val).toLocaleDateString('id-ID') : '-'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  const statCards = [
    { label: 'Pending Approval', value: stats.pending, color: 'text-amber-400', icon: '⏳', glow: 'rgba(245,158,11,0.1)' },
    { label: 'Approved', value: stats.approved, color: 'text-blue-400', icon: '✅', glow: 'rgba(59,130,246,0.1)' },
    { label: 'Processed', value: stats.processed, color: 'text-emerald-400', icon: '💸', glow: 'rgba(16,185,129,0.1)' },
    { label: 'Total Pending', value: formatRupiah(stats.totalPending), color: 'text-primary', icon: '💰', glow: 'rgba(251,191,36,0.1)' },
    { label: 'Total Processed', value: formatRupiah(stats.totalProcessed), color: 'text-emerald-400', icon: '🏦', glow: 'rgba(16,185,129,0.1)' },
    { label: 'Rata-rata Payout', value: formatRupiah(stats.averagePayout), color: 'text-purple-400', icon: '📊', glow: 'rgba(168,85,247,0.1)' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Payouts</h1>
        <p className="text-gray-400">Proses dan kelola pembayaran komisi affiliate</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Pending Payouts */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden border-l-4 border-l-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-primary">⏳</span> Payout Menunggu Proses
            {pendingPayouts.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/30">
                {pendingPayouts.length}
              </span>
            )}
          </h2>
        </div>
        <div className="relative z-10">
          <DataTable
            columns={pendingColumns}
            data={pendingPayouts}
            actions={[
              { label: 'Setujui', onClick: (p) => handleAction('approve', p) },
              { label: 'Proses', onClick: (p) => handleAction('process', p) }
            ]}
          />
        </div>
      </motion.div>

      {/* Processed Payouts */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden border-l-4 border-l-emerald-500">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">✅</span> Payout Selesai
          </h2>
        </div>
        <div className="relative z-10">
          <DataTable
            columns={processedColumns}
            data={processedPayouts}
          />
        </div>
      </motion.div>

      {/* Modal */}
      {modal.visible && modal.payout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              {modal.type === 'approve' && <><span>✅</span> Setujui Payout</>}
              {modal.type === 'process' && <><span>💸</span> Proses Payout</>}
              {modal.type === 'reject' && <><span>❌</span> Tolak Payout</>}
            </h3>

            <div className="space-y-3 mb-6 p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Affiliate</p>
                <p className="text-white font-semibold">{modal.payout.affiliate_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Jumlah</p>
                <p className="text-primary font-bold text-lg">Rp {Number(modal.payout.amount).toLocaleString('id-ID')}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Bank</p>
                <p className="text-white font-semibold">{modal.payout.bank_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Rekening</p>
                <p className="text-gray-300 font-mono">{modal.payout.account_number}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Jumlah Komisi</p>
                <p className="text-white">{modal.payout.commissions}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
              {modal.type === 'approve' && 'Setujui payout ini untuk diproses ke sistem pembayaran?'}
              {modal.type === 'process' && 'Tandai payout ini sebagai selesai diproses?'}
              {modal.type === 'reject' && 'Tolak payout ini dan informasikan ke affiliate?'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setModal({ visible: false, type: 'approve', payout: null })}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-gray-300 hover:text-white font-medium"
              >
                Batal
              </button>
              <button
                onClick={confirmAction}
                className="flex-1 px-4 py-3 rounded-xl bg-primary/80 hover:bg-primary border border-primary/30 transition-all text-background font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                Konfirmasi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
