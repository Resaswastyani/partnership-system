'use client'

import { useState } from 'react'
import { MOCK_ALL_MEMBERS } from '@/lib/mock-data'
import { DataTable } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { motion } from 'framer-motion'

interface ActionModal {
  visible: boolean
  type: 'approve' | 'reject' | 'suspend' | 'delete'
  member: any
}

export default function MembersPage() {
  const [members, setMembers] = useState(MOCK_ALL_MEMBERS)
  const [modal, setModal] = useState<ActionModal>({ visible: false, type: 'approve', member: null })

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    pending: members.filter(m => m.status === 'pending').length,
    suspended: members.filter(m => m.status === 'suspended').length,
    totalEarnings: members.reduce((sum, m) => sum + m.totalEarnings, 0),
    totalCommissions: members.reduce((sum, m) => sum + m.pendingCommissions, 0)
  }

  const handleAction = (type: 'approve' | 'reject' | 'suspend' | 'delete', member: any) => {
    setModal({ visible: true, type, member })
  }

  const confirmAction = () => {
    if (!modal.member) return

    switch (modal.type) {
      case 'approve':
        setMembers(members.map(m =>
          m.id === modal.member.id ? { ...m, status: 'active' } : m
        ))
        break
      case 'suspend':
        setMembers(members.map(m =>
          m.id === modal.member.id ? { ...m, status: 'suspended' } : m
        ))
        break
      case 'delete':
        setMembers(members.filter(m => m.id !== modal.member.id))
        break
    }

    setModal({ visible: false, type: 'approve', member: null })
  }

  const columns = [
    {
      key: 'name',
      label: 'Nama Affiliate',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{val}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'totalReferrals',
      label: 'Total Referral',
      sortable: true
    },
    {
      key: 'totalEarnings',
      label: 'Total Earnings',
      render: (val: number) => (
        <span className="text-emerald-400 font-semibold">Rp {val.toLocaleString('id-ID')}</span>
      ),
      sortable: true
    },
    {
      key: 'pendingCommissions',
      label: 'Pending Commission',
      render: (val: number) => (
        <span className="text-amber-400 font-semibold">Rp {val.toLocaleString('id-ID')}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: string) => <StatusBadge status={val} />
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
    { label: 'Total Affiliate', value: stats.total, color: 'text-primary', icon: '👥' },
    { label: 'Aktif', value: stats.active, color: 'text-emerald-400', icon: '✅' },
    { label: 'Menunggu Approval', value: stats.pending, color: 'text-amber-400', icon: '⏳' },
    { label: 'Ditangguhkan', value: stats.suspended, color: 'text-red-400', icon: '🚫' },
    { label: 'Total Komisi Pending', value: `Rp ${(stats.totalCommissions / 1_000_000).toFixed(1)}M`, color: 'text-sky-400', icon: '💳' },
    { label: 'Total Earnings', value: `Rp ${(stats.totalEarnings / 1_000_000).toFixed(1)}M`, color: 'text-emerald-400', icon: '💰' },
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
        <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Members</h1>
        <p className="text-gray-400">Lihat dan kelola semua affiliate member aktif</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-full blur-[20px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-[20%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-primary">👥</span> Daftar Affiliate Member
          </h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-all">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(251,191,36,0.1)]">
              + Tambah Member
            </button>
          </div>
        </div>
        <div className="relative z-10">
          <DataTable
            columns={columns}
            data={members}
            actions={[
              { label: 'Edit', onClick: (m) => handleAction('approve', m) },
              { label: 'Suspend', onClick: (m) => handleAction('suspend', m) }
            ]}
          />
        </div>
      </motion.div>

      {/* Modal */}
      {modal.visible && modal.member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full border border-white/10"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              {modal.type === 'approve' && <><span>✅</span> Setujui Affiliate</>}
              {modal.type === 'suspend' && <><span>⛔</span> Suspend Affiliate</>}
              {modal.type === 'delete' && <><span>🗑️</span> Hapus Affiliate</>}
            </h3>

            <div className="space-y-3 mb-6 p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Nama</p>
                <p className="text-white font-semibold">{modal.member.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-gray-300 text-sm">{modal.member.email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Total Referral</p>
                <p className="text-white font-semibold">{modal.member.totalReferrals}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-emerald-400 font-bold">Rp {modal.member.totalEarnings.toLocaleString('id-ID')}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
              {modal.type === 'approve' && 'Apakah Anda yakin ingin menyetujui affiliate ini?'}
              {modal.type === 'suspend' && 'Apakah Anda yakin ingin menghentikan affiliate ini? Mereka tidak dapat membuat referral baru.'}
              {modal.type === 'delete' && 'Apakah Anda yakin ingin menghapus affiliate ini? Tindakan ini tidak dapat dibatalkan.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setModal({ visible: false, type: 'approve', member: null })}
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
