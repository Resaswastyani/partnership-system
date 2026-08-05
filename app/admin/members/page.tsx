'use client'

import { useState } from 'react'
import { MOCK_ALL_MEMBERS } from '@/lib/mock-data'
import { DataTable } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'

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
        <div>
          <p className="font-medium">{val}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
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
      render: (val: number) => `Rp ${val.toLocaleString('id-ID')}`,
      sortable: true
    },
    {
      key: 'pendingCommissions',
      label: 'Pending Commission',
      render: (val: number) => `Rp ${val.toLocaleString('id-ID')}`
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Affiliate</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{stats.total}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Aktif</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{stats.active}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Menunggu Approval</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Ditangguhkan</p>
          <p className="text-2xl font-bold text-red-400 mt-1">{stats.suspended}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Komisi Pending</p>
          <p className="text-lg font-bold text-cyan-400 mt-1">Rp {(stats.totalCommissions / 1_000_000).toFixed(1)}M</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-muted-foreground">Total Earnings</p>
          <p className="text-lg font-bold text-green-400 mt-1">Rp {(stats.totalEarnings / 1_000_000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2847] rounded-lg p-6 border border-white/10">
        <h2 className="text-lg font-bold mb-6">Daftar Affiliate Member</h2>
        <DataTable
          columns={columns}
          data={members}
          actions={[
            { label: 'Edit', onClick: (m) => handleAction('approve', m) },
            { label: 'Suspend', onClick: (m) => handleAction('suspend', m) }
          ]}
        />
      </div>

      {/* Modal */}
      {modal.visible && modal.member && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2847] rounded-lg p-6 max-w-md w-full border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              {modal.type === 'approve' && 'Setujui Affiliate'}
              {modal.type === 'suspend' && 'Suspend Affiliate'}
              {modal.type === 'delete' && 'Hapus Affiliate'}
            </h3>

            <div className="space-y-3 mb-6">
              <p className="text-foreground"><strong>Nama:</strong> {modal.member.name}</p>
              <p className="text-foreground"><strong>Email:</strong> {modal.member.email}</p>
              <p className="text-foreground"><strong>Total Referral:</strong> {modal.member.totalReferrals}</p>
              <p className="text-foreground"><strong>Total Earnings:</strong> Rp {modal.member.totalEarnings.toLocaleString('id-ID')}</p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {modal.type === 'approve' && 'Apakah Anda yakin ingin menyetujui affiliate ini?'}
              {modal.type === 'suspend' && 'Apakah Anda yakin ingin menghentikan affiliate ini? Mereka tidak dapat membuat referral baru.'}
              {modal.type === 'delete' && 'Apakah Anda yakin ingin menghapus affiliate ini? Tindakan ini tidak dapat dibatalkan.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setModal({ visible: false, type: 'approve', member: null })}
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
